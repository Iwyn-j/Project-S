import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Auth Provider for user context
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config"; // Firebase configuration
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Firestore reference
import Logo from "./Logo.png"; // Your logo path

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Sign out logic
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // --------------------------------------------
  // FIRESTORE: Fetch name, occupation, location
  // --------------------------------------------
  const [profileData, setProfileData] = useState({
    name: "",
    occupation: "",
    location: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid); // Adjust path if needed
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileData({
              // Attempt both "fullName" and "name" fields, fallback to "User"
              name: data.fullName || data.name || "User",
              occupation: data.occupation || "N/A",
              location: data.location || "N/A",
            });
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  // --------------------------------------------
  // FAQ DATA & ACCORDION LOGIC
  // --------------------------------------------
  const FAQ_DATA = [
    {
      question: "How does Project S help me develop new skills?",
      answer:
        "Project S uses your profile data to suggest relevant topics, skills, and certification pathways. It’s free and tailored to your goals.",
    },
    {
      question: "What are Recommended Topics and Suggested Skills?",
      answer:
        "Recommended Topics are curated learning modules. Suggested Skills are specific abilities (e.g., Python, Data Analysis) linked to those topics.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "Under ‘My Progress,’ you’ll see an overview of how many topics, skills, and certifications you’ve completed. Update your progress as you learn!",
    },
    {
      question: "Can I bookmark or save guidelines?",
      answer:
        "Yes. Use the bookmark feature to save topics or certifications to your ‘My Learning Path.’ This makes it easy to revisit them later.",
    },
    {
      question: "Is everything really free?",
      answer:
        "Yes. Project S is free to use. Some external certifications may cost money, but we also list free certification pathways where possible.",
    },
  ];

  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleFAQ = (index) => {
    if (expandedIndices.includes(index)) {
      // Collapse if already expanded
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      // Expand the clicked one
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  const expandAll = () => {
    setExpandedIndices(FAQ_DATA.map((_, i) => i));
  };

  const collapseAll = () => {
    setExpandedIndices([]);
  };

  // --------------------------------------------
  // FADE-IN ANIMATION
  // --------------------------------------------
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect on mount
    setFadeIn(true);
  }, []);

  const containerStyle = {
    ...styles.pageContainer,
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
  };

  // --------------------------------------------
  // TABS for SKILL DEVELOPMENT
  // --------------------------------------------
  const TABS = ["Overview", "My Progress", "Resources"];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // Stats: now editable in the Overview tab
  const [completedTopics, setCompletedTopics] = useState(3);
  const [completedSkills, setCompletedSkills] = useState(2);
  const [completedCerts, setCompletedCerts] = useState(1);

  const [isEditingStats, setIsEditingStats] = useState(false);

  const toggleEditStats = () => {
    setIsEditingStats(!isEditingStats);
  };

  // For My Progress tab (placeholder goals)
  const totalTopicGoal = 5;
  const totalSkillGoal = 4;
  const totalCertGoal = 2;

  // Renders progress bars in the My Progress tab
  const ProgressCard = ({ label, completed, total, color }) => {
    const percent = total > 0 ? (completed / total) * 100 : 0;
    return (
      <div style={styles.progressCard}>
        <h4 style={styles.progressCardTitle}>{label}</h4>
        <p style={styles.progressCount}>
          {completed} / {total} completed
        </p>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              backgroundColor: color,
              width: `${percent}%`,
            }}
          />
        </div>
        <p style={styles.progressPercent}>{Math.round(percent)}% complete</p>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div style={styles.overviewContainer}>
            <p style={styles.overviewText}>
              Welcome to your personalized SkillPath. Below is a quick snapshot 
              of your **recommended** topics, skills, and certifications progress:
            </p>

            <button style={styles.editStatsButton} onClick={toggleEditStats}>
              {isEditingStats ? "Save" : "Edit Stats"}
            </button>

            <div style={styles.statsGrid}>
              <div style={styles.statBox}>
                {isEditingStats ? (
                  <input
                    type="number"
                    min="0"
                    style={{ ...styles.statInput, color: "#4285f4" }}
                    value={completedTopics}
                    onChange={(e) => setCompletedTopics(Number(e.target.value))}
                  />
                ) : (
                  <span style={styles.statNumberBlue}>{completedTopics}</span>
                )}
                <span style={styles.statLabel}>Topics Completed</span>
              </div>

              <div style={styles.statBox}>
                {isEditingStats ? (
                  <input
                    type="number"
                    min="0"
                    style={{ ...styles.statInput, color: "#34a853" }}
                    value={completedSkills}
                    onChange={(e) => setCompletedSkills(Number(e.target.value))}
                  />
                ) : (
                  <span style={styles.statNumberGreen}>{completedSkills}</span>
                )}
                <span style={styles.statLabel}>Skills Gained</span>
              </div>

              <div style={styles.statBox}>
                {isEditingStats ? (
                  <input
                    type="number"
                    min="0"
                    style={{ ...styles.statInput, color: "#fbbc04" }}
                    value={completedCerts}
                    onChange={(e) => setCompletedCerts(Number(e.target.value))}
                  />
                ) : (
                  <span style={styles.statNumberOrange}>{completedCerts}</span>
                )}
                <span style={styles.statLabel}>Certifications Earned</span>
              </div>
            </div>
          </div>
        );

      case "My Progress":
        return (
          <div style={styles.myProgressContainer}>
            <p style={styles.overviewText}>
              Your current skill development plan is based on the fields you 
              entered (e.g., Occupation, Career Goal). Below, you’ll see how far 
              you’ve progressed in each area:
            </p>

            <div style={styles.myProgressGrid}>
              <ProgressCard
                label="Topics"
                completed={completedTopics}
                total={totalTopicGoal}
                color="#4285f4"
              />
              <ProgressCard
                label="Skills"
                completed={completedSkills}
                total={totalSkillGoal}
                color="#34a853"
              />
              <ProgressCard
                label="Certifications"
                completed={completedCerts}
                total={totalCertGoal}
                color="#fbbc04"
              />
            </div>

            <p style={{ ...styles.overviewText, marginTop: "1rem" }}>
              Every journey starts with a single step. Keep going! 
              Your skill goals are within reach.
            </p>
          </div>
        );

      case "Resources":
        return (
          <div style={styles.overviewContainer}>
            <p style={styles.overviewText}>
              Looking to expand your knowledge further? 
              Here are some external platforms where you can find 
              more resources and certifications:
            </p>
            <ul style={styles.resourcesList}>
              <li>
                <a href="https://www.coursera.org/" target="_blank" rel="noreferrer">
                  Coursera
                </a>
              </li>
              <li>
                <a href="https://www.udemy.com/" target="_blank" rel="noreferrer">
                  Udemy
                </a>
              </li>
              <li>
                <a href="https://www.edx.org/" target="_blank" rel="noreferrer">
                  edX
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/learning/" target="_blank" rel="noreferrer">
                  LinkedIn Learning
                </a>
              </li>
              <li>
                <a href="https://www.khanacademy.org/" target="_blank" rel="noreferrer">
                  Khan Academy
                </a>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      {/* TOP NAVIGATION BAR */}
      <header style={styles.navbar}>
        <div style={styles.navLeft}>
          {/* LOGO */}
          <img src={Logo} alt="Project S Logo" style={styles.logo} />
          {/* MAIN NAV LINKS (left side) */}
          <ul style={styles.navLinks}>
            <li>
              <Link to="/dashboard" style={styles.navLink}>Home</Link>
            </li>
            <li>
              <Link to="/Model" style={styles.navLink}>Model</Link>
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

        {/* RIGHT SIDE: PROFILE + SIGN OUT */}
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
        {/* HERO SECTION */}
        <section style={styles.heroSection}>
          {/* LEFT TEXT */}
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>Welcome {profileData.name}!</h1>
            <p style={styles.heroSubtitle}>
              Project S is a free platform that guides you through skill development 
              based on your background and career goals. Update your profile, 
              explore recommended topics, and work toward certifications.
            </p>
            <Link to="/chatbot">
              <button style={styles.startNowButton}>Start Now</button>
            </Link>
          </div>

          {/* RIGHT: PROFILE CARD (with Firestore data) */}
          <div style={styles.profileCard}>
            <h3 style={styles.profileCardTitle}>Your Profile</h3>
            <p style={styles.profileItem}>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p style={styles.profileItem}>
              <strong>Occupation:</strong> {profileData.occupation}
            </p>
            <p style={styles.profileItem}>
              <strong>Location:</strong> {profileData.location}
            </p>
            <Link to="/profile">
              <button style={styles.profileCardButton}>View Profile</button>
            </Link>
          </div>
        </section>

        {/* FULL-WIDTH GREY SECTION */}
        <section style={styles.fullWidthGrey}>
          <div style={styles.greyContentContainer}>
            <h2 style={styles.subHeaderTitle}>Skill Development Guidelines</h2>
            <p style={styles.subHeaderDescription}>
              Based on your Profile and Inputs, Project S curates 
              recommended topics, suggested skills, and certification pathways. 
              Use the tabs below to explore your progress, upskill further, 
              and discover additional resources.
            </p>

            {/* TAB NAVIGATION */}
            <div style={styles.tabsContainer}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tabButton,
                    borderBottom: activeTab === tab ? "3px solid #4285f4" : "none",
                    color: activeTab === tab ? "#4285f4" : "#202124",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div style={styles.tabContentSection}>
              {renderTabContent()}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={styles.faqSection}>
          <div style={styles.faqHeader}>
            <h2 style={styles.faqTitle}>Help & Support</h2>
            {expandedIndices.length < FAQ_DATA.length ? (
              <button onClick={expandAll} style={styles.expandButton}>
                Expand all
              </button>
            ) : (
              <button onClick={collapseAll} style={styles.expandButton}>
                Collapse all
              </button>
            )}
          </div>

          {/* FAQ ITEMS */}
          {FAQ_DATA.map((item, index) => (
            <div style={styles.faqItem} key={index}>
              <div
                style={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <span style={styles.faqIcon}>
                  {expandedIndices.includes(index) ? "▲" : "▼"}
                </span>
              </div>
              {expandedIndices.includes(index) && (
                <div style={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>

      {/* MOTIVATIONAL QUOTE FOOTER */}
      <footer style={styles.footer}>
        <p style={styles.quote}>Sky is the limit... Never stop learning</p>
      </footer>
    </div>
  );
};

export default Dashboard;

/* Inline styles for demonstration. */
const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    color: "#202124",
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
  },
  /* HERO SECTION */
  heroSection: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: "2rem 0",
    gap: "2rem",
  },
  heroText: {
    flex: "1 1 50%",
    padding: "1rem",
  },
  heroTitle: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    maxWidth: "600px",
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    maxWidth: "600px",
    marginBottom: "1.5rem",
  },
  startNowButton: {
    backgroundColor: "#4285f4",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  /* PROFILE CARD */
  profileCard: {
    flex: "1 1 300px",
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },
  profileCardTitle: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
  },
  profileItem: {
    margin: "0.8rem 0",
  },
  profileCardButton: {
    backgroundColor: "#4285f4",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  /* FULL-WIDTH GREY SECTION */
  fullWidthGrey: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "3rem 0",
  },
  greyContentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  /* SUB-HEADER SECTION */
  subHeaderTitle: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  subHeaderDescription: {
    fontSize: "1rem",
    maxWidth: "700px",
    margin: "0.5rem auto 2rem",
    lineHeight: "1.6",
    color: "#5f6368",
    textAlign: "center",
  },
  /* TABS */
  tabsContainer: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  tabButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: "0.5rem 0",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  tabContentSection: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  overviewContainer: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "left",
  },
  overviewText: {
    fontSize: "1rem",
    color: "#202124",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  editStatsButton: {
    backgroundColor: "#4285f4",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  statsGrid: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    minWidth: "120px",
  },
  statNumberBlue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#4285f4",
  },
  statNumberGreen: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#34a853",
  },
  statNumberOrange: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fbbc04",
  },
  statLabel: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    color: "#202124",
  },
  statInput: {
    width: "60px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "0.5rem",
  },
  /* MY PROGRESS TAB */
  myProgressContainer: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "left",
  },
  myProgressGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "1.5rem",
  },
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "1rem",
    width: "200px",
    textAlign: "center",
  },
  progressCardTitle: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  progressCount: {
    fontSize: "0.95rem",
    marginBottom: "0.5rem",
  },
  progressBar: {
    backgroundColor: "#eee",
    borderRadius: "4px",
    height: "8px",
    marginBottom: "0.5rem",
  },
  progressFill: {
    height: "8px",
    borderRadius: "4px",
    transition: "width 0.4s ease",
  },
  progressPercent: {
    fontSize: "0.85rem",
    color: "#5f6368",
  },
  /* RESOURCES TAB */
  resourcesList: {
    listStyle: "disc inside",
    textAlign: "left",
    margin: "0 auto",
    maxWidth: "600px",
    lineHeight: "1.6",
  },
  /* FAQ SECTION */
  faqSection: {
    borderTop: "1px solid #eee",
    padding: "2rem 1rem",
    marginBottom: "3rem",
  },
  faqHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  faqTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: 0,
  },
  expandButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#4285f4",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  faqItem: {
    marginBottom: "1rem",
    borderBottom: "1px solid #ddd",
    paddingBottom: "1rem",
  },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#202124",
  },
  faqIcon: {
    marginLeft: "1rem",
  },
  faqAnswer: {
    paddingLeft: "0.5rem",
    color: "#5f6368",
    lineHeight: "1.5",
  },
  /* FOOTER with motivational quote */
  footer: {
    textAlign: "center",
    padding: "2rem 1rem",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
  },
  quote: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    color: "#5f6368",
    margin: 0,
  },
};
