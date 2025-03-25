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
  deleteDoc
} from "firebase/firestore";
import Logo from "./Logo.png"; // Path to your logo

const SkillsPage = () => {
  const navigate = useNavigate();
  const { bestRecommendation } = useContext(RecommendationContext);
  const [skillsArray, setSkillsArray] = useState([]);
  const [bookmarkedSkills, setBookmarkedSkills] = useState([]);
  const user = auth.currentUser;

  // 1) Parse bestRecommendation.Skills or bestRecommendation["Suggested Skills"] into an array on mount
  useEffect(() => {
    if (!bestRecommendation) return;

    const skillsData =
      bestRecommendation.Skills || bestRecommendation["Suggested Skills"];
    if (Array.isArray(skillsData)) {
      setSkillsArray(skillsData);
    } else if (typeof skillsData === "string") {
      const splitSkills = skillsData.split(",").map((skill) => skill.trim());
      setSkillsArray(splitSkills);
    }
  }, [bestRecommendation]);

  // 2) Listen for real-time updates to the user's "skill" bookmarks
  useEffect(() => {
    if (!user) {
      console.log("No user found; must be logged in to load skill bookmarks.");
      return;
    }
    const unsub = onSnapshot(
      collection(db, "users", user.uid, "bookmarks"),
      (snapshot) => {
        const skillBookmarks = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.type === "skill") {
            skillBookmarks.push(data.value);
          }
        });
        setBookmarkedSkills(skillBookmarks);
      },
      (error) => {
        console.error("Error in onSnapshot (Skills):", error);
      }
    );
    return () => unsub();
  }, [user]);

  // 3) Check if a skill is bookmarked
  const isBookmarked = (skill) => bookmarkedSkills.includes(skill);

  // 4) Toggle bookmark (add/remove in Firestore)
  const toggleBookmark = async (skill) => {
    if (!user) {
      alert("You must be logged in to bookmark.");
      return;
    }
    const docRef = doc(
      db,
      "users",
      user.uid,
      "bookmarks",
      `skill_${encodeURIComponent(skill)}`
    );
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          type: "skill",
          value: skill,
        });
      }
    } catch (error) {
      console.error("Error toggling bookmark (Skills):", error);
    }
  };

  // 5) Sign out logic (same as Dashboard)
  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/login");
  };

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

  // Grid for cards
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const cardStyle = {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "2rem",
    transition: "transform 0.3s ease",
    textAlign: "center",
  };

  const cardTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#374151",
  };

  const bookmarkStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "color 0.2s ease",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.02)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  // ---------- Render ----------
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
        <h1 style={headingStyle}>Skills</h1>
        <p style={subHeadingStyle}>
          Build your professional toolkit with these recommended skills. Hone your expertise and stand out in your career.
        </p>

        {skillsArray.length > 0 ? (
          <div style={gridStyle}>
            {skillsArray.map((skill, idx) => (
              <div
                key={idx}
                style={cardStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  style={{
                    ...bookmarkStyle,
                    color: isBookmarked(skill) ? "#f59e0b" : "#9CA3AF",
                  }}
                  onClick={() => toggleBookmark(skill)}
                >
                  ★
                </span>
                <div style={cardTitleStyle}>{skill}</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No skills found.</p>
        )}
      </main>
    </div>
  );
};

export default SkillsPage;
