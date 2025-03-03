import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config"; // Adjust path if needed
import { doc, getDoc, setDoc } from "firebase/firestore";
import Logo from "./Logo.png"; // Import your logo

// Inline styles for this example
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#f8f9fa",
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
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    maxWidth: "48rem",
    margin: "0 auto",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  profileField: {
    marginBottom: "0.5rem",
  },
  label: {
    fontWeight: "bold",
    marginRight: "0.25rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
    color: "#000", // Ensure input text is black
  },
  buttonRow: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.5rem",
  },
  buttonEdit: {
    backgroundColor: "#28a745", // Green for Edit Profile
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  button: {
    backgroundColor: "#0d6efd", // Blue for Save
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonSecondary: {
    backgroundColor: "#e5e7eb", // Gray for Cancel
    color: "#374151",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
  },
};

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);

  // Local state for user profile including occupation and location
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    location: "",
  });

  // Fetch user data from Firestore on component mount
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

  // Toggle edit mode to show form
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Cancel editing and revert to read-only view
  const handleCancel = () => {
    setEditMode(false);
  };

  // Save changes to Firestore including occupation and location
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
        },
        { merge: true }
      );
      setEditMode(false);
      console.log("Profile updated in Firestore.");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  // Update local state when input changes
  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

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

          {/* Read-Only View */}
          {!editMode ? (
            <>
              <div style={{ marginBottom: "1rem" }}>
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
              <button style={styles.buttonEdit} onClick={handleEditClick}>
                Edit Profile
              </button>
            </>
          ) : (
            // Edit Mode View
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
              <div style={{ gridColumn: "1 / -1", ...styles.buttonRow }}>
                <button type="submit" style={styles.button}>
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

export default ProfileSidebar;
