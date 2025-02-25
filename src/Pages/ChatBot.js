// import React, { useState, useEffect } from "react";
// import styled, { keyframes } from "styled-components";
// import { FiSend } from "react-icons/fi";
// import { auth, db } from "../firebase-config";
// import { doc, collection, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// // Questions Array
// const questions = [
//   { id: 1, question: "What is your full name?", type: "text" },
//   { id: 2, question: "What is your age?", type: "number" },
//   { id: 3, question: "What is your educational background?", type: "dropdown", options: ["High School", "Diploma", "Degree", "Master's", "PhD"] },
//   { id: 4, question: "What is your current occupation?", type: "text" },
//   { id: 5, question: "What are your career goals?", type: "text" },
//   { id: 6, question: "What industry are you most interested in working in?", type: "dropdown", options: ["Technology", "Finance", "Healthcare", "Education", "Creative Arts", "Others"] },
//   { id: 7, question: "What skills do you possess that are relevant to your career goals?", type: "text" },
//   { id: 8, question: "What is your dream job title?", type: "text" },
//   { id: 9, question: "What motivates you the most in your career?", type: "text" },
//   { id: 10, question: "How many years of work experience do you have?", type: "number" },
//   { id: 11, question: "What kind of work environment do you prefer?", type: "dropdown", options: ["Corporate", "Startup", "Remote", "Hybrid", "Others"] },
//   { id: 12, question: "What are your expectations for work-life balance?", type: "text" },
//   { id: 13, question: "What is your preferred salary range?", type: "text" },
//   { id: 14, question: "What additional skills or certifications would you like to acquire?", type: "text" },
//   { id: 15, question: "Do you have any specific companies in mind you'd like to work for?", type: "text" },
//   { id: 16, question: "What is your biggest professional achievement so far?", type: "text" },
//   { id: 17, question: "What is your biggest professional challenge so far?", type: "text" },
//   { id: 18, question: "Are you open to relocating for your career?", type: "dropdown", options: ["Yes", "No", "Maybe"] },
//   { id: 19, question: "What do you consider your biggest strength?", type: "text" },
//   { id: 20, question: "What do you consider your biggest weakness?", type: "text" },
//   { id: 21, question: "Do you prefer working independently or in a team?", type: "dropdown", options: ["Independently", "In a Team", "Both"] },
//   { id: 22, question: "What role do you usually take in a team setting?", type: "text" },
//   { id: 23, question: "How do you usually handle work-related stress?", type: "text" },
//   { id: 24, question: "What steps are you taking to achieve your career goals?", type: "text" },
//   { id: 25, question: "What are your short-term career goals (1-3 years)?", type: "text" },
//   { id: 26, question: "What are your long-term career goals (5+ years)?", type: "text" },
// ];

// const ChatBot = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [responses, setResponses] = useState({});
//   const [inputValue, setInputValue] = useState("");
//   const [sessionId, setSessionId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const createSession = async () => {
//       try {
//         const user = auth.currentUser;

//         if (!user) {
//           console.error("No authenticated user found.");
//           alert("User not authenticated. Please log in.");
//           navigate("/login");
//           return;
//         }

//         // Create a new session in Firestore
//         const sessionsRef = collection(db, "users", user.uid, "sessions");
//         const sessionDoc = await addDoc(sessionsRef, {
//           startedAt: serverTimestamp(),
//         });

//         console.log("New session created with ID:", sessionDoc.id);
//         setSessionId(sessionDoc.id); // Store session ID
//       } catch (error) {
//         console.error("Error initializing session:", error.message);
//         alert("Failed to initialize session. Please try again.");
//       }
//     };

//     createSession();
//   }, [navigate]);

//   const handleNext = async () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     if (inputValue.trim() === "") {
//       console.warn("Empty input value, skipping.");
//       return;
//     }

//     // Save the current answer
//     setResponses((prev) => ({ ...prev, [currentQuestion.question]: inputValue }));

//     if (currentQuestionIndex < questions.length - 1) {
//       // Move to the next question
//       setInputValue("");
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       // Final step: Save all answers to Firestore
//       await saveToFirebase();
//     }
//   };

//   const saveToFirebase = async () => {
//     try {
//       const user = auth.currentUser;

//       if (!user) {
//         console.error("No authenticated user found.");
//         alert("User not authenticated. Please log in.");
//         navigate("/login");
//         return;
//       }

//       if (!sessionId) {
//         console.error("Session ID not found.");
//         alert("Session not initialized. Please try again.");
//         return;
//       }

//       // Reference to the current session document
//       const sessionRef = doc(db, "users", user.uid, "sessions", sessionId);

//       // Save responses to Firestore
//       await setDoc(sessionRef, {
//         responses,
//         completedAt: serverTimestamp(),
//       });

//       console.log("Responses saved successfully.");
//       alert("Responses saved successfully!");
//       navigate("/"); // Redirect to home
//     } catch (error) {
//       console.error("Firestore save error:", error.code, error.message);
//       alert(`Failed to save responses: ${error.message}`);
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <ChatContainer>
//       {/* Animated Background */}
//       <AnimatedBackground>
//         {[...Array(30)].map((_, i) => (
//           <Bubble
//             key={i}
//             style={{
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${3 + Math.random() * 5}s`,
//               animationDelay: `${Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </AnimatedBackground>

//       {/* Chatbox */}
//       <ChatBox>
//         <h2>🤖 Smart ChatBot</h2>
//         <ChatBubble>
//           <p>{currentQuestion.question}</p>
//         </ChatBubble>

//         {currentQuestion.type === "dropdown" ? (
//           <Dropdown
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onBlur={handleNext} // Auto-submit dropdown
//           >
//             <option value="">Select an option</option>
//             {currentQuestion.options.map((option, idx) => (
//               <option key={idx} value={option}>
//                 {option}
//               </option>
//             ))}
//           </Dropdown>
//         ) : (
//           <InputBox>
//             <input
//               type={currentQuestion.type}
//               value={inputValue}
//               placeholder="Type your answer..."
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//             <SendButton onClick={handleNext}>
//               <FiSend />
//             </SendButton>
//           </InputBox>
//         )}
//       </ChatBox>
//     </ChatContainer>
//   );
// };

// export default ChatBot;

// // Styled Components

// const bubbleAnimation = keyframes`
//   0% {
//     transform: translateY(0) scale(0.5);
//     opacity: 1;
//   }
//   100% {
//     transform: translateY(-100vh) scale(1.2);
//     opacity: 0;
//   }
// `;

// const ChatContainer = styled.div`
//   height: 100vh;
//   overflow: hidden;
//   background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   font-family: "Poppins", sans-serif;
// `;

// const AnimatedBackground = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   overflow: hidden;
// `;

// const Bubble = styled.div`
//   position: absolute;
//   bottom: -50px;
//   width: 20px;
//   height: 20px;
//   background: rgba(255, 255, 255, 0.3);
//   border-radius: 50%;
//   animation: ${bubbleAnimation} infinite ease-in-out;
// `;

// const ChatBox = styled.div`
//   z-index: 2;
//   width: 500px;
//   background: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(10px);
//   border-radius: 20px;
//   padding: 20px;
//   color: #fff;
//   box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
//   text-align: center;

//   h2 {
//     color: #fcbf49;
//     margin-bottom: 20px;
//     font-size: 1.8rem;
//   }
// `;

// const ChatBubble = styled.div`
//   background: rgba(255, 255, 255, 0.2);
//   padding: 15px;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   font-weight: bold;
// `;

// const InputBox = styled.div`
//   display: flex;
//   gap: 10px;

//   input {
//     flex: 1;
//     padding: 10px;
//     border: none;
//     border-radius: 5px;
//     outline: none;
//     font-size: 1rem;
//   }
// `;

// const SendButton = styled.button`
//   background-color: #06d6a0;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 10px;
//   cursor: pointer;

//   &:hover {
//     background-color: #05c096;
//   }
// `;

// const Dropdown = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-top: 10px;
//   border-radius: 5px;
//   border: none;
//   font-size: 1rem;
// `;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { auth, db } from "../firebase-config";
import { doc, collection, setDoc, addDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const questions = [
  { id: 1, question: "What is your age?", type: "number" },
  { id: 2, question: "What is your current occupation?", type: "text" },
  { id: 3, question: "What are your career goals?", type: "text" },
  { id: 4, question: "What skills would you like to improve?", type: "text" },
  { id: 5, question: "What motivates you in your career?", type: "text" },
];

const ChatBot = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false); // Flag to indicate completion
  const navigate = useNavigate();

  // Function to map the chatbot responses to the structure expected by `Guideline.js`
  const mapResponsesToUserInput = (responses) => {
    return {
      occupation: responses["What is your current occupation?"] || "",
      careerGoal: responses["What are your career goals?"] || "",
      industry: responses["What skills would you like to improve?"] || "",
    };
  };

  // Fetch user name and create a new session
  useEffect(() => {
    const fetchUserDataAndCreateSession = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          alert("User not authenticated. Please log in.");
          navigate("/login");
          return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().firstName || "there");
        } else {
          console.error("User document does not exist.");
        }

        const sessionsRef = collection(db, "users", user.uid, "sessions");
        const sessionDoc = await addDoc(sessionsRef, {
          startedAt: serverTimestamp(),
        });

        setSessionId(sessionDoc.id);
      } catch (error) {
        console.error("Error fetching user or creating session:", error.message);
        alert("Failed to initialize. Please try again.");
      }
    };

    fetchUserDataAndCreateSession();
  }, [navigate]);

  const handleNext = async () => {
    if (isCompleted) return; // Prevent further actions after completion

    const currentQuestion = questions[currentQuestionIndex];

    if (inputValue.trim() === "") {
      alert("Please provide an answer before proceeding.");
      return;
    }

    setResponses((prev) => ({ ...prev, [currentQuestion.question]: inputValue }));

    if (currentQuestionIndex < questions.length - 1) {
      setInputValue("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true); // Mark as completed
      await saveResponsesToFirebase(); // Save responses and navigate to guideline
    }
  };

  const saveResponsesToFirebase = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      if (!sessionId) {
        alert("Session not initialized. Please try again.");
        return;
      }

      const sessionRef = doc(db, "users", user.uid, "sessions", sessionId);
      const mappedUserInput = mapResponsesToUserInput(responses);

      await setDoc(sessionRef, {
        responses,
        completedAt: serverTimestamp(),
        mappedUserInput,
      });

      navigate("/dashboard", { state: { userInput: mappedUserInput } });
    } catch (error) {
      console.error("Error saving responses:", error.message);
      alert(`Failed to save responses: ${error.message}`);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ChatContainer>
      <BackgroundShapes>
        <div className="floating-shape shape-blue"></div>
        <div className="floating-shape shape-orange"></div>
      </BackgroundShapes>

      <ChatBox>
        <ChatHeader>Smart ChatBot</ChatHeader>
        <ChatContent>
          {userName && currentQuestionIndex === 0 && (
            <ChatBubble>
              <p>Hi {userName}, how are you today? Let's answer a few questions to get started!</p>
            </ChatBubble>
          )}
          {Object.keys(responses).map((key, index) => (
            <ChatBubble key={index}>
              <p>{key}</p>
              <Response>{responses[key]}</Response>
            </ChatBubble>
          ))}
          {!isCompleted && currentQuestion && (
            <ChatBubble>
              <p>{currentQuestion.question}</p>
            </ChatBubble>
          )}
          {isCompleted && (
            <ChatBubble>
              <p>Thank you for your responses! Redirecting to your personalized recommendations...</p>
            </ChatBubble>
          )}
        </ChatContent>
        {!isCompleted && (
          <InputBox>
            <input
              type={currentQuestion?.type || "text"}
              value={inputValue}
              placeholder="Type your answer..."
              onChange={(e) => setInputValue(e.target.value)}
            />
            <SendButton onClick={handleNext}>
              <FiSend />
            </SendButton>
          </InputBox>
        )}
      </ChatBox>
    </ChatContainer>
  );
};

export default ChatBot;

// Styled Components
const ChatContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  position: relative;
`;

const BackgroundShapes = styled.div`
  .floating-shape {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.7;
    z-index: -1;
  }

  .shape-blue {
    background: linear-gradient(to bottom right, #00d4ff, #0066ff);
    top: 10%;
    left: 10%;
  }

  .shape-orange {
    background: linear-gradient(to bottom right, #ff7b00, #ff4e00);
    bottom: 10%;
    right: 10%;
  }
`;

const ChatBox = styled.div`
  z-index: 2;
  width: 600px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
`;

const ChatHeader = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ffffff;
`;

const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatBubble = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
`;

const Response = styled.div`
  margin-top: 5px;
  color: #00d4ff;
`;

const InputBox = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const SendButton = styled.button`
  background-color: #00d4ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #008fcc;
  }
`;
