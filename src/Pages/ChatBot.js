import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FiSend } from "react-icons/fi";
import { auth, db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.png"; // Path to your logo

/*
  FIELDS ARRAY:
  Each object defines:
    - label: the question shown to the user
    - name: key in the responses object
    - type: 'text' | 'date' | 'dropdown' | 'checkbox' | 'radio' | 'number' | 'yearPicker' | 'textarea'
    - options: for dropdown, checkbox, or radio
    - placeholder: placeholder text for inputs
    - validate: function(value) => returns an error message if invalid, else an empty string
*/
const fields = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Enter your full name",
    validate: (value) => (!value ? "Full Name is required" : ""),
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    placeholder: "Select your date of birth",
    validate: (value) => (!value ? "Date of Birth is required" : ""),
  },
  {
    label: "Educational Background",
    name: "education",
    type: "dropdown",
    placeholder: "Select your highest degree",
    options: ["High School", "Associate", "Bachelor's", "Master's", "PhD"],
    validate: (value) => (!value ? "Please select an education level" : ""),
  },
  {
    label: "Year of Graduation",
    name: "graduationYear",
    type: "yearPicker",
    placeholder: "Select your graduation year",
    validate: (value) => {
      if (!value) return "Graduation Year is required";
      const year = parseInt(value, 10);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 10) {
        return "Please enter a valid graduation year";
      }
      return "";
    },
  },
  {
    label: "Occupation",
    name: "occupation",
    type: "text",
    placeholder: "Enter your current job title",
    validate: (value) => (!value ? "Occupation is required" : ""),
  },
  {
    label: "Salary",
    name: "salary",
    type: "number",
    placeholder: "Enter your salary (e.g., 50000)",
    validate: (value) => {
      if (!value) return "Salary is required";
      const numeric = Number(value);
      return numeric < 0 ? "Salary cannot be negative" : "";
    },
  },
  {
    label: "Industry (Select one or more)",
    name: "industry",
    type: "checkbox",
    options: ["IT", "Healthcare", "Finance", "Marketing", "Engineering", "Education"],
    validate: (value) =>
      value.length === 0 ? "Please select at least one industry" : "",
  },
  {
    label: "Job Scope (Select one or more)",
    name: "jobScope",
    type: "checkbox",
    options: ["Management", "Engineering", "Design", "Research", "Sales"],
    validate: (value) =>
      value.length === 0 ? "Please select at least one job scope" : "",
  },
  {
    label: "Additional Job Functions (Select any)",
    name: "additionalJobFunctions",
    type: "checkbox",
    options: ["Programming", "Database", "Customer Support", "Analysis"],
    validate: () => "",
  },
  {
    label: "Career Goal",
    name: "careerGoal",
    type: "text",
    placeholder: "Briefly describe your career goal",
    validate: (value) => (!value ? "Please enter a career goal" : ""),
  },
  {
    label: "Age",
    name: "age",
    type: "number",
    placeholder: "Enter your age",
    validate: (value) => {
      if (!value) return "Age is required";
      const numeric = Number(value);
      if (numeric < 1 || numeric > 120) {
        return "Please enter a valid age";
      }
      return "";
    },
  },
  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
    validate: (value) => (!value ? "Please select a gender" : ""),
  },
  {
    label: "Current Geographic Location",
    name: "location",
    type: "text",
    placeholder: "Where are you located?",
    validate: (value) => (!value ? "Location is required" : ""),
  },
  {
    label: "What skills would you like to learn and what areas do you wish to improve in?",
    name: "skillsAndImprovements",
    type: "textarea",
    placeholder: "For example: I want to learn advanced JavaScript and improve my public speaking skills.",
    validate: (value) => (!value ? "This field is required" : ""),
  },
];

const ChatBot = () => {
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]); // Each message: { sender: 'bot'|'user', text: string }
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 1. Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
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
      } catch (error) {
        console.error("Error fetching user:", error.message);
        alert("Failed to initialize. Please try again.");
      }
    };
    fetchUserData();
  }, [navigate]);

  // 2. Greet the user and ask the FIRST question (if no messages yet)
  useEffect(() => {
    if (userName && messages.length === 0) {
      const greetingMsg = {
        sender: "bot",
        text: `Hi ${userName}, let's gather some information to personalize your experience!`,
      };
      const firstField = fields[0];
      const firstQuestion = {
        sender: "bot",
        text: firstField.label,
      };
      setInputValue(
        firstField.type === "checkbox"
          ? responses[firstField.name] || []
          : responses[firstField.name] || ""
      );
      setMessages([greetingMsg, firstQuestion]);
    }
  }, [userName, messages, responses]);

  const currentField = fields[currentFieldIndex];

  // 3. Handle next question or finish
  const handleNext = async () => {
    if (!currentField) return;

    let valueToValidate = inputValue;
    if (currentField.type === "checkbox") {
      valueToValidate = responses[currentField.name] || [];
    }
    const validationError = currentField.validate(valueToValidate);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage("");

    let userResponseText =
      currentField.type === "checkbox"
        ? (responses[currentField.name] || []).join(", ")
        : inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userResponseText }]);

    setResponses((prev) => ({
      ...prev,
      [currentField.name]:
        currentField.type === "checkbox"
          ? responses[currentField.name] || []
          : inputValue,
    }));

    if (currentFieldIndex < fields.length - 1) {
      const nextIndex = currentFieldIndex + 1;
      setCurrentFieldIndex(nextIndex);
      const nextField = fields[nextIndex];
      const preloadValue =
        nextField.type === "checkbox"
          ? responses[nextField.name] || []
          : responses[nextField.name] || "";
      setInputValue(preloadValue);
      setMessages((prev) => [...prev, { sender: "bot", text: nextField.label }]);
    } else {
      setIsCompleted(true);
      const finalResponses = {
        ...responses,
        [currentField.name]:
          currentField.type === "checkbox"
            ? responses[currentField.name] || []
            : inputValue,
      };
      await saveResponsesToFirebase(finalResponses);
    }
  };

  // 4. Save responses to Firestore
  const saveResponsesToFirebase = async (finalResponses) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }
      const userDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDocRef);
      if (!docSnapshot.exists()) {
        console.error("User document does not exist.");
        alert("User data not found. Please try again.");
        return;
      }
      const userData = docSnapshot.data();
      const existingInteractions = userData.chatbotInteractions || [];
      const newInteraction = {
        responses: finalResponses,
        completedAt: new Date(),
      };
      await updateDoc(userDocRef, {
        chatbotInteractions: [...existingInteractions, newInteraction],
      });
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thanks! Redirecting you to your dashboard...",
        },
      ]);
      setTimeout(() => {
        navigate("/model");
      }, 1500);
    } catch (error) {
      console.error("Error saving responses:", error.message);
      alert(`Failed to save responses: ${error.message}`);
    }
  };

  // 5. Handle checkbox changes
  const handleCheckboxChange = (option) => {
    const fieldName = currentField.name;
    const prevSelected = responses[fieldName] || [];
    let updated;
    if (prevSelected.includes(option)) {
      updated = prevSelected.filter((item) => item !== option);
    } else {
      updated = [...prevSelected, option];
    }
    setResponses((prev) => ({ ...prev, [fieldName]: updated }));
    setInputValue(updated);
  };

  // 6. Handle radio changes
  const handleRadioChange = (option) => {
    setInputValue(option);
  };

  // 7. Render a year picker (1900 to currentYear+5)
  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear + 5; y >= 1900; y--) {
      years.push(y);
    }
    return (
      <input
        list="yearsList"
        value={typeof inputValue === "string" ? inputValue : ""}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Select your graduation year"
      />
    );
  };

  // 8. Render the appropriate input control
  const renderInput = () => {
    if (!currentField) return null;
    switch (currentField.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={currentField.placeholder}
            value={typeof inputValue === "string" ? inputValue : ""}
            onChange={(e) => setInputValue(e.target.value)}
          />
        );
      case "date":
        return (
          <input
            type="date"
            placeholder={currentField.placeholder}
            value={typeof inputValue === "string" ? inputValue : ""}
            onChange={(e) => setInputValue(e.target.value)}
          />
        );
      case "dropdown":
        return (
          <select
            value={typeof inputValue === "string" ? inputValue : ""}
            onChange={(e) => setInputValue(e.target.value)}
          >
            <option value="">-- {currentField.placeholder} --</option>
            {currentField.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        const selectedValues = Array.isArray(inputValue) ? inputValue : [];
        return (
          <CheckboxGroup>
            {currentField.options.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            ))}
          </CheckboxGroup>
        );
      case "radio":
        return (
          <RadioGroup>
            {currentField.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  checked={inputValue === option}
                  onChange={() => handleRadioChange(option)}
                />
                {option}
              </label>
            ))}
          </RadioGroup>
        );
      case "number":
        return (
          <input
            type="number"
            placeholder={currentField.placeholder}
            value={typeof inputValue === "string" ? inputValue : ""}
            onChange={(e) => setInputValue(e.target.value)}
          />
        );
      case "yearPicker":
        return (
          <>
            {renderYearPicker()}
            <datalist id="yearsList">
              {(() => {
                const yearOptions = [];
                const currentYear = new Date().getFullYear();
                for (let y = currentYear + 5; y >= 1900; y--) {
                  yearOptions.push(y);
                }
                return yearOptions.map((year) => (
                  <option key={year} value={year} />
                ));
              })()}
            </datalist>
          </>
        );
      case "textarea":
        return (
          <textarea
            placeholder={currentField.placeholder}
            value={typeof inputValue === "string" ? inputValue : ""}
            onChange={(e) => setInputValue(e.target.value)}
          />
        );
      default:
        return (
          <input
            type="text"
            placeholder={currentField.placeholder}
            value={typeof inputValue === "string" ? inputValue : ""}
            onChange={(e) => setInputValue(e.target.value)}
          />
        );
    }
  };

  return (
    <PageContainer>
      {/* TOP NAVIGATION BAR */}
      <header style={navStyles.navbar}>
        <div style={navStyles.navLeft}>
          <img src={Logo} alt="Project S Logo" style={navStyles.logo} />
          <ul style={navStyles.navLinks}>
            <li>
              <Link to="/dashboard" style={navStyles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Model" style={navStyles.navLink}>
                Model
              </Link>
            </li>
            <li>
              <Link to="/topics" style={navStyles.navLink}>
                Topics
              </Link>
            </li>
            <li>
              <Link to="/certifications" style={navStyles.navLink}>
                Certifications
              </Link>
            </li>
            <li>
              <Link to="/skills" style={navStyles.navLink}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="/bookmarkspage" style={navStyles.navLink}>
                Saved
              </Link>
            </li>
          </ul>
        </div>
        <div style={navStyles.navRight}>
          <Link to="/profile" style={navStyles.navLinkRight}>
            Profile
          </Link>
          <button
            onClick={() => {
              auth.signOut();
              navigate("/login");
            }}
            style={navStyles.signOutButton}
          >
            Sign Out
          </button>
        </div>
      </header>

      <ChatContainer>
        <HeaderBar>Project S Career Assistant</HeaderBar>
        <MessagesContainer>
          {messages.map((msg, idx) =>
            msg.sender === "bot" ? (
              <BotBubble key={idx}>{msg.text}</BotBubble>
            ) : (
              <UserBubble key={idx}>{msg.text}</UserBubble>
            )
          )}
          {isCompleted && (
            <BotBubble>
              Thank you for providing all the information! Redirecting to your dashboard...
            </BotBubble>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        {!isCompleted && currentField && (
          <InputArea>
            <InputWrapper>
              {renderInput()}
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </InputWrapper>
            <SendButton onClick={handleNext}>
              <FiSend />
            </SendButton>
          </InputArea>
        )}
      </ChatContainer>
    </PageContainer>
  );
};

export default ChatBot;

/* ---------------------------
   Navigation Bar Styles
--------------------------- */
const navStyles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    width: "100%",
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
};

/* ---------------------------
   Chatbot Layout
--------------------------- */
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #fff; /* Entire page white */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ChatContainer = styled.div`
  width: 100%;
  flex: 1; /* Fill remaining vertical space */
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const HeaderBar = styled.div`
  width: 100%;
  text-align: left;
  padding: 1rem;
  background-color: #f1f3f4; /* Light gray top bar */
  color: #202124;
  font-size: 1.2rem;
  font-weight: 600;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  } 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: ${fadeIn} 0.5s ease-out;
  scrollbar-width: thin;
  scrollbar-color: #4285f4 transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4285f4;
    border-radius: 3px;
  }
`;

const Bubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  line-height: 1.4;
  font-size: 0.95rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const BotBubble = styled(Bubble)`
  align-self: flex-start;
  background-color: #f1f3f4;
  color: #202124;
  border-top-left-radius: 0;
`;

const UserBubble = styled(Bubble)`
  align-self: flex-end;
  background-color: #4285f4;
  color: #fff;
  border-top-right-radius: 0;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  padding: 0.75rem;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  select,
  input[type="text"],
  input[type="date"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #202124;
    font-size: 0.95rem;
    outline: none;
    margin-bottom: 4px;
    resize: vertical;
  }
`;

const ErrorText = styled.span`
  color: #ff4e4e;
  font-size: 0.85rem;
`;

const SendButton = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.65rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  &:hover {
    background-color: #3076d2;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #202124;
    cursor: pointer;
  }
  input[type="checkbox"] {
    accent-color: #4285f4;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
  label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #202124;
    cursor: pointer;
  }
  input[type="radio"] {
    accent-color: #4285f4;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;
