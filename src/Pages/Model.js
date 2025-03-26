import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // for signOut
import { auth, db, rtdb } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { ref as databaseRef, get as getFromRTDB } from "firebase/database";
import * as useModel from "@tensorflow-models/universal-sentence-encoder";
import "@tensorflow/tfjs"; // Keep if you need TF
import { RecommendationContext } from "../context/RecommendationContext";

// Import your existing CSS file for the old style
import "./Model.css";

// Import Logo
import Logo from "./Logo.png";

// 1) Import jsPDF for PDF export
import jsPDF from "jspdf";

const Model = () => {
  const navigate = useNavigate();

  // ------------------------------
  // (A) TOP NAV BAR STYLES & LOGIC
  // ------------------------------
  // Reuse the same styles from your Dashboard (or adapt as needed).
  // For brevity, only the navbar-related styles are included here:
  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff",
    },
    navLeft: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    logo: {
      height: "50px",
      width: "auto",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "1.5rem",
      margin: 0,
      padding: 0,
    },
    navLink: {
      textDecoration: "none",
      color: "#202124",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    navRight: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    },
    navLinkRight: {
      textDecoration: "none",
      color: "#202124",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    signOutButton: {
      backgroundColor: "#4285f4",
      color: "#fff",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  // Sign out logic
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // ------------------------------
  // (B) EXISTING MODEL STATES & LOGIC
  // ------------------------------
  const [userInput, setUserInput] = useState(null);
  const [careerData, setCareerData] = useState([]);
  const [model, setModel] = useState(null);

  const [modelLoaded, setModelLoaded] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [careerDataLoaded, setCareerDataLoaded] = useState(false);

  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const { bestRecommendation, setBestRecommendation } = useContext(RecommendationContext);

  const [matchingComplete, setMatchingComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const recommendationRef = useRef(null);

  // 1) Load the Universal Sentence Encoder model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await useModel.load();
        setModel(loadedModel);
        setModelLoaded(true);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Error loading semantic model.");
      }
    };
    loadModel();
  }, []);

  // 2) Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        setError("No user authenticated.");
        navigate("/login");
        return;
      }
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
            const sortedInteractions = data.chatbotInteractions.sort((a, b) => {
              const aMillis = a.completedAt?.toMillis?.() || 0;
              const bMillis = b.completedAt?.toMillis?.() || 0;
              return bMillis - aMillis;
            });
            const recentInteraction = sortedInteractions[0];
            if (recentInteraction.responses) {
              setUserInput(recentInteraction.responses);
              setDebugInfo(
                `User responses loaded: ${JSON.stringify(recentInteraction.responses)}`
              );
            } else {
              setError("No responses in the most recent interaction.");
            }
          } else {
            setError("No interactions found for the user.");
          }
        } else {
          setError("User document does not exist.");
          navigate("/login");
        }
      } catch (err) {
        setError(`Error fetching user data: ${err.message}`);
      } finally {
        setUserDataLoaded(true);
      }
    };
    fetchUserData();
  }, [navigate]);

  // 3) Fetch career data from Realtime Database
  useEffect(() => {
    const fetchCareerData = async () => {
      const careerRef = databaseRef(rtdb, "career_data");
      try {
        const snapshot = await getFromRTDB(careerRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          setCareerData(data);
          setDebugInfo((prev) => prev + `\nCareer data loaded: ${JSON.stringify(data)}`);
        } else {
          setError("No career data available.");
        }
      } catch (err) {
        setError(`Error fetching career data: ${err.message}`);
      } finally {
        setCareerDataLoaded(true);
      }
    };
    fetchCareerData();
  }, []);

  // 4) Once model, user data, and career data are loaded, do matching
  useEffect(() => {
    if (error) return; // skip if there's an error
    if (!modelLoaded || !userDataLoaded || !careerDataLoaded) return;
    if (!userInput || !careerData.length || !model) {
      return;
    }

    const calculateBestMatch = async () => {
      const userCareerGoal = userInput.careerGoal || "";
      const userSkills = userInput.skillsAndImprovements || "";
      const userText = `${userCareerGoal}. ${userSkills}`.trim();

      // Embed user text
      const userEmbedding = await model.embed([userText]);

      // Prepare an array of career texts
      const careerTexts = careerData.map((career) => {
        const cGoal = career["Career Goal"] || "";
        let cSkills = "";
        if (Array.isArray(career.Skills)) {
          cSkills = career.Skills.join(", ");
        } else if (typeof career.Skills === "string") {
          cSkills = career.Skills;
        }
        return `${cGoal}. ${cSkills}`.trim();
      });

      // Embed all career texts
      const careerEmbeddings = await model.embed(careerTexts);

      const userEmbeddingArray = await userEmbedding.array();
      const careerEmbeddingArray = await careerEmbeddings.array();

      // Cosine similarity helper
      const cosineSimilarity = (vecA, vecB) => {
        const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
        const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
        const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
        return dotProduct / (normA * normB);
      };

      let bestScore = -Infinity;
      let bestMatch = null;

      userEmbeddingArray.forEach((uVec) => {
        careerEmbeddingArray.forEach((cVec, idx) => {
          const score = cosineSimilarity(uVec, cVec);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = careerData[idx];
          }
        });
      });

      setBestRecommendation(bestMatch);
      setDebugInfo((prev) =>
        prev + `\nMatch found with score ${bestScore.toFixed(2)}: ${JSON.stringify(bestMatch)}`
      );

      setMatchingComplete(true);
    };

    calculateBestMatch();
  }, [
    error,
    modelLoaded,
    userDataLoaded,
    careerDataLoaded,
    userInput,
    careerData,
    model,
    setBestRecommendation,
  ]);

  // 5) Progress Bar Calculation
  const loadedCount = [modelLoaded, userDataLoaded, careerDataLoaded].filter(Boolean).length;
  const progress = Math.round((loadedCount / 3) * 100);

  // 6) Wait 2 seconds at 100% progress before showing final results
  useEffect(() => {
    if (progress === 100 && matchingComplete) {
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, matchingComplete]);

  // 7) Export to PDF function
  const handleExportPDF = () => {
    if (!bestRecommendation) {
      alert("No recommendation to export.");
      return;
    }
    const docPDF = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "letter",
    });

    let yPos = 40;
    docPDF.setFontSize(16);
    docPDF.text("Your Personalized Career Path Recommendation", 40, yPos);
    yPos += 30;

    docPDF.setFontSize(14);
    docPDF.text("Best Match for Your Career Goals", 40, yPos);
    yPos += 20;

    docPDF.setFontSize(12);
    const rec = bestRecommendation;

    docPDF.text(`Career Goal: ${rec["Career Goal"] || "N/A"}`, 40, yPos);
    yPos += 15;

    // Skills
    let skillsArray = [];
    if (Array.isArray(rec.Skills)) {
      skillsArray = rec.Skills;
    } else if (typeof rec.Skills === "string") {
      skillsArray = rec.Skills.split(",").map((s) => s.trim());
    }
    docPDF.text(`Skills: ${skillsArray.join(", ")}`, 40, yPos);
    yPos += 15;

    docPDF.text(`Expected Salary: ${rec["Expected Salary"] || "N/A"}`, 40, yPos);
    yPos += 15;

    const topics = Array.isArray(rec["Topics To Learn"])
      ? rec["Topics To Learn"].join(", ")
      : rec["Topics To Learn"] || "N/A";
    docPDF.text(`Topics to Learn: ${topics}`, 40, yPos);
    yPos += 15;

    if (rec["Certification Links"] && rec["Certification Links"].length > 0) {
      docPDF.text("Certification Links:", 40, yPos);
      yPos += 15;
      rec["Certification Links"].forEach((link) => {
        docPDF.text(`- ${link}`, 50, yPos);
        yPos += 15;
      });
    }

    docPDF.save("recommendation.pdf");
  };

  // ------------------------------
  // (C) RENDER WITH NAV BAR
  // ------------------------------
  //
  // We simply add the top <header> in each return scenario (error, loading, final).
  // Everything else from your original Model component remains intact.
  //

  if (error) {
    return (
      <>
        {/* TOP NAV BAR */}
        <header style={styles.navbar}>
          <div style={styles.navLeft}>
            <img src={Logo} alt="Project S Logo" style={styles.logo} />
            <ul style={styles.navLinks}>
              <li>
                <Link to="/dashboard" style={styles.navLink}>Home</Link>
              </li>
              <li>
                <Link to="/model" style={styles.navLink}>Model</Link>
              </li>
              <li>
                <Link to="/topics" style={styles.navLink}>Topics</Link>
              </li>
              <li>
                <Link to="/certifications" style={styles.navLink}>Certifications</Link>
              </li>
              <li>
                <Link to="/skills" style={styles.navLink}>Skills</Link>
              </li>
              <li>
                <Link to="/bookmarkspage" style={styles.navLink}>Saved</Link>
              </li>
            </ul>
          </div>
          <div style={styles.navRight}>
            <Link to="/profile" style={styles.navLinkRight}>Profile</Link>
            <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
          </div>
        </header>

        {/* ORIGINAL ERROR STATE */}
        <div className="model-page">
          <div className="model-container">
            <p className="error">Error: {error}</p>
          </div>
        </div>
      </>
    );
  }

  if (!showResults) {
    return (
      <>
        {/* TOP NAV BAR */}
        <header style={styles.navbar}>
          <div style={styles.navLeft}>
            <img src={Logo} alt="Project S Logo" style={styles.logo} />
            <ul style={styles.navLinks}>
              <li>
                <Link to="/dashboard" style={styles.navLink}>Home</Link>
              </li>
              <li>
                <Link to="/model" style={styles.navLink}>Model</Link>
              </li>
              <li>
                <Link to="/topics" style={styles.navLink}>Topics</Link>
              </li>
              <li>
                <Link to="/certifications" style={styles.navLink}>Certifications</Link>
              </li>
              <li>
                <Link to="/skills" style={styles.navLink}>Skills</Link>
              </li>
              <li>
                <Link to="/bookmarkspage" style={styles.navLink}>Saved</Link>
              </li>
            </ul>
          </div>
          <div style={styles.navRight}>
            <Link to="/profile" style={styles.navLinkRight}>Profile</Link>
            <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
          </div>
        </header>

        {/* ORIGINAL LOADING STATE */}
        <div className="model-page">
          <div className="model-container">
            <h2>Loading your personalized recommendation...</h2>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // FINAL RECOMMENDATION
  return (
    <>
      {/* TOP NAV BAR */}
      <header style={styles.navbar}>
        <div style={styles.navLeft}>
          <img src={Logo} alt="Project S Logo" style={styles.logo} />
          <ul style={styles.navLinks}>
            <li>
              <Link to="/dashboard" style={styles.navLink}>Home</Link>
            </li>
            <li>
              <Link to="/model" style={styles.navLink}>Model</Link>
            </li>
            <li>
              <Link to="/topics" style={styles.navLink}>Topics</Link>
            </li>
            <li>
              <Link to="/certifications" style={styles.navLink}>Certifications</Link>
            </li>
            <li>
              <Link to="/skills" style={styles.navLink}>Skills</Link>
            </li>
            <li>
              <Link to="/bookmarkspage" style={styles.navLink}>Saved</Link>
            </li>
          </ul>
        </div>
        <div style={styles.navRight}>
          <Link to="/profile" style={styles.navLinkRight}>Profile</Link>
          <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
        </div>
      </header>

      {/* ORIGINAL FINAL UI */}
      <div className="model-page">
        <div className="model-container">
          <header className="model-header">
            <h1 style={{ fontSize: "1.6rem" }}>
              Your Personalized Career Path Recommendation
            </h1>
          </header>

          {bestRecommendation ? (
            <div
              className="recommendation-card"
              style={{ padding: "1rem 1.2rem" }}
              ref={recommendationRef}
            >
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>
                Best Match for Your Career Goals
              </h2>
              <p>
                <strong>Career Goal:</strong>{" "}
                {bestRecommendation["Career Goal"] || "Not available"}
              </p>

              {/* Skills */}
              <div className="skills-container">
                <h3 style={{ fontSize: "1rem" }}>Skills</h3>
                <div className="skills-cards">
                  {(() => {
                    let sArr = [];
                    if (Array.isArray(bestRecommendation.Skills)) {
                      sArr = bestRecommendation.Skills;
                    } else if (typeof bestRecommendation.Skills === "string") {
                      sArr = bestRecommendation.Skills.split(",").map((s) => s.trim());
                    }
                    return sArr.map((skill, idx) => (
                      <div key={idx} className="skill-card">
                        {skill}
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <p>
                <strong>Expected Salary:</strong>{" "}
                {bestRecommendation["Expected Salary"] || "Not available"}
              </p>

              {/* Topics */}
              <p>
                <strong>Topics to Learn:</strong>{" "}
                {Array.isArray(bestRecommendation["Topics To Learn"])
                  ? bestRecommendation["Topics To Learn"].join(", ")
                  : bestRecommendation["Topics To Learn"] || "Not available"}
              </p>

              {/* Certification Links */}
              <div className="certification-links">
                <h3 style={{ fontSize: "1rem" }}>Certification Links</h3>
                <div className="certification-cards">
                  {bestRecommendation["Certification Links"] &&
                    bestRecommendation["Certification Links"].map((link, idx) => (
                      <div key={idx} className="certification-card">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No recommendations available based on your inputs.</p>
          )}

          {/* Export to PDF button */}
          <button
            onClick={handleExportPDF}
            style={{
              backgroundColor: "#4285f4",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "1rem",
              fontSize: "1rem",
            }}
          >
            Export to PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default Model;
