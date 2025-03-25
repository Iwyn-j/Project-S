// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// // import './App.css'; // Main CSS file
// // import './Pages/Login.css'; // Login page CSS file
// // import Login from './Pages/Login'; // Login component

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <header className="App-header">
// //           <img src="./logo.png" alt="Logo" className="App-logo" />
// //           <h1>Welcome to Project S</h1>
// //           <p>This is Project S, and Yash and Iwyn are going to be working on this form.</p>

// //           <div className="button-container">
// //             {/* Existing Button */}
// //             <button onClick={() => alert('Welcome!')}>Click Me!</button>

// //             {/* Register Button - Links to Login Page */}
// //             <Link to="/login">
// //               <button>Register</button>
// //             </Link>
// //           </div>
// //         </header>

// //         {/* Define Routes */}
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// // import './App.css'; // App styles
// // import './Pages/Login.css'; // Login styles
// // import Login from './Pages/Login'; // Login component
// // import './Pages/Register.css'; // Login styles
// // import Register from './Pages/Register';
// // import ChatBot from "./Pages/Chatbot";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Route for the Home Page */}
// //         <Route
// //           path="/"
// //           element={
// //             <div className="App">
// //               <header className="App-header">
// //                 <img src="./logo.png" alt="Logo" className="App-logo" />
// //                 <h1>Welcome to Project S</h1>
// //                 <p>This is Project S, and Yash and Iwyn are going to be working on this form.</p>

// //                 <div className="button-container">
// //                   {/* <button onClick={() => alert('Welcome!')}>Register</button> */}

// //                   {/* Register button navigates to Login */}
// //                   <Link to="/login">
// //                     <button>Login</button>
// //                   </Link>
// //                   <Link to="/register">
// //                     <button>Register</button>
// //                   </Link>
// //                 </div>
// //               </header>
// //             </div>
// //           }
// //         />

// //         {/* Route for the Login Page */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/chatbot" element={<Chatbot />} />
        
// //         <Route path="/register" element={<Register />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // import './App.css'; // App styles
// // import Login from './Pages/Login'; // Login component
// // import Register from './Pages/Register'; // Register component
// // import ChatBot from './Pages/ChatBot'; // ChatBot component

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Home Page */}
// //         <Route
// //           path="/"
// //           element={
// //             <div className="App">
// //               <header className="App-header">
// //                 <img src="./logo.png" alt="Logo" className="App-logo" />
// //                 <h1>Welcome to Project S</h1>
// //                 <p>This is Project S, and Yash and Iwyn are going to be working on this form.</p>

// //                 <div className="button-container">
// //                   {/* Home page buttons */}
// //                   <Link to="/login">
// //                     <button>Login</button>
// //                   </Link>
// //                   <Link to="/register">
// //                     <button>Register</button>
// //                   </Link>
// //                 </div>
// //               </header>
// //             </div>
// //           }
// //         />

// //         {/* Login Page */}
// //         <Route path="/login" element={<Login />} />

// //         {/* Register Page */}
// //         <Route path="/register" element={<Register />} />

// //         {/* ChatBot Page */}
// //         <Route path="/chatbot" element={<ChatBot />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "./App.css"; // Import CSS file
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import ChatBot from "./Pages/ChatBot"; // ChatBot component
// import Guideline from "./Pages/Guideline"; // Guideline component
// import Dashboard from "./Pages/Dashboard"; // Dashboard component
// import SkillsPage from "./Pages/SkillsPage"; // Skills Page
// import TopicsPage from "./Pages/TopicsPage"; // Topics Page
// import Model from "./Pages/Model"; // Topics Page
// import CertificationsPage from "./Pages/CertificationsPage"; // Certifications Page
// import BookmarksPage from "./Pages/BookmarksPage";  // Bookmarks Page
// import PrivateRoute from "./Pages/PrivateRoute"; // PrivateRoute for protected routes
// import { AuthProvider } from "./Pages/AuthProvider"; // AuthProvider for user context
// import Profile from "./Pages/Profile"; // Profile Page
// import { RecommendationProvider } from './context/RecommendationContext';
// function App() {
//   return (
//     <AuthProvider>
//       <RecommendationProvider>
//         <Router>
//           <Routes>
//             {/* Public Landing Page */}
//             <Route
//             path="/"
//             element={
//               <div className="landing-page">
//                 {/* Navigation Bar */}
//                 <nav className="navbar">
//                   <div className="logo">Project S</div>
//                   <ul className="nav-links">
//                     <li>
//                       <Link to="/login">Login</Link>
//                     </li>
//                     <li>
//                       <Link to="/register">Register</Link>
//                     </li>
//                   </ul>
//                 </nav>

//                 <main className="main-section">
//                   <div className="intro-container">
//                     <h1>Welcome to Project S</h1>
//                     <p className="intro-description">
//                       Project S is your personalized platform for career
//                       guidance, skill development, and goal tracking. Experience
//                       curated recommendations, interactive learning paths, and
//                       real-time support to help you thrive in your professional
//                       journey.
//                     </p>

//                     <div className="features-grid">
//                       <div className="feature-card">
//                         <h3>Curated Paths</h3>
//                         <p>
//                           Discover tailored learning tracks based on your goals
//                           and industry trends.
//                         </p>
//                       </div>

//                       <div className="feature-card">
//                         <h3>Real-time ChatBot</h3>
//                         <p>
//                           Get instant help and career tips from our built-in AI
//                           assistant anytime.
//                         </p>
//                       </div>

//                       <div className="feature-card">
//                         <h3>Certifications</h3>
//                         <p>
//                           Explore free and paid certification pathways to elevate
//                           your credentials.
//                         </p>
//                       </div>
//                     </div>

//                     <div className="buttons">
//                       <Link to="/register">
//                         <button className="get-started-btn">Get Started</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </main>
//               </div>
//             }
//           />


//             {/* Public Pages */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Protected Routes - Require Login */}
//             <Route
//               path="/dashboard"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/chatbot"
//               element={
//                 <PrivateRoute>
//                   <ChatBot />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/Profile"
//               element={
//                 <PrivateRoute>
//                   <Profile />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/skills"
//               element={
//                 <PrivateRoute>
//                   <SkillsPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/topics"
//               element={
//                 <PrivateRoute>
//                   <TopicsPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/certifications"
//               element={
//                 <PrivateRoute>
//                   <CertificationsPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/Model"
//               element={
//                 <PrivateRoute>
//                   <Model />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/guideline"
//               element={
//                 <PrivateRoute>
//                   <Guideline />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/BookmarksPage"
//               element={
//                 <PrivateRoute>
//                   <BookmarksPage />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </Router>
//       </RecommendationProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChatBot from "./Pages/ChatBot";
import Guideline from "./Pages/Guideline";
import Dashboard from "./Pages/Dashboard";
import SkillsPage from "./Pages/SkillsPage";
import TopicsPage from "./Pages/TopicsPage";
import Model from "./Pages/Model";
import CertificationsPage from "./Pages/CertificationsPage";
import BookmarksPage from "./Pages/BookmarksPage";
import PrivateRoute from "./Pages/PrivateRoute";
import { AuthProvider } from "./Pages/AuthProvider";
import Profile from "./Pages/Profile";
import { RecommendationProvider } from './context/RecommendationContext';

function App() {
  return (
    <AuthProvider>
      <RecommendationProvider>
        <Router>
          <Routes>
            {/* Public Landing Page */}
            <Route
              path="/"
              element={
                <div className="landing-page">
                  <nav className="navbar">
                    <div className="logo">Project S</div>
                    <ul className="nav-links">
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                    </ul>
                  </nav>

                  <main className="main-section">
                    <div className="intro-container">
                      <h1>Welcome to Project S</h1>
                      <p className="intro-description">
                        Project S guides your skill development with personalized recommendations. Update your profile, explore topics, and advance your career.
                      </p>

                      <div className="features-grid">
                        <div className="feature-card">
                          <h3>Curated Paths</h3>
                          <p>Personalized learning tracks tailored to your goals.</p>
                        </div>
                        <div className="feature-card">
                          <h3>AI ChatBot</h3>
                          <p>Instant career advice whenever you need it.</p>
                        </div>
                        <div className="feature-card">
                          <h3>Certifications</h3>
                          <p>Enhance your resume with recognized certifications.</p>
                        </div>
                      </div>

                      <div className="buttons">
                        <Link to="/register">
                          <button className="get-started-btn">Get Started</button>
                        </Link>
                      </div>
                    </div>
                  </main>
                </div>
              }
            />

            {/* Public Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/chatbot" element={<PrivateRoute><ChatBot /></PrivateRoute>} />
            <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/skills" element={<PrivateRoute><SkillsPage /></PrivateRoute>} />
            <Route path="/topics" element={<PrivateRoute><TopicsPage /></PrivateRoute>} />
            <Route path="/certifications" element={<PrivateRoute><CertificationsPage /></PrivateRoute>} />
            <Route path="/Model" element={<PrivateRoute><Model /></PrivateRoute>} />
            <Route path="/guideline" element={<PrivateRoute><Guideline /></PrivateRoute>} />
            <Route path="/BookmarksPage" element={<PrivateRoute><BookmarksPage /></PrivateRoute>} />
          </Routes>
        </Router>
      </RecommendationProvider>
    </AuthProvider>
  );
}

export default App;
