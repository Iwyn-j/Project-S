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
import Logo from "./Logo.png"; // Your logo path

const CertificationsPage = () => {
  const navigate = useNavigate();
  const { bestRecommendation } = useContext(RecommendationContext);
  const [bookmarkedCerts, setBookmarkedCerts] = useState([]);
  const user = auth.currentUser;

  // 1) Listen for real-time updates to the user's "certificate" bookmarks
  useEffect(() => {
    if (!user) {
      console.log("No user found; must be logged in to load bookmarks.");
      return;
    }
    const unsub = onSnapshot(
      collection(db, "users", user.uid, "bookmarks"),
      (snapshot) => {
        const certBookmarks = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.type === "certificate") {
            certBookmarks.push(data.value);
          }
        });
        setBookmarkedCerts(certBookmarks);
      },
      (error) => {
        console.error("Error in onSnapshot =>", error);
      }
    );
    return () => unsub();
  }, [user]);

  // 2) Fallback if no recommendation is found
  if (!bestRecommendation) {
    return <p>No recommendation available yet.</p>;
  }

  // 3) Extract certification data from bestRecommendation
  const certLinks = bestRecommendation["Certification Links"] || [];

  // 4) Group certifications into free vs. paid outside of JSX
  const freeCerts = [];
  const paidCerts = [];

  certLinks.forEach((certObj) => {
    // If it's an object with a cost field
    if (typeof certObj === "object" && certObj.cost) {
      if (certObj.cost.toLowerCase().includes("free")) {
        freeCerts.push(certObj);
      } else {
        paidCerts.push(certObj);
      }
    } else {
      // If it's a string or no cost => assume free
      freeCerts.push(certObj);
    }
  });

  // 5) Check if a link is already bookmarked
  const isBookmarked = (value) => bookmarkedCerts.includes(value);

  // 6) Toggle bookmark (add/remove in Firestore)
  const toggleBookmark = async (value) => {
    if (!user) {
      alert("You must be logged in to bookmark.");
      return;
    }
    const docRef = doc(
      db,
      "users",
      user.uid,
      "bookmarks",
      `certificate_${encodeURIComponent(value)}`
    );
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          type: "certificate",
          value: value,
        });
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  // Sign out logic (same as Dashboard)
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

  // Card styling
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

      <main style={mainStyle}>
        <h1 style={headingStyle}>Certifications</h1>
        <p style={subHeadingStyle}>
          Enhance your resume and gain industry recognition with these recommended
          certification programs.
        </p>

        {certLinks.length > 0 ? (
          <>
            {/* Free Certifications Section */}
            {freeCerts.length > 0 && (
              <>
                <h2 style={subSectionHeadingStyle}>Free Certifications</h2>
                <div style={gridStyle}>
                  {freeCerts.map((certObj, idx) => {
                    let title = "";
                    let description = "";
                    let ifYouLike = "";
                    let certificateType = "";
                    let cost = "";
                    let link = "";

                    if (typeof certObj === "string") {
                      // If it's just a string, treat it as the link + title
                      link = certObj;
                      title = certObj;
                    } else {
                      title = certObj.title || "";
                      description = certObj.description || "";
                      ifYouLike = certObj.ifYouLike || "";
                      certificateType = certObj.certificateType || "";
                      cost = certObj.cost || "";
                      link = certObj.link || "";
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
                            color: isBookmarked(link) ? "#f59e0b" : "#9CA3AF",
                          }}
                          onClick={() => toggleBookmark(link)}
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

            {/* Paid Certifications Section */}
            {paidCerts.length > 0 && (
              <>
                <h2 style={{ ...subSectionHeadingStyle, marginTop: "2.5rem" }}>
                  Paid Certifications
                </h2>
                <div style={gridStyle}>
                  {paidCerts.map((certObj, idx) => {
                    let title = "";
                    let description = "";
                    let ifYouLike = "";
                    let certificateType = "";
                    let cost = "";
                    let link = "";

                    if (typeof certObj === "string") {
                      link = certObj;
                      title = certObj;
                    } else {
                      title = certObj.title || "";
                      description = certObj.description || "";
                      ifYouLike = certObj.ifYouLike || "";
                      certificateType = certObj.certificateType || "";
                      cost = certObj.cost || "";
                      link = certObj.link || "";
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
                            color: isBookmarked(link) ? "#f59e0b" : "#9CA3AF",
                          }}
                          onClick={() => toggleBookmark(link)}
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
          <p style={{ textAlign: "center" }}>No certifications found.</p>
        )}
      </main>
    </div>
  );
};

export default CertificationsPage;
