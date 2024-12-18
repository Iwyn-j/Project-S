import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiSend } from "react-icons/fi";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Questions Array
const questions = [
  { id: 1, question: "What is your full name?", type: "text" },
  { id: 2, question: "What is your age?", type: "number" },
  { id: 3, question: "What is your educational background?", type: "dropdown", options: ["High School", "Diploma", "Degree", "Master's", "PhD"] },
  { id: 4, question: "What is your current occupation?", type: "text" },
  { id: 5, question: "What are your career goals?", type: "text" },
];

const ChatBot = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(""); // Reset input value when a new question appears
  }, [currentQuestionIndex]);

  const handleNext = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (inputValue.trim() === "") return; // Prevent empty submission

    // Save the current answer
    setResponses((prev) => ({ ...prev, [currentQuestion.question]: inputValue }));

    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setInputValue("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Final step: Save all answers to Firestore
      await saveToFirebase();
    }
  };

  const saveToFirebase = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("User not authenticated. Please log in first.");
        navigate("/login");
        return;
      }

      // Save responses under the user's UID in Firestore
      const userDocRef = doc(db, "responses", user.uid);

      await setDoc(userDocRef, {
        answers: responses,
        submittedAt: new Date(),
      });

      alert("Responses saved successfully!");
      console.log("Saved Responses:", responses);
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error saving responses:", error);
      alert("Failed to save responses. Please try again.");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ChatContainer>
      {/* Background Animation */}
      <AnimatedBackground>
        {[...Array(20)].map((_, i) => (
          <Bubble key={i} style={{ left: `${Math.random() * 100}%`, animationDuration: `${3 + Math.random() * 3}s` }} />
        ))}
      </AnimatedBackground>

      {/* Chatbox */}
      <ChatBox>
        <h2>🤖 Smart ChatBot</h2>
        <ChatBubble>
          <p>{currentQuestion.question}</p>
        </ChatBubble>

        {currentQuestion.type === "dropdown" ? (
          <Dropdown
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleNext} // Auto-submit dropdown
          >
            <option value="">Select an option</option>
            {currentQuestion.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </Dropdown>
        ) : (
          <InputBox>
            <input
              type={currentQuestion.type}
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

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1.2);
    opacity: 0;
  }
`;

const ChatContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: "Poppins", sans-serif;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Bubble = styled.div`
  position: absolute;
  bottom: -50px;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ${bubbleAnimation} infinite ease-in-out;
`;

const ChatBox = styled.div`
  z-index: 2;
  width: 500px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  color: #fff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;

  h2 {
    color: #fcbf49;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }
`;

const ChatBubble = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const InputBox = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
  }
`;

const SendButton = styled.button`
  background-color: #06d6a0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #05c096;
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
`;
