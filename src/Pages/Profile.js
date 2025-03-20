/**
 * This code is a simplified version of the Profile page.
 * You can expand it by adding more fields (e.g., phone number, DOB),
 * form validation (e.g., required fields, regex checks),
 * and error handling (e.g., displaying messages if Firestore updates fail).
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Logo from "./Logo.png"; // Your logo

// Sample avatar options (replace with your own URLs)
const avatarOptions = [
  "https://via.placeholder.com/120?text=Avatar1",
  "https://via.placeholder.com/120?text=Avatar2",
  "https://via.placeholder.com/120?text=Avatar3",
];

// For brand consistency, we’ll reuse some color constants from the Dashboard style
const primaryColor = "#4285f4";
const textColor = "#202124";
const cardShadow = "0 2px 4px rgba(0,0,0,0.1)";

const Profile = () => {
  const navigate = useNavigate();

  // For fade-in animation
  const [fadeIn, setFadeIn] = useState(false);

  // Local state for profile data
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    location: "",
    avatarUrl: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in on mount

    // Fetch user data from Firestore
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            occupation: data.occupation || "",
            location: data.location || "",
            avatarUrl: data.avatarUrl || "",
          });
        } else {
          console.log("No user document found; using default values.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Sign out logic (same as Dashboard)
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  // Save to Firestore
  const handleSave = async (event) => {
    event.preventDefault();
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          occupation: profile.occupation,
          location: profile.location,
          avatarUrl: profile.avatarUrl,
        },
        { merge: true }
      );
      setEditMode(false);
      console.log("Profile updated in Firestore.");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  // Handle changes in form inputs
  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatarSrc) => {
    setProfile((prev) => ({
      ...prev,
      avatarUrl: avatarSrc,
    }));
  };

  // Fallback avatar
  const currentAvatar = profile.avatarUrl
    ? profile.avatarUrl
    : "https://via.placeholder.com/120?text=Avatar";

  return (
    <div
      style={{
        ...styles.pageContainer,
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
      }}
    >
      {/* TOP NAVIGATION BAR */}
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
        <div style={styles.profileCard}>
          <h2 style={styles.profileCardTitle}>Profile</h2>

          {/* AVATAR */}
          <div style={styles.avatarContainer}>
            <img
              src={currentAvatar}
              alt="User Avatar"
              style={styles.avatar}
            />
          </div>

          {/* READ-ONLY VIEW */}
          {!editMode ? (
            <>
              <div style={styles.profileDetails}>
                <p style={styles.profileField}>
                  <strong>First Name:</strong> {profile.firstName || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <strong>Last Name:</strong> {profile.lastName || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <strong>Email:</strong> {profile.email || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <strong>Occupation:</strong> {profile.occupation || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <strong>Location:</strong> {profile.location || "Not set"}
                </p>
              </div>
              <div style={styles.buttonRow}>
                <button style={styles.buttonPrimary} onClick={handleEditClick}>
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            // EDIT MODE
            <form onSubmit={handleSave} style={styles.formGrid}>
              <div>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              {/* AVATAR OPTIONS */}
              <div style={styles.avatarOptionsContainer}>
                {avatarOptions.map((avatarSrc, idx) => (
                  <img
                    key={idx}
                    src={avatarSrc}
                    alt={`Avatar Option ${idx + 1}`}
                    style={{
                      ...styles.avatarOption,
                      border:
                        profile.avatarUrl === avatarSrc
                          ? `3px solid ${primaryColor}`
                          : "3px solid transparent",
                    }}
                    onClick={() => handleAvatarSelect(avatarSrc)}
                  />
                ))}
              </div>

              <div style={styles.buttonRow}>
                <button type="submit" style={styles.buttonPrimary}>
                  Save
                </button>
                <button
                  type="button"
                  style={styles.buttonSecondary}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    color: textColor,
    backgroundColor: "#fff",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  /* NAVIGATION BAR */
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
    color: textColor,
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
    color: textColor,
    fontWeight: "bold",
    fontSize: "1rem",
  },
  signOutButton: {
    backgroundColor: primaryColor,
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  /* MAIN */
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "#fff",
    boxShadow: cardShadow,
    borderRadius: "8px",
    padding: "2rem",
    width: "100%",
    maxWidth: "700px",
    textAlign: "center",
  },
  profileCardTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: textColor,
  },
  avatarContainer: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: cardShadow,
  },
  profileDetails: {
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  profileField: {
    marginBottom: "1rem",
    fontSize: "1rem",
    color: textColor,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  buttonPrimary: {
    backgroundColor: primaryColor,
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  buttonSecondary: {
    backgroundColor: "#ccc",
    color: "#000",
    padding: "0.6rem 1.2rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "0.25rem",
    color: textColor,
  },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    padding: "0.5rem",
    width: "100%",
    fontSize: "1rem",
    color: "#000",
  },
  avatarOptionsContainer: {
    gridColumn: "1 / -1",
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
  avatarOption: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: cardShadow,
    transition: "transform 0.2s",
    objectFit: "cover",
  },
};
