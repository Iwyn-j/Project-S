// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css'; // Main CSS file
// import './Pages/Login.css'; // Login page CSS file
// import Login from './Pages/Login'; // Login component

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <img src="./logo.png" alt="Logo" className="App-logo" />
//           <h1>Welcome to Project S</h1>
//           <p>This is Project S, and Yash and Iwyn are going to be working on this form.</p>

//           <div className="button-container">
//             {/* Existing Button */}
//             <button onClick={() => alert('Welcome!')}>Click Me!</button>

//             {/* Register Button - Links to Login Page */}
//             <Link to="/login">
//               <button>Register</button>
//             </Link>
//           </div>
//         </header>

//         {/* Define Routes */}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css'; // App styles
// import './Pages/Login.css'; // Login styles
// import Login from './Pages/Login'; // Login component
// import './Pages/Register.css'; // Login styles
// import Register from './Pages/Register';
// import ChatBot from "./Pages/Chatbot";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Route for the Home Page */}
//         <Route
//           path="/"
//           element={
//             <div className="App">
//               <header className="App-header">
//                 <img src="./logo.png" alt="Logo" className="App-logo" />
//                 <h1>Welcome to Project S</h1>
//                 <p>This is Project S, and Yash and Iwyn are going to be working on this form.</p>

//                 <div className="button-container">
//                   {/* <button onClick={() => alert('Welcome!')}>Register</button> */}

//                   {/* Register button navigates to Login */}
//                   <Link to="/login">
//                     <button>Login</button>
//                   </Link>
//                   <Link to="/register">
//                     <button>Register</button>
//                   </Link>
//                 </div>
//               </header>
//             </div>
//           }
//         />

//         {/* Route for the Login Page */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/chatbot" element={<Chatbot />} />
        
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'; // App styles
import Login from './Pages/Login'; // Login component
import Register from './Pages/Register'; // Register component
import ChatBot from './Pages/ChatBot'; // ChatBot component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <img src="./logo.png" alt="Logo" className="App-logo" />
                <h1>Welcome to Project S</h1>
                <p>This is Project S, and Yash and Iwyn are going to be working on this form.</p>

                <div className="button-container">
                  {/* Home page buttons */}
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                  <Link to="/register">
                    <button>Register</button>
                  </Link>
                </div>
              </header>
            </div>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* ChatBot Page */}
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </Router>
  );
}

export default App;



