import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config"; // Adjust path if needed
import { doc, getDoc, setDoc } from "firebase/firestore";
import Logo from "./Logo.png"; // Import your logo

// Sample avatar options (replace with your own URLs)
const avatarOptions = [
  "https://via.placeholder.com/120?text=Avatar1",
  "https://via.placeholder.com/120?text=Avatar2",
  "https://via.placeholder.com/120?text=Avatar3",
  "https://images.app.goo.gl/SJCe5Tc6Rn1sQgLaA",
  "https://images.app.goo.gl/At8jSrwGfpjNLWQq9",
];

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    // Dark blue gradient background
    background: "linear-gradient(135deg, #141E30, #243B55)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: "16rem",
    backgroundColor: "#fff",
    borderRight: "1px solid #e2e8f0",
    padding: "1.5rem",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  logoImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    marginRight: "0.75rem",
  },
  brandName: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1f2937",
  },
  nav: {
    marginTop: "1rem",
  },
  navItem: {
    cursor: "pointer",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    marginBottom: "0.5rem",
    color: "#374151",
    transition: "background-color 0.2s",
  },
  navItemActive: {
    backgroundColor: "#e5e7eb",
  },
  main: {
    flex: 1,
    padding: "2rem",
  },
  card: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 4rem)", // fill vertical space
    backgroundColor: "rgba(255, 255, 255, 0.9)", // semi-transparent white
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    borderRadius: "1rem",
    padding: "2rem",
    overflow: "auto",
  },
  cardTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#2D3748",
    textAlign: "center",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  profileField: {
    marginBottom: "1.25rem", // increased spacing
    fontSize: "1rem",
    color: "#4B5563",
  },
  label: {
    fontWeight: "bold",
    marginRight: "0.25rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
    color: "#000",
  },
  buttonRow: {
    marginTop: "1.5rem",
    display: "flex",
    gap: "0.5rem",
    gridColumn: "1 / -1", // span both columns
    justifyContent: "center",
  },
  buttonEdit: {
    backgroundColor: "#f87171", // fun coral color
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  button: {
    backgroundColor: "#34d399", // green color
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  buttonSecondary: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  // New styles for avatar options
  avatarOptionsContainer: {
    gridColumn: "1 / -1", // span both columns
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
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease",
  },
};

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    location: "",
    avatarUrl: "", // store the selected avatar here
  });

  useEffect(() => {
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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  // Save changes (including avatarUrl) to Firestore
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

  // Button hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  // If no avatar selected, use placeholder
  const currentAvatar = profile.avatarUrl
    ? profile.avatarUrl
    : "https://via.placeholder.com/120?text=Avatar";

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <img src={Logo} alt="Project S Logo" style={styles.logoImage} />
          <div style={styles.brandName}>Project S</div>
        </div>
        <nav style={styles.nav}>
          <div
            style={{
              ...styles.navItem,
              ...(selectedTab === "profile" ? styles.navItemActive : {}),
            }}
            onClick={() => setSelectedTab("profile")}
          >
            Profile
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Profile</h2>

          {/* Avatar Display */}
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
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={styles.profileField}>
                  <span style={styles.label}>First Name:</span>
                  {profile.firstName || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <span style={styles.label}>Last Name:</span>
                  {profile.lastName || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <span style={styles.label}>Email:</span>
                  {profile.email || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <span style={styles.label}>Occupation:</span>
                  {profile.occupation || "Not set"}
                </p>
                <p style={styles.profileField}>
                  <span style={styles.label}>Location:</span>
                  {profile.location || "Not set"}
                </p>
              </div>
              <div style={styles.buttonRow}>
                <button
                  style={styles.buttonEdit}
                  onClick={handleEditClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            // EDIT MODE
            <form onSubmit={handleSave} style={styles.formGrid}>
              {/* FIRST NAME */}
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
              {/* LAST NAME */}
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
              {/* EMAIL */}
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
              {/* OCCUPATION */}
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
              {/* LOCATION */}
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

              {/* AVATAR SELECTION */}
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
                          ? "3px solid #34d399"
                          : "3px solid transparent",
                    }}
                    onClick={() => handleAvatarSelect(avatarSrc)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                ))}
              </div>

              <div style={styles.buttonRow}>
                <button
                  type="submit"
                  style={styles.button}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Save
                </button>
                <button
                  type="button"
                  style={styles.buttonSecondary}
                  onClick={handleCancel}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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

export default ProfileSidebar;
