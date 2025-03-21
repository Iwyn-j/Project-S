import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecommendationContext } from "../context/RecommendationContext";
import { auth, db } from "../firebase-config";
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import Logo from "./Logo.png"; // Path to your logo

const TopicsPage = () => {
  const navigate = useNavigate();
  const { bestRecommendation } = useContext(RecommendationContext);
  const [topicsArray, setTopicsArray] = useState([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState([]);
  const user = auth.currentUser;

  // Parse bestRecommendation["Topics To Learn"] into an array on mount
  useEffect(() => {
    if (!bestRecommendation) return;
    let tempTopics = [];
    if (Array.isArray(bestRecommendation["Topics To Learn"])) {
      tempTopics = bestRecommendation["Topics To Learn"];
    } else if (typeof bestRecommendation["Topics To Learn"] === "string") {
      tempTopics = bestRecommendation["Topics To Learn"]
        .split(",")
        .map((topic) => topic.trim());
    }
    setTopicsArray(tempTopics);
  }, [bestRecommendation]);

  // Listen for real-time updates to the user's "topic" bookmarks
  useEffect(() => {
    if (!user) {
      console.log("No user found; must be logged in to load topic bookmarks.");
      return;
    }
    const unsub = onSnapshot(
      collection(db, "users", user.uid, "bookmarks"),
      (snapshot) => {
        const topicBookmarks = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.type === "topic") {
            topicBookmarks.push(data.value);
          }
        });
        setBookmarkedTopics(topicBookmarks);
      },
      (error) => {
        console.error("Error in onSnapshot (Topics):", error);
      }
    );
    return () => unsub();
  }, [user]);

  // Helper: Check if a topic is bookmarked
  const isBookmarked = (topic) => bookmarkedTopics.includes(topic);

  // Toggle bookmark (add/remove in Firestore)
  const toggleBookmark = async (topic) => {
    if (!user) {
      alert("You must be logged in to bookmark.");
      return;
    }
    const docRef = doc(
      db,
      "users",
      user.uid,
      "bookmarks",
      `topic_${encodeURIComponent(topic)}`
    );
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          type: "topic",
          value: topic,
        });
      }
    } catch (error) {
      console.error("Error toggling bookmark (Topics):", error);
    }
  };

  // Sign out logic (same as Dashboard)
  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/login");
  };

  // ---------- Group topics into Free and Paid ----------
  const freeTopics = [];
  const paidTopics = [];
  topicsArray.forEach((topic) => {
    if (typeof topic === "object" && topic.cost) {
      if (topic.cost.toLowerCase().includes("free")) {
        freeTopics.push(topic);
      } else {
        paidTopics.push(topic);
      }
    } else {
      freeTopics.push(topic);
    }
  });

  // ---------- Inline Styles (matching Dashboard) ----------
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  };

  // TOP NAVIGATION BAR
  const navbarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
  };

  const navLeftStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  };

  const logoStyle = {
    height: "50px",
    width: "auto",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#202124",
    fontWeight: "bold",
    fontSize: "1rem",
  };

  const navRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  };

  const navLinkRightStyle = {
    textDecoration: "none",
    color: "#202124",
    fontWeight: "bold",
    fontSize: "1rem",
  };

  const signOutButtonStyle = {
    backgroundColor: "#4285f4",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  };

  // MAIN CONTENT
  const mainStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#1F2937",
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    fontWeight: "bold",
  };

  const subHeadingStyle = {
    textAlign: "center",
    color: "#6B7280",
    fontSize: "1.1rem",
    marginBottom: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  };

  // A smaller, left-aligned heading for the sections
  const subSectionHeadingStyle = {
    textAlign: "left",
    fontSize: "1.3rem", // smaller than main heading
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1F2937",
    marginTop: "2rem",
  };

  // Grid for cards
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  // Card styling with extra fields for future data
  const cardStyle = {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    transition: "transform 0.3s ease",
    textAlign: "left",
  };

  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#374151",
    wordWrap: "break-word",
  };

  const descriptionStyle = {
    fontSize: "0.95rem",
    color: "#5f6368",
    marginBottom: "1rem",
    lineHeight: "1.4",
  };

  const ifYouLikeStyle = {
    fontSize: "0.9rem",
    color: "#202124",
    marginBottom: "0.5rem",
  };

  const certificateTypeStyle = {
    fontSize: "0.9rem",
    color: "#202124",
    marginBottom: "0.5rem",
  };

  const costStyle = {
    fontSize: "0.9rem",
    color: "#202124",
    marginBottom: "1rem",
  };

  // Bookmark icon style
  const bookmarkStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "color 0.2s ease",
  };

  // Hover effect for cards
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.02)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div style={containerStyle}>
      {/* Top Navigation Bar */}
      <header style={navbarStyle}>
        <div style={navLeftStyle}>
          <img src={Logo} alt="Project S Logo" style={logoStyle} />
          <ul style={navLinksStyle}>
            <li>
              <Link to="/dashboard" style={navLinkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Model" style={navLinkStyle}>
                Model
              </Link>
            </li>
            <li>
              <Link to="/topics" style={navLinkStyle}>
                Topics
              </Link>
            </li>
            <li>
              <Link to="/certifications" style={navLinkStyle}>
                Certifications
              </Link>
            </li>
            <li>
              <Link to="/skills" style={navLinkStyle}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="/bookmarkspage" style={navLinkStyle}>
                Saved
              </Link>
            </li>
          </ul>
        </div>
        <div style={navRightStyle}>
          <Link to="/profile" style={navLinkRightStyle}>
            Profile
          </Link>
          <button onClick={handleSignOut} style={signOutButtonStyle}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={mainStyle}>
        <h1 style={headingStyle}>Topics to Learn</h1>
        <p style={subHeadingStyle}>
          Explore these recommended topics to further develop your skills and achieve your career goals.
        </p>

        {topicsArray.length > 0 ? (
          <>
            {freeTopics.length > 0 && (
              <>
                <h2 style={subSectionHeadingStyle}>Free Topics</h2>
                <div style={gridStyle}>
                  {freeTopics.map((topicObj, idx) => {
                    let title = "";
                    let description = "";
                    let ifYouLike = "";
                    let certificateType = "";
                    let cost = "";
                    let link = "";

                    if (typeof topicObj === "string") {
                      title = topicObj;
                    } else if (typeof topicObj === "object") {
                      title = topicObj.title || "";
                      description = topicObj.description || "";
                      ifYouLike = topicObj.ifYouLike || "";
                      certificateType = topicObj.certificateType || "";
                      cost = topicObj.cost || "";
                      link = topicObj.link || "";
                    }

                    return (
                      <div
                        key={idx}
                        style={cardStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span
                          style={{
                            ...bookmarkStyle,
                            color: isBookmarked(title) ? "#f59e0b" : "#9CA3AF",
                          }}
                          onClick={() => toggleBookmark(title)}
                        >
                          ★
                        </span>
                        {title && <h2 style={titleStyle}>{title}</h2>}
                        {description && <p style={descriptionStyle}>{description}</p>}
                        {ifYouLike && (
                          <p style={ifYouLikeStyle}>
                            <strong>If you like: </strong>
                            {ifYouLike}
                          </p>
                        )}
                        {certificateType && (
                          <p style={certificateTypeStyle}>
                            <strong>Certificate type: </strong>
                            {certificateType}
                          </p>
                        )}
                        {cost && (
                          <p style={costStyle}>
                            <strong>Cost: </strong>
                            {cost}
                          </p>
                        )}
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...titleStyle,
                              fontSize: "1rem",
                              color: "#2563eb",
                              textDecoration: "none",
                              marginBottom: "1rem",
                              display: "block",
                            }}
                          >
                            Learn more
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {paidTopics.length > 0 && (
              <>
                <h2
                  style={{
                    ...subSectionHeadingStyle,
                    marginTop: "2.5rem",
                  }}
                >
                  Paid Topics
                </h2>
                <div style={gridStyle}>
                  {paidTopics.map((topicObj, idx) => {
                    let title = "";
                    let description = "";
                    let ifYouLike = "";
                    let certificateType = "";
                    let cost = "";
                    let link = "";

                    if (typeof topicObj === "string") {
                      title = topicObj;
                    } else if (typeof topicObj === "object") {
                      title = topicObj.title || "";
                      description = topicObj.description || "";
                      ifYouLike = topicObj.ifYouLike || "";
                      certificateType = topicObj.certificateType || "";
                      cost = topicObj.cost || "";
                      link = topicObj.link || "";
                    }

                    return (
                      <div
                        key={idx}
                        style={cardStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span
                          style={{
                            ...bookmarkStyle,
                            color: isBookmarked(title) ? "#f59e0b" : "#9CA3AF",
                          }}
                          onClick={() => toggleBookmark(title)}
                        >
                          ★
                        </span>
                        {title && <h2 style={titleStyle}>{title}</h2>}
                        {description && <p style={descriptionStyle}>{description}</p>}
                        {ifYouLike && (
                          <p style={ifYouLikeStyle}>
                            <strong>If you like: </strong>
                            {ifYouLike}
                          </p>
                        )}
                        {certificateType && (
                          <p style={certificateTypeStyle}>
                            <strong>Certificate type: </strong>
                            {certificateType}
                          </p>
                        )}
                        {cost && (
                          <p style={costStyle}>
                            <strong>Cost: </strong>
                            {cost}
                          </p>
                        )}
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...titleStyle,
                              fontSize: "1rem",
                              color: "#2563eb",
                              textDecoration: "none",
                              marginBottom: "1rem",
                              display: "block",
                            }}
                          >
                            Learn more
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <p style={{ textAlign: "center" }}>No topics found.</p>
        )}
      </main>
    </div>
  );
};

export default TopicsPage;
