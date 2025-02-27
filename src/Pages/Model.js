// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // // // import { auth, db } from '../firebase-config';
// // // // // // import { doc, getDoc, collection, query, where } from 'firebase/firestore';
// // // // // // import './model.css';

// // // // // // const Model = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const location = useLocation();
// // // // // //   const [data, setData] = useState([]);
// // // // // //   const [bestRecommendation, setBestRecommendation] = useState(null);
// // // // // //   const [userInput, setUserInput] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       try {
// // // // // //         const careerDataRef = collection(db, 'careerData');
// // // // // //         const q = query(careerDataRef, where("isActive", "==", true)); // Assuming there's an 'isActive' flag
// // // // // //         const careerSnapshot = await getDocs(q);
// // // // // //         const careers = careerSnapshot.docs.map(doc => doc.data());
// // // // // //         setData(careers);

// // // // // //         if (location.state && location.state.userInput) {
// // // // // //           setUserInput(location.state.userInput);
// // // // // //           calculateAndSetRecommendation(location.state.userInput, careers);
// // // // // //         } else {
// // // // // //           // Handle error or redirect
// // // // // //           console.error("No user input provided for recommendation.");
// // // // // //           navigate("/"); // Redirect to home or another appropriate route
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error("Error fetching data:", error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, [navigate, location.state]);

// // // // // //   // Function to calculate and set the best recommendation
// // // // // //   const calculateAndSetRecommendation = (input, careers) => {
// // // // // //     const scores = calculateSimilarity(input.careerGoal, careers);
// // // // // //     const bestMatch = scores.reduce((a, b) => a.score > b.score ? a : b);
// // // // // //     setBestRecommendation(bestMatch);
// // // // // //   };

// // // // // //   // Placeholder for actual similarity calculation
// // // // // //   const calculateSimilarity = (inputCareerGoal, careerData) => {
// // // // // //     return careerData.map(item => ({
// // // // // //       item: item,
// // // // // //       score: Math.random() // This is a placeholder. Implement actual similarity calculation.
// // // // // //     }));
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="model-container">
// // // // // //       <header className="model-header">
// // // // // //         <h1>Discover Your Path</h1>
// // // // // //       </header>
// // // // // //       {bestRecommendation && (
// // // // // //         <div className="recommendation-card">
// // // // // //           <h2>Best Match for Your Career Goal</h2>
// // // // // //           <p>{`Suggestion: ${bestRecommendation.item.careerGoal}`}</p>
// // // // // //           <p>{`Details: ${bestRecommendation.item.description}`}</p>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Model;

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { auth, db, rtdb } from '../firebase-config'; // Assuming 'rtdb' is the Realtime Database reference
// // // import { doc, getDoc, ref as dbRef, get as getFromRTDB } from 'firebase/firestore';
// // // import { getDatabase, ref, get } from 'firebase/database';
// // // import './Model.css';

// // // const Model = () => {
// // //   const navigate = useNavigate();
// // //   const [careerData, setCareerData] = useState([]);
// // //   const [userInput, setUserInput] = useState({});
// // //   const [bestRecommendation, setBestRecommendation] = useState(null);

// // //   // Fetch user's last interaction from Firestore
// // //   useEffect(() => {
// // //     const fetchUserData = async () => {
// // //       const user = auth.currentUser;
// // //       if (!user) {
// // //         console.error("No user authenticated.");
// // //         navigate("/login");
// // //         return;
// // //       }

// // //       const userDocRef = doc(db, "users", user.uid);
// // //       const docSnap = await getDoc(userDocRef);
// // //       if (docSnap.exists()) {
// // //         const data = docSnap.data();
// // //         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
// // //         setUserInput(lastInteraction.responses);
// // //       } else {
// // //         console.error("User document does not exist.");
// // //         navigate("/login");
// // //       }
// // //     };

// // //     fetchUserData();
// // //   }, [navigate]);

// // //   // Fetch career data from Realtime Database
// // //   useEffect(() => {
// // //     const fetchCareerData = async () => {
// // //       const careerRef = ref(rtdb, 'careerData');
// // //       const snapshot = await get(careerRef);
// // //       if (snapshot.exists()) {
// // //         setCareerData(Object.values(snapshot.val()));
// // //       } else {
// // //         console.log('No career data available.');
// // //       }
// // //     };

// // //     fetchCareerData();
// // //   }, []);

// // //   // Function to calculate and set the best recommendation
// // //   useEffect(() => {
// // //     if (userInput && careerData.length) {
// // //       const bestMatch = calculateBestMatch(userInput, careerData);
// // //       setBestRecommendation(bestMatch);
// // //     }
// // //   }, [userInput, careerData]);

// // //   const calculateBestMatch = (inputs, careers) => {
// // //     // Placeholder for similarity calculation
// // //     // Implement your logic to calculate the best match based on 'inputs' and 'careers'
// // //     return careers.reduce((prev, current) => {
// // //       return (prev.score || 0) > current.score ? prev : current; // Just a placeholder comparison
// // //     });
// // //   };

// // //   return (
// // //     <div className="model-container">
// // //       <header className="model-header">
// // //         <h1>Your Personalized Career Path Recommendation</h1>
// // //       </header>
// // //       {bestRecommendation && (
// // //         <div className="recommendation-card">
// // //           <h2>Best Match for Your Career Goals</h2>
// // //           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
// // //           <p>{`Skills to Improve: ${bestRecommendation.Skills}`}</p>
// // //           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Model;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { auth, db, rtdb } from '../firebase-config';
// // // // import { doc, getDoc } from 'firebase/firestore';
// // // // import { ref, get } from 'firebase/database';
// // // // import './Model.css';
// // // // import natural from 'natural';  // Assuming you found a way to include this in your client-side environment

// // // // const Model = () => {
// // // //   const navigate = useNavigate();
// // // //   const [careerData, setCareerData] = useState([]);
// // // //   const [userInput, setUserInput] = useState({});
// // // //   const [bestRecommendation, setBestRecommendation] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       const user = auth.currentUser;
// // // //       if (!user) {
// // // //         console.error("No user authenticated.");
// // // //         navigate("/login");
// // // //         return;
// // // //       }
// // // //       const userDocRef = doc(db, "users", user.uid);
// // // //       const docSnap = await getDoc(userDocRef);
// // // //       if (docSnap.exists()) {
// // // //         const data = docSnap.data();
// // // //         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
// // // //         setUserInput(lastInteraction.responses);
// // // //       } else {
// // // //         console.error("User document does not exist.");
// // // //         navigate("/login");
// // // //       }
// // // //     };

// // // //     fetchUserData();
// // // //   }, [navigate]);

// // // //   useEffect(() => {
// // // //     const fetchCareerData = async () => {
// // // //       const careerRef = ref(rtdb, 'careerata');
// // // //       const snapshot = await get(careerRef);
// // // //       if (snapshot.exists()) {
// // // //         const data = Object.values(snapshot.val());
// // // //         setCareerData(data);
// // // //         calculateTFIDF(userInput, data);
// // // //       } else {
// // // //         console.log('No career data available.');
// // // //       }
// // // //     };

// // // //     fetchCareerData();
// // // //   }, [userInput]);

// // // //   const calculateTFIDF = (input, careers) => {
// // // //     const tfidf = new natural.TfIdf();
// // // //     tfidf.addDocument(prepareDocument(input.careerGoals, input.skills));

// // // //     careers.forEach((career, index) => {
// // // //       tfidf.addDocument(prepareDocument(career.CareerGoal, career.Skills),   index);
// // // //     });

// // // //     let maxScore = -Infinity;
// // // //     let bestIndex = -1;

// // // //     tfidf.tfidfs(prepareDocument(input.careerGoals, input.skills), (i, measure) => {
// // // //       if (i !== 0 && measure > maxScore) {
// // // //         maxScore = measure;
// // // //         bestIndex = i - 1;
// // // //       }
// // // //     });

// // // //     if (bestIndex !== -1) {
// // // //       setBestRecommendation(careers[bestIndex]);
// // // //     }
// // // //   };

// // // //   const prepareDocument = (careerGoals, skills) => `${careerGoals} ${skills}`;

// // // //   return (
// // // //     <div className="model-container">
// // // //       <header className="model-header">
// // // //         <h1>Your Personalized Career Path Recommendation</h1>
// // // //       </header>
// // // //       {bestRecommendation && (
// // // //         <div className="recommendation-card">
// // // //           <h2>Best Match for Your Career Goals</h2>
// // // //           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
// // // //           <p>{`Skills to Improve: ${bestRecommendation.Skills}`}</p>
// // // //           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Model;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { auth, db, rtdb } from '../firebase-config'; // Assuming 'rtdb' is the Realtime Database reference
// // import { doc, getDoc } from 'firebase/firestore';
// // import { ref, get } from 'firebase/database';
// // import './Model.css';

// // const Model = () => {
// //   const navigate = useNavigate();
// //   const [careerData, setCareerData] = useState([]);
// //   const [userInput, setUserInput] = useState({});
// //   const [bestRecommendation, setBestRecommendation] = useState(null);

// //   // Fetch user's last interaction from Firestore
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       const user = auth.currentUser;
// //       if (!user) {
// //         console.error("No user authenticated.");
// //         navigate("/login");
// //         return;
// //       }

// //       const userDocRef = doc(db, "users", user.uid);
// //       const docSnap = await getDoc(userDocRef);
// //       if (docSnap.exists()) {
// //         const data = docSnap.data();
// //         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
// //         setUserInput(lastInteraction.responses);
// //       } else {
// //         console.error("User document does not exist.");
// //         navigate("/login");
// //       }
// //     };

// //     fetchUserData();
// //   }, [navigate]);

// //   // Fetch career data from Realtime Database
// //   useEffect(() => {
// //     const fetchCareerData = async () => {
// //       const careerRef = ref(rtdb, 'careerData');
// //       const snapshot = await get(careerRef);
// //       if (snapshot.exists()) {
// //         setCareerData(Object.values(snapshot.val()));
// //       } else {
// //         console.log('No career data available.');
// //       }
// //     };

// //     fetchCareerData();
// //   }, []);

// //   // Function to calculate and set the best recommendation
// //   useEffect(() => {
// //     if (userInput && careerData.length) {
// //       const bestMatch = calculateBestMatch(userInput, careerData);
// //       setBestRecommendation(bestMatch);
// //     }
// //   }, [userInput, careerData]);

// //   const calculateBestMatch = (inputs, careers) => {
// //     // Score each career option based on matches to user inputs
// //     return careers.reduce((best, career) => {
// //       let score = 0;
// //       if (inputs['What are your career goals?'] === career.CareerGoal) score += 2;
// //       if (career.Skills && career.Skills.includes(inputs['What skills would you like to improve?'])) score += 1;

// //       return score > (best.score || 0) ? { ...career, score } : best;
// //     }, { score: 0 });
// //   };

// //   return (
// //     <div className="model-container">
// //       <header className="model-header">
// //         <h1>Your Personalized Career Path Recommendation</h1>
// //       </header>
// //       {bestRecommendation && bestRecommendation.score > 2 && (
// //         <div className="recommendation-card">
// //           <h2>Best Match for Your Career Goals</h2>
// //           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
// //           <p>{`Skills: ${bestRecommendation.Skills}`}</p>
// //           <p>{`Expected Salary: ${bestRecommendation.ExpectedSalary}`}</p>
// //           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
// //           <ul>
// //             {bestRecommendation.CertificationLinks && bestRecommendation.CertificationLinks.map(link => <li key={link}>{link}</li>)}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Model;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db, rtdb } from '../firebase-config';
// import { doc, getDoc } from 'firebase/firestore';
// import { ref as databaseRef, get as getFromRTDB } from 'firebase/database';
// import './Model.css';

// const Model = () => {
//   const navigate = useNavigate();
//   const [careerData, setCareerData] = useState([]);
//   const [userInput, setUserInput] = useState(null);
//   const [bestRecommendation, setBestRecommendation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [debugInfo, setDebugInfo] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!auth.currentUser) {
//         setError("No user authenticated. Please login.");
//         navigate("/login");
//         return;
//       }

//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       try {
//         const docSnap = await getDoc(userDocRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
//             const responses = data.chatbotInteractions[data.chatbotInteractions.length - 1].responses;
//             setUserInput(responses);
//             setDebugInfo(`User responses loaded: ${JSON.stringify(responses)}`);
//           } else {
//             setError("No interactions found for the user.");
//           }
//         } else {
//           setError("User document does not exist.");
//           navigate("/login");
//         }
//       } catch (error) {
//         setError(`Error fetching user data: ${error.message}`);
//       }
//     };

//     const fetchCareerData = async () => {
//       const careerRef = databaseRef(rtdb, 'career_data');
//       const snapshot = await getFromRTDB(careerRef);
//       if (snapshot.exists()) {
//         const data = Object.values(snapshot.val());
//         setCareerData(data);
//         setDebugInfo(`Career data loaded: ${JSON.stringify(data)}`);
//       } else {
//         setError('No career data available.');
//       }
//       setLoading(false);
//     };

//     fetchUserData();
//     fetchCareerData();
//   }, [navigate]);

//   useEffect(() => {
//     if (!userInput || !careerData.length) {
//       setDebugInfo('User input or career data is not loaded correctly.');
//       return;
//     }

//     const bestMatch = calculateBestMatch(userInput, careerData);
//     setBestRecommendation(bestMatch);
//     if (!bestMatch) {
//       setDebugInfo('No valid match found. Check data compatibility.');
//     } else {
//       setDebugInfo(`Match found: ${JSON.stringify(bestMatch)}`);
//     }
//   }, [userInput, careerData]);

//   const calculateBestMatch = (inputs, careers) => {
//     let debugMatches = [];  // To store information about each match attempt
  
//     if (!inputs || careers.length === 0) {
//       return null;  // Return null early if inputs or careers are not properly loaded
//     }
  
//     const result = careers.reduce((best, career) => {
//       let score = 0;
  
//       // Ensure career goal exists and is a string before attempting to access its methods
//       if (career.CareerGoal && typeof career.CareerGoal === 'string' &&
//           inputs['What are your career goals?'] && typeof inputs['What are your career goals?'] === 'string') {
//         const careerGoalKeywords = career.CareerGoal.toLowerCase().split(/\s+/);
//         const inputCareerGoalKeywords = inputs['What are your career goals?'].toLowerCase().split(/\s+/);
  
//         // Calculate score based on keyword match
//         inputCareerGoalKeywords.forEach(keyword => {
//           if (careerGoalKeywords.includes(keyword)) {
//             score += 2;
//           }
//         });
//       }
  
//       // Ensure both career skills and input skills exist and are arrays before processing
//       if (Array.isArray(career.Skills) && Array.isArray(inputs['What skills would you like to improve?'])) {
//         const inputSkills = inputs['What skills would you like to improve?'].map(skill => skill.toLowerCase());
//         const careerSkills = career.Skills.map(skill => skill.toLowerCase());
//         inputSkills.forEach(skill => {
//           if (careerSkills.includes(skill)) {
//             score += 1;
//           }
//         });
//       }
  
//       debugMatches.push({ career: career.CareerGoal, score });  // Store debug information for each career
  
//       // Return the career with the highest score
//       return score > (best.score || 0) ? { ...career, score } : best;
//     }, { score: 0 });
  
//     setDebugInfo(`Match attempts: ${JSON.stringify(debugMatches)}`);  // Output all match attempts
//     return result;
//   };
  

//   return (                             
//     <div className="model-container">
//       <header className="model-header">
//         <h1>Your Personalized Career Path Recommendation</h1>
//       </header>
//       {loading ? (
//         <p>Loading data...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : bestRecommendation ? (
//         <div className="recommendation-card">
//           <h2>Best Match for Your Career Goals</h2>
//           <p>Career Goal: {bestRecommendation.CareerGoal || 'Not available'}</p>
//           <p>Skills: {bestRecommendation.Skills?.join(', ') || 'Not available'}</p>
//           <p>Expected Salary: {bestRecommendation.ExpectedSalary || 'Not available'}</p>
//           <p>Topics to Learn: {bestRecommendation.TopicsToLearn?.join(', ') || 'Not available'}</p>
//         </div>
//       ) : (
//         <p>No recommendations available based on your inputs.</p>
//       )}
//       <div className="debug-info">
//         <h3>Debug Information</h3>
//         {debugInfo && <p>{debugInfo}</p>}
//       </div>
//     </div>
//   );
// };

// export default Model;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, rtdb } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { ref as databaseRef, get as getFromRTDB } from 'firebase/database';
import './Model.css';

const Model = () => {
  const navigate = useNavigate();
  const [careerData, setCareerData] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [bestRecommendation, setBestRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        setError("No user authenticated.");
        navigate("/login");
        return;
      }

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
            const responses = data.chatbotInteractions[data.chatbotInteractions.length - 1].responses;
            setUserInput(responses);
            setDebugInfo(`User responses loaded: ${JSON.stringify(responses)}`);
          } else {
            setError("No interactions found for the user.");
          }
        } else {
          setError("User document does not exist.");
          navigate("/login");
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchCareerData = async () => {
      const careerRef = databaseRef(rtdb, 'career_data');
      try {
        const snapshot = await getFromRTDB(careerRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          setCareerData(data);
          setDebugInfo(`Career data loaded: ${JSON.stringify(data)}`);
        } else {
          setError('No career data available.');
        }
      } catch (error) {
        setError(`Error fetching career data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchCareerData();
  }, [navigate]);

  useEffect(() => {
    if (!userInput || !careerData.length) {
      setDebugInfo('User input or career data is not loaded correctly.');
      return;
    }

    const bestMatch = calculateBestMatch(userInput, careerData);
    setBestRecommendation(bestMatch);
    if (!bestMatch) {
      setDebugInfo('No valid match found. Check data compatibility.');
    } else {
      setDebugInfo(`Match found: ${JSON.stringify(bestMatch)}`);
    }
  }, [userInput, careerData]);

  const calculateBestMatch = (inputs, careers) => {
    let bestScore = 0;
    let bestMatch = null;

    careers.forEach(career => {
      let score = 0;
      if (inputs['What are your career goals?'] && career.CareerGoal.toLowerCase().includes(inputs['What are your career goals?'].toLowerCase())) {
        score += 10; // Boost score for direct goal match
      }
      if (inputs['What skills would you like to improve?'] && career.Skills.includes(inputs['What skills would you like to improve?'])) {
        score += 5; // Boost score for skill match
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = career;
      }
    });

    return bestMatch;
  };

  return (
    <div className="model-container">
      <header className="model-header">
        <h1>Your Personalized Career Path Recommendation</h1>
      </header>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : bestRecommendation ? (
        <div className="recommendation-card">
          <h2>Best Match for Your Career Goals</h2>
          <p>Career Goal: {bestRecommendation.CareerGoal || 'Not available'}</p>
          <p>Skills: {bestRecommendation.Skills?.join(', ') || 'Not available'}</p>
          <p>Expected Salary: {bestRecommendation.ExpectedSalary || 'Not available'}</p>
          <p>Topics to Learn: {bestRecommendation.TopicsToLearn?.join(', ') || 'Not available'}</p>
        </div>
      ) : (
        <p>No recommendations available based on your inputs.</p>
      )}
      <div className="debug-info">
        <h3>Debug Information</h3>
        <p>{debugInfo}</p>
      </div>
    </div>
  );
};

export default Model;
