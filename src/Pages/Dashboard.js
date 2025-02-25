// // // // // // // // // import React from "react";
// // // // // // // // // import "./UserDashboard.css";

// // // // // // // // // const UserDashboard = () => {
// // // // // // // // //   return (
// // // // // // // // //     <div className="dashboard-container">
// // // // // // // // //       {/* Sidebar Navigation */}
// // // // // // // // //       <aside className="sidebar">
// // // // // // // // //         <h1 className="project-title">Project S</h1>
// // // // // // // // //         <nav className="sidebar-menu">
// // // // // // // // //           <ul>
// // // // // // // // //             <li className="menu-item active">Dashboard</li>
// // // // // // // // //             <li className="menu-item">My Learning</li>
// // // // // // // // //             <li className="menu-item">Events</li>
// // // // // // // // //             <li className="menu-item">Projects</li>
// // // // // // // // //             <li className="menu-item">Workspaces</li>
// // // // // // // // //             <li className="menu-item signout">Sign Out</li>
// // // // // // // // //           </ul>
// // // // // // // // //         </nav>
// // // // // // // // //       </aside>

// // // // // // // // //       {/* Main Content Section */}
// // // // // // // // //       <main className="main-content">
// // // // // // // // //         <h2 className="main-heading">Start Learning</h2>
// // // // // // // // //         <div className="related-topics">
// // // // // // // // //           <span>Related topics: </span>
// // // // // // // // //           <a href="#">HTML & CSS</a>
// // // // // // // // //           <a href="#">JavaScript</a>
// // // // // // // // //           <a href="#">Python</a>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="course-container">
// // // // // // // // //           <div className="course-card">
// // // // // // // // //             <div className="badge free">Free Course</div>
// // // // // // // // //             <h3>Learn JavaScript</h3>
// // // // // // // // //             <p>Master JavaScript to create dynamic and interactive websites.</p>
// // // // // // // // //             <p className="course-info">Beginner Friendly · 15 hours</p>
// // // // // // // // //           </div>

// // // // // // // // //           <div className="course-card">
// // // // // // // // //             <div className="badge professional">Career Path</div>
// // // // // // // // //             <h3>Full-Stack Engineer</h3>
// // // // // // // // //             <p>A complete guide to becoming a full-stack developer.</p>
// // // // // // // // //             <p className="course-info">Professional Certification · 150 hours</p>
// // // // // // // // //           </div>

// // // // // // // // //           <div className="course-card">
// // // // // // // // //             <div className="badge beginner">Skill Path</div>
// // // // // // // // //             <h3>Code Foundations</h3>
// // // // // // // // //             <p>Kickstart your programming journey with basic coding concepts.</p>
// // // // // // // // //             <p className="course-info">Beginner Friendly · 4 hours</p>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Progress Section */}
// // // // // // // // //         <div className="progress-section">
// // // // // // // // //           <h3>Follow your progress</h3>
// // // // // // // // //           <div className="progress-card">
// // // // // // // // //             <h4>No weekly target set yet</h4>
// // // // // // // // //             <button className="set-target-btn">Set target</button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </main>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default UserDashboard;


// // // // // // // // import React from "react";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import "./Dashboard.css";

// // // // // // // // const Dashboard = () => {
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   return (
// // // // // // // //     <div className="dashboard-container">
// // // // // // // //       <aside className="sidebar">
// // // // // // // //         <h1 className="project-title">Project S</h1>
// // // // // // // //         <nav className="sidebar-menu">
// // // // // // // //           <ul>
// // // // // // // //             <li className="menu-item active">Dashboard</li>
// // // // // // // //             <li className="menu-item">Topics</li>
// // // // // // // //             <li className="menu-item">Skills</li>
// // // // // // // //             <li className="menu-item">Courses</li>
// // // // // // // //             <li className="menu-item" onClick={() => navigate("/settings")}>
// // // // // // // //               Settings
// // // // // // // //             </li>
// // // // // // // //             <li className="menu-item signout" onClick={() => navigate("/")}>
// // // // // // // //               Sign Out
// // // // // // // //             </li>
// // // // // // // //           </ul>
// // // // // // // //         </nav>
// // // // // // // //       </aside>

// // // // // // // //       <main className="main-content">
// // // // // // // //         <h2 className="main-heading">Welcome back, [User Name]!</h2>
// // // // // // // //         <p>Your learning progress is just a click away.</p>
// // // // // // // //         <div className="course-container">
// // // // // // // //           <div className="course-card">
// // // // // // // //             <h3>HTML Basics</h3>
// // // // // // // //             <p>Master HTML to create and structure your web pages.</p>
// // // // // // // //             <button className="course-button">View Course</button>
// // // // // // // //           </div>
// // // // // // // //           <div className="course-card">
// // // // // // // //             <h3>JavaScript Fundamentals</h3>
// // // // // // // //             <p>Build dynamic web applications with JavaScript.</p>
// // // // // // // //             <button className="course-button">View Course</button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Dashboard;
// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import { signOut, onAuthStateChanged } from "firebase/auth";
// // // // // // // import { doc, getDoc } from "firebase/firestore";
// // // // // // // import { auth, db } from "../firebase-config"; // Firebase configuration
// // // // // // // import "./Dashboard.css"; // CSS for styling

// // // // // // // const Dashboard = () => {
// // // // // // //   const [userName, setUserName] = useState("");
// // // // // // //   const navigate = useNavigate();

// // // // // // //   // Check if user is logged in
// // // // // // //   useEffect(() => {
// // // // // // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // // // // // //       if (user) {
// // // // // // //         const userDocRef = doc(db, "users", user.uid);
// // // // // // //         const userDoc = await getDoc(userDocRef);
// // // // // // //         if (userDoc.exists()) {
// // // // // // //           setUserName(userDoc.data().username || "User");
// // // // // // //         }
// // // // // // //       } else {
// // // // // // //         navigate("/login"); // Redirect to login if user is not logged in
// // // // // // //       }
// // // // // // //     });
// // // // // // //     return () => unsubscribe();
// // // // // // //   }, [navigate]);

// // // // // // //   // Handle sign out
// // // // // // //   const handleSignOut = async () => {
// // // // // // //     await signOut(auth);
// // // // // // //     navigate("/login"); // Redirect to login after sign out
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="dashboard-container">
// // // // // // //       <div className="sidebar">
// // // // // // //         <h2 className="sidebar-title">Project S</h2>
// // // // // // //         <ul className="sidebar-links">
// // // // // // //           <li onClick={() => navigate("/dashboard")}>Dashboard</li>
// // // // // // //           <li onClick={() => navigate("/chatbot")}>Start Chatbot</li>
// // // // // // //           <li onClick={handleSignOut}>Sign Out</li>
// // // // // // //         </ul>
// // // // // // //       </div>

// // // // // // //       <div className="main-content">
// // // // // // //         <h1>Welcome, {userName}!</h1>
// // // // // // //         <p>Ready to begin? Click the button below to get started.</p>
// // // // // // //         <button className="start-btn" onClick={() => navigate("/chatbot")}>
// // // // // // //           Start Now
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Dashboard;
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import Sidebar from "./Sidebar"; // Sidebar component
// // // // // // import "./Dashboard.css";
// // // // // // import { auth, db } from "../firebase-config";
// // // // // // import { doc, getDoc } from "firebase/firestore";

// // // // // // // No need to import logo directly if it's from public folder
// // // // // // const Dashboard = () => {
// // // // // //   const [username, setUsername] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     const fetchUsername = async () => {
// // // // // //       const user = auth.currentUser;
// // // // // //       if (user) {
// // // // // //         const docRef = doc(db, "users", user.uid);
// // // // // //         const docSnap = await getDoc(docRef);
// // // // // //         if (docSnap.exists()) {
// // // // // //           setUsername(docSnap.data().username);
// // // // // //         }
// // // // // //       }
// // // // // //     };
// // // // // //     fetchUsername();
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div className="dashboard-container">
// // // // // //       <Sidebar />
// // // // // //       <div className="main-content">
// // // // // //         {/* Logo Display */}
// // // // // //         <div className="navbar-logo">
// // // // // //           <img src="/Logo.png" alt="Project S Logo" className="logo-image" />
// // // // // //         </div>
// // // // // //         <h1>Welcome, {username || "User"}!</h1>
// // // // // //         <p>Your personalized learning dashboard is ready.</p>
// // // // // //         <button className="start-btn">Start Now</button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Dashboard;

// // // // // import React from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import "./Dashboard.css";
// // // // // import Logo from "./Logo.png"; // Adjust the path if needed

// // // // // const Dashboard = () => {
// // // // //   const navigate = useNavigate();

// // // // //   const handleLogout = () => {
// // // // //     // Clear user session and navigate to login page
// // // // //     localStorage.removeItem("authToken"); // If you're storing a token
// // // // //     navigate("/login");
// // // // //   };

// // // // //   return (
// // // // //     <div className="dashboard-container">
// // // // //       {/* Left Sidebar */}
// // // // //       <div className="sidebar">
// // // // //         <img src={Logo} alt="Project S Logo" className="logo" />
// // // // //         <nav>
// // // // //           <ul>
// // // // //             <li onClick={() => navigate("/")}>Home</li>
// // // // //             <li onClick={() => navigate("/skills")}>Skills</li>
// // // // //             <li onClick={() => navigate("/topics")}>Topics</li>
// // // // //             <li onClick={() => navigate("/certifications")}>Certifications</li>
// // // // //             <li onClick={() => alert("Settings Page Coming Soon!")}>Settings</li>
// // // // //             <li onClick={handleLogout}>Sign Out</li>
// // // // //           </ul>
// // // // //         </nav>
// // // // //       </div>

// // // // //       {/* Main Content */}
// // // // //       <div className="main-content">
// // // // //         <header className="welcome-header">
// // // // //           <h1>Welcome, User!</h1>
// // // // //           <p>Let’s dive into your journey. Click below to get started.</p>
// // // // //         </header>
// // // // //         <div className="start-now">
// // // // //           <button className="start-now-button" onClick={() => navigate("/chatbot")}>
// // // // //             Start Now
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;
// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "./Dashboard.css";
// // // // import Logo from "./Logo.png"; // Adjust the path if needed
// // // // import { auth, db } from "../firebase-config";
// // // // import { doc, getDoc } from "firebase/firestore";

// // // // const Dashboard = () => {
// // // //   const navigate = useNavigate();
// // // //   const [userName, setUserName] = useState("");

// // // //   const handleLogout = () => {
// // // //     auth.signOut().then(() => {
// // // //       localStorage.removeItem("authToken"); // Clear session
// // // //       navigate("/login");
// // // //     });
// // // //   };

// // // //   // Fetch user data from Firebase
// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       const user = auth.currentUser;
// // // //       if (user) {
// // // //         const userDocRef = doc(db, "users", user.uid);
// // // //         const userDoc = await getDoc(userDocRef);
// // // //         if (userDoc.exists()) {
// // // //           const userData = userDoc.data();
// // // //           setUserName(userData.firstName || "User");
// // // //         } else {
// // // //           console.error("No user data found!");
// // // //         }
// // // //       } else {
// // // //         console.error("User not authenticated!");
// // // //         navigate("/login");
// // // //       }
// // // //     };

// // // //     fetchUserData();
// // // //   }, [navigate]);

// // // //   return (
// // // //     <div className="dashboard-container">
// // // //       {/* Sidebar */}
// // // //       <div className="sidebar">
// // // //         <img src={Logo} alt="Project S Logo" className="logo" />
// // // //         <nav>
// // // //           <ul>
// // // //             <li onClick={() => navigate("/")}>Home</li>
// // // //             <li onClick={() => navigate("/skills")}>Skills</li>
// // // //             <li onClick={() => navigate("/topics")}>Topics</li>
// // // //             <li onClick={() => navigate("/certifications")}>Certifications</li>
// // // //             <li onClick={() => alert("Settings Page Coming Soon!")}>Settings</li>
// // // //             <li onClick={handleLogout}>Sign Out</li>
// // // //           </ul>
// // // //         </nav>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <div className="main-content">
// // // //         <header className="welcome-header">
// // // //           <h1>Welcome, {userName}!</h1>
// // // //           <p>Let’s dive into your journey. Click below to get started.</p>
// // // //         </header>
// // // //         <div className="start-now">
// // // //           <button className="start-now-button" onClick={() => navigate("/chatbot")}>
// // // //             Start Now
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // import React, { useContext } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { AuthContext } from "./AuthProvider"; // Path based on your structure
// // // import { signOut } from "firebase/auth";
// // // import { auth } from "../firebase-config"; // Path to firebase config
// // // import "./Dashboard.css"; // Dashboard styles
// // // import Logo from "./Logo.png"; // Correct relative path for your logo

// // // const Dashboard = () => {
// // //   const navigate = useNavigate();
// // //   const { user } = useContext(AuthContext);

// // //   const handleSignOut = async () => {
// // //     await signOut(auth);
// // //     navigate("/login");
// // //   };

// // //   return (
// // //     <div className="dashboard-page">
// // //       <div className="floating-shape shape-blue"></div>
// // //       <div className="floating-shape shape-orange"></div>

// // //       <div className="dashboard-container">
// // //         <aside className="sidebar">
// // //           <img src={Logo} alt="Project S Logo" className="logo" />
// // //           <nav>
// // //             <ul>
// // //               <li>
// // //                 <Link to="/dashboard">Home</Link>
// // //               </li>
// // //               <li>
// // //                 <Link to="/skills">Skills</Link>
// // //               </li>
// // //               <li>
// // //                 <Link to="/topics">Topics</Link>
// // //               </li>
// // //               <li>
// // //                 <Link to="/certifications">Certifications</Link>
// // //               </li>
// // //               <li>
// // //                 <Link to="/settings">Settings</Link>
// // //               </li>
// // //               <li>
// // //                 <button onClick={handleSignOut} className="signout-button">
// // //                   Sign Out
// // //                 </button>
// // //               </li>
// // //             </ul>
// // //           </nav>
// // //         </aside>
// // //         <main className="main-content">
// // //           <div className="welcome-header">
// // //             <h1>Welcome, {user?.displayName || "User"}!</h1>
// // //             <p>Let’s dive into your journey. Click below to get started.</p>
// // //             <div className="start-now">
// // //               <Link to="/chatbot">
// // //                 <button className="start-now-button">Start Now</button>
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "./AuthProvider"; // Importing useAuth for authentication context
// // import { signOut } from "firebase/auth";
// // import { auth } from "../firebase-config"; // Importing Firebase configuration
// // import "./Dashboard.css"; // Importing styles

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const { user } = useAuth(); // Access user information

// //   const handleSignOut = async () => {
// //     await signOut(auth);
// //     navigate("/login"); // Redirect to login after sign out
// //   };

// //   return (
// //     <div className="dashboard-page">
// //       <div className="dashboard-container">
// //         <aside className="sidebar">
// //           <h2 className="sidebar-title">Dashboard</h2>
// //           <nav>
// //             <ul>
// //               <li>
// //                 <Link to="/dashboard">Home</Link>
// //               </li>
// //               <li>
// //                 <Link to="/skills">Skills</Link>
// //               </li>
// //               <li>
// //                 <Link to="/topics">Topics</Link>
// //               </li>
// //               <li>
// //                 <Link to="/certifications">Certifications</Link>
// //               </li>
// //               <li>
// //                 <Link to="/guideline">Settings</Link>
// //               </li>
// //               <li>
// //                 <button onClick={handleSignOut} className="signout-button">
// //                   Sign Out
// //                 </button>
// //               </li>
// //             </ul>
// //           </nav>
// //         </aside>
// //         <main className="main-content">
// //           <div className="welcome-header">
// //             <h1>Welcome, {user?.displayName || "User"}!</h1>
// //             <p>Let’s dive into your journey. Click below to get started.</p>
// //             <div className="start-now">
// //               <Link to="/chatbot">
// //                 <button className="start-now-button">Start Now</button>
// //               </Link>
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthProvider"; // Ensure you use the correct import path
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase-config"; // Import firebase config
// import "./Dashboard.css"; // Dashboard styles
// import Logo from "./Logo.png"; // Path to your logo

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const handleSignOut = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-container">
//         <aside className="sidebar">
//           <div className="logo-container">
//             <img src={Logo} alt="Project S Logo" className="logo" />
//             <h2>Project S</h2>
//           </div>
//           <nav>
//             <ul className="sidebar-links">
//               <li>
//                 <Link to="/dashboard">Home</Link>
//               </li>
//               <li>
//                 <Link to="/skills">Skills</Link>
//               </li>
//               <li>
//                 <Link to="/topics">Topics</Link>
//               </li>
//               <li>
//                 <Link to="/certifications">Certifications</Link>
//               </li>
//               <li>
//                 <Link to="/settings">Settings</Link>
//               </li>
//               <li>
//                 <button onClick={handleSignOut} className="signout-button">
//                   Sign Out
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </aside>
//         <main className="main-content">
//           <div className="welcome-header">
//             <h1>Welcome, {user?.displayName || "User"}!</h1>
//             <p>Let’s dive into your journey. Click below to get started.</p>
//             <div className="start-now">
//               <Link to="/chatbot">
//                 <button className="start-now-button">Start Now</button>
//               </Link>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Auth Provider for user context
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config"; // Firebase configuration
import "./Dashboard.css"; // Import updated styles
import Logo from "./Logo.png"; // Path to logo

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Helper function to extract name from email if displayName is unavailable
  const getUserName = () => {
    if (user?.displayName) {
      return user.displayName; // If displayName is available, use it
    } else if (user?.email) {
      const username = user.email.split("@")[0]; // Extract name from email before "@"
      return username.charAt(0).toUpperCase() + username.slice(1); // Capitalize the first letter
    }
    return "User";
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="logo-container">
            <img src={Logo} alt="Project S Logo" className="logo" />
          </div>
          <nav>
            <ul className="sidebar-links">
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/Model">Model</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/certifications">Certifications</Link>
              </li>
              <li>
                <Link to="/skills">Skills</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="signout-button">
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-header">
            <h1 className="welcome-title">Welcome, {getUserName()}!</h1>
            <p className="welcome-subtitle">Let’s dive into your journey. Click below to get started.</p>
            <div className="start-now">
              <Link to="/chatbot">
                <button className="start-now-button">Start Now</button>
              </Link>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Your Progress</h3>
              <p>0% of your courses completed.
                Update your progresss now!
              </p>
              <Link to="/topics">
                <button className="card-button">Update now!</button>
              </Link>
            </div>
            <div className="card">
              <h3>New Topics Available</h3>
              <p>Check out our latest additions!</p>
              <Link to="/topics">
                <button className="card-button">Explore Topics</button>
              </Link>
            </div>
            <div className="card">
              <h3>Upcoming Certifications</h3>
              <p>Get certified and show off your skills!</p>
              <Link to="/certifications">
                <button className="card-button">View Certifications</button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
