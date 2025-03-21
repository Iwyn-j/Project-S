import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";
import Logo from "./Logo.png"; // Your logo path

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const user = auth.currentUser;
  const navigate = useNavigate();

  // 1) Real-time listener for bookmarks
  useEffect(() => {
    if (!user) {
      console.log("No user found; please log in to view bookmarks.");
      return;
    }

    const unsub = onSnapshot(
      collection(db, "users", user.uid, "bookmarks"),
      (snapshot) => {
        const allBookmarks = [];
        snapshot.forEach((docSnap) => {
          allBookmarks.push({ id: docSnap.id, ...docSnap.data() });
        });
        setBookmarks(allBookmarks);
      },
      (error) => {
        console.error("Error fetching bookmarks:", error);
      }
    );

    return () => unsub();
  }, [user]);

  // 2) Remove a bookmark
  const removeBookmark = async (bookmarkId) => {
    if (!user) {
      alert("You must be logged in to remove bookmarks.");
      return;
    }
    try {
      await deleteDoc(doc(db, "users", user.uid, "bookmarks", bookmarkId));
      console.log(`Bookmark ${bookmarkId} removed.`);
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // 3) Group bookmarks by type
  const certifications = bookmarks.filter((bm) => bm.type === "certificate");
  const skills = bookmarks.filter((bm) => bm.type === "skill");
  const topics = bookmarks.filter((bm) => bm.type === "topic");

  // 4) Sign out logic (same as Dashboard)
  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/login");
  };

  // 5) Section to display each category
  const renderSection = (title, items) => (
    <section style={{ marginBottom: "2rem" }}>
      <h2 style={styles.sectionHeading}>{title}</h2>
      {items.length > 0 ? (
        <div style={styles.grid}>
          {items.map((bookmark) => (
            <div key={bookmark.id} style={styles.card}>
              <div style={styles.bookmarkValue}>{bookmark.value}</div>
              <button
                style={styles.removeButton}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#3076d2")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4285f4")}
                onClick={() => removeBookmark(bookmark.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noBookmarks}>No {title.toLowerCase()} found.</p>
      )}
    </section>
  );

  // 6) Render Page
  return (
    <div style={styles.container}>
      {/* TOP NAVIGATION BAR (identical to Dashboard) */}
      <header style={styles.navbar}>
        <div style={styles.navLeft}>
          <img src={Logo} alt="Project S Logo" style={styles.logo} />
          <ul style={styles.navLinks}>
            <li>
              <Link to="/dashboard" style={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Model" style={styles.navLink}>
                Model
              </Link>
            </li>
            <li>
              <Link to="/topics" style={styles.navLink}>
                Topics
              </Link>
            </li>
            <li>
              <Link to="/certifications" style={styles.navLink}>
                Certifications
              </Link>
            </li>
            <li>
              <Link to="/skills" style={styles.navLink}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="/bookmarkspage" style={styles.navLink}>
                Saved
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.navRight}>
          <Link to="/profile" style={styles.navLinkRight}>
            Profile
          </Link>
          <button onClick={handleSignOut} style={styles.signOutButton}>
            Sign Out
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.heading}>My Bookmarks</h1>
          <p style={styles.subHeading}>
            Here you can view and remove your saved items, organized by category.
          </p>
        </div>

        {certifications.length === 0 &&
        skills.length === 0 &&
        topics.length === 0 ? (
          <p style={styles.noBookmarks}>No bookmarks found.</p>
        ) : (
          <>
            {renderSection("Certifications", certifications)}
            {renderSection("Skills", skills)}
            {renderSection("Topics", topics)}
          </>
        )}
      </main>
    </div>
  );
};

// 7) Page Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  /* NAV BAR */
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
  /* MAIN */
  main: {
    flex: 1,
    // removed margin: "0 auto" to avoid centering
    padding: "2rem",
  },
  hero: {
    // fully left-aligned
    marginBottom: "2rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#111",
    // left aligned
  },
  subHeading: {
    fontSize: "1rem",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  noBookmarks: {
    fontSize: "1rem",
    color: "#6b7280",
    marginTop: "1rem",
  },
  /* SECTIONS */
  sectionHeading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#111",
    marginBottom: "1rem",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "0.25rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // left aligned content
  },
  bookmarkValue: {
    marginBottom: "0.75rem",
    fontSize: "0.95rem",
    lineHeight: "1.4",
    color: "#111",
    wordBreak: "break-word",
  },
  removeButton: {
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "background-color 0.2s ease",
  },
};

export default BookmarksPage;
