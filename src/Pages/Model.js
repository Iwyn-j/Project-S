// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // // // // // // import { auth, db } from '../firebase-config';
// // // // // // // // // import { doc, getDoc, collection, query, where } from 'firebase/firestore';
// // // // // // // // // import './model.css';

// // // // // // // // // const Model = () => {
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const [data, setData] = useState([]);
// // // // // // // // //   const [bestRecommendation, setBestRecommendation] = useState(null);
// // // // // // // // //   const [userInput, setUserInput] = useState(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const careerDataRef = collection(db, 'careerData');
// // // // // // // // //         const q = query(careerDataRef, where("isActive", "==", true)); // Assuming there's an 'isActive' flag
// // // // // // // // //         const careerSnapshot = await getDocs(q);
// // // // // // // // //         const careers = careerSnapshot.docs.map(doc => doc.data());
// // // // // // // // //         setData(careers);

// // // // // // // // //         if (location.state && location.state.userInput) {
// // // // // // // // //           setUserInput(location.state.userInput);
// // // // // // // // //           calculateAndSetRecommendation(location.state.userInput, careers);
// // // // // // // // //         } else {
// // // // // // // // //           // Handle error or redirect
// // // // // // // // //           console.error("No user input provided for recommendation.");
// // // // // // // // //           navigate("/"); // Redirect to home or another appropriate route
// // // // // // // // //         }
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching data:", error);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchData();
// // // // // // // // //   }, [navigate, location.state]);

// // // // // // // // //   // Function to calculate and set the best recommendation
// // // // // // // // //   const calculateAndSetRecommendation = (input, careers) => {
// // // // // // // // //     const scores = calculateSimilarity(input.careerGoal, careers);
// // // // // // // // //     const bestMatch = scores.reduce((a, b) => a.score > b.score ? a : b);
// // // // // // // // //     setBestRecommendation(bestMatch);
// // // // // // // // //   };

// // // // // // // // //   // Placeholder for actual similarity calculation
// // // // // // // // //   const calculateSimilarity = (inputCareerGoal, careerData) => {
// // // // // // // // //     return careerData.map(item => ({
// // // // // // // // //       item: item,
// // // // // // // // //       score: Math.random() // This is a placeholder. Implement actual similarity calculation.
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="model-container">
// // // // // // // // //       <header className="model-header">
// // // // // // // // //         <h1>Discover Your Path</h1>
// // // // // // // // //       </header>
// // // // // // // // //       {bestRecommendation && (
// // // // // // // // //         <div className="recommendation-card">
// // // // // // // // //           <h2>Best Match for Your Career Goal</h2>
// // // // // // // // //           <p>{`Suggestion: ${bestRecommendation.item.careerGoal}`}</p>
// // // // // // // // //           <p>{`Details: ${bestRecommendation.item.description}`}</p>
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Model;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import { auth, db, rtdb } from '../firebase-config'; // Assuming 'rtdb' is the Realtime Database reference
// // // // // // import { doc, getDoc, ref as dbRef, get as getFromRTDB } from 'firebase/firestore';
// // // // // // import { getDatabase, ref, get } from 'firebase/database';
// // // // // // import './Model.css';

// // // // // // const Model = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [careerData, setCareerData] = useState([]);
// // // // // //   const [userInput, setUserInput] = useState({});
// // // // // //   const [bestRecommendation, setBestRecommendation] = useState(null);

// // // // // //   // Fetch user's last interaction from Firestore
// // // // // //   useEffect(() => {
// // // // // //     const fetchUserData = async () => {
// // // // // //       const user = auth.currentUser;
// // // // // //       if (!user) {
// // // // // //         console.error("No user authenticated.");
// // // // // //         navigate("/login");
// // // // // //         return;
// // // // // //       }

// // // // // //       const userDocRef = doc(db, "users", user.uid);
// // // // // //       const docSnap = await getDoc(userDocRef);
// // // // // //       if (docSnap.exists()) {
// // // // // //         const data = docSnap.data();
// // // // // //         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
// // // // // //         setUserInput(lastInteraction.responses);
// // // // // //       } else {
// // // // // //         console.error("User document does not exist.");
// // // // // //         navigate("/login");
// // // // // //       }
// // // // // //     };

// // // // // //     fetchUserData();
// // // // // //   }, [navigate]);

// // // // // //   // Fetch career data from Realtime Database
// // // // // //   useEffect(() => {
// // // // // //     const fetchCareerData = async () => {
// // // // // //       const careerRef = ref(rtdb, 'careerData');
// // // // // //       const snapshot = await get(careerRef);
// // // // // //       if (snapshot.exists()) {
// // // // // //         setCareerData(Object.values(snapshot.val()));
// // // // // //       } else {
// // // // // //         console.log('No career data available.');
// // // // // //       }
// // // // // //     };

// // // // // //     fetchCareerData();
// // // // // //   }, []);

// // // // // //   // Function to calculate and set the best recommendation
// // // // // //   useEffect(() => {
// // // // // //     if (userInput && careerData.length) {
// // // // // //       const bestMatch = calculateBestMatch(userInput, careerData);
// // // // // //       setBestRecommendation(bestMatch);
// // // // // //     }
// // // // // //   }, [userInput, careerData]);

// // // // // //   const calculateBestMatch = (inputs, careers) => {
// // // // // //     // Placeholder for similarity calculation
// // // // // //     // Implement your logic to calculate the best match based on 'inputs' and 'careers'
// // // // // //     return careers.reduce((prev, current) => {
// // // // // //       return (prev.score || 0) > current.score ? prev : current; // Just a placeholder comparison
// // // // // //     });
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="model-container">
// // // // // //       <header className="model-header">
// // // // // //         <h1>Your Personalized Career Path Recommendation</h1>
// // // // // //       </header>
// // // // // //       {bestRecommendation && (
// // // // // //         <div className="recommendation-card">
// // // // // //           <h2>Best Match for Your Career Goals</h2>
// // // // // //           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
// // // // // //           <p>{`Skills to Improve: ${bestRecommendation.Skills}`}</p>
// // // // // //           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Model;

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // import { auth, db, rtdb } from '../firebase-config';
// // // // // // // import { doc, getDoc } from 'firebase/firestore';
// // // // // // // import { ref, get } from 'firebase/database';
// // // // // // // import './Model.css';
// // // // // // // import natural from 'natural';  // Assuming you found a way to include this in your client-side environment

// // // // // // // const Model = () => {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const [careerData, setCareerData] = useState([]);
// // // // // // //   const [userInput, setUserInput] = useState({});
// // // // // // //   const [bestRecommendation, setBestRecommendation] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchUserData = async () => {
// // // // // // //       const user = auth.currentUser;
// // // // // // //       if (!user) {
// // // // // // //         console.error("No user authenticated.");
// // // // // // //         navigate("/login");
// // // // // // //         return;
// // // // // // //       }
// // // // // // //       const userDocRef = doc(db, "users", user.uid);
// // // // // // //       const docSnap = await getDoc(userDocRef);
// // // // // // //       if (docSnap.exists()) {
// // // // // // //         const data = docSnap.data();
// // // // // // //         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
// // // // // // //         setUserInput(lastInteraction.responses);
// // // // // // //       } else {
// // // // // // //         console.error("User document does not exist.");
// // // // // // //         navigate("/login");
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchUserData();
// // // // // // //   }, [navigate]);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchCareerData = async () => {
// // // // // // //       const careerRef = ref(rtdb, 'careerata');
// // // // // // //       const snapshot = await get(careerRef);
// // // // // // //       if (snapshot.exists()) {
// // // // // // //         const data = Object.values(snapshot.val());
// // // // // // //         setCareerData(data);
// // // // // // //         calculateTFIDF(userInput, data);
// // // // // // //       } else {
// // // // // // //         console.log('No career data available.');
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchCareerData();
// // // // // // //   }, [userInput]);

// // // // // // //   const calculateTFIDF = (input, careers) => {
// // // // // // //     const tfidf = new natural.TfIdf();
// // // // // // //     tfidf.addDocument(prepareDocument(input.careerGoals, input.skills));

// // // // // // //     careers.forEach((career, index) => {
// // // // // // //       tfidf.addDocument(prepareDocument(career.CareerGoal, career.Skills),   index);
// // // // // // //     });

// // // // // // //     let maxScore = -Infinity;
// // // // // // //     let bestIndex = -1;

// // // // // // //     tfidf.tfidfs(prepareDocument(input.careerGoals, input.skills), (i, measure) => {
// // // // // // //       if (i !== 0 && measure > maxScore) {
// // // // // // //         maxScore = measure;
// // // // // // //         bestIndex = i - 1;
// // // // // // //       }
// // // // // // //     });

// // // // // // //     if (bestIndex !== -1) {
// // // // // // //       setBestRecommendation(careers[bestIndex]);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const prepareDocument = (careerGoals, skills) => `${careerGoals} ${skills}`;

// // // // // // //   return (
// // // // // // //     <div className="model-container">
// // // // // // //       <header className="model-header">
// // // // // // //         <h1>Your Personalized Career Path Recommendation</h1>
// // // // // // //       </header>
// // // // // // //       {bestRecommendation && (
// // // // // // //         <div className="recommendation-card">
// // // // // // //           <h2>Best Match for Your Career Goals</h2>
// // // // // // //           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
// // // // // // //           <p>{`Skills to Improve: ${bestRecommendation.Skills}`}</p>
// // // // // // //           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Model;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { auth, db, rtdb } from '../firebase-config'; // Assuming 'rtdb' is the Realtime Database reference
// // // // // import { doc, getDoc } from 'firebase/firestore';
// // // // // import { ref, get } from 'firebase/database';
// // // // // import './Model.css';

// // // // // const Model = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [careerData, setCareerData] = useState([]);
// // // // //   const [userInput, setUserInput] = useState({});
// // // // //   const [bestRecommendation, setBestRecommendation] = useState(null);

// // // // //   // Fetch user's last interaction from Firestore
// // // // //   useEffect(() => {
// // // // //     const fetchUserData = async () => {
// // // // //       const user = auth.currentUser;
// // // // //       if (!user) {
// // // // //         console.error("No user authenticated.");
// // // // //         navigate("/login");
// // // // //         return;
// // // // //       }

// // // // //       const userDocRef = doc(db, "users", user.uid);
// // // // //       const docSnap = await getDoc(userDocRef);
// // // // //       if (docSnap.exists()) {
// // // // //         const data = docSnap.data();
// // // // //         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
// // // // //         setUserInput(lastInteraction.responses);
// // // // //       } else {
// // // // //         console.error("User document does not exist.");
// // // // //         navigate("/login");
// // // // //       }
// // // // //     };

// // // // //     fetchUserData();
// // // // //   }, [navigate]);

// // // // //   // Fetch career data from Realtime Database
// // // // //   useEffect(() => {
// // // // //     const fetchCareerData = async () => {
// // // // //       const careerRef = ref(rtdb, 'careerData');
// // // // //       const snapshot = await get(careerRef);
// // // // //       if (snapshot.exists()) {
// // // // //         setCareerData(Object.values(snapshot.val()));
// // // // //       } else {
// // // // //         console.log('No career data available.');
// // // // //       }
// // // // //     };

// // // // //     fetchCareerData();
// // // // //   }, []);

// // // // //   // Function to calculate and set the best recommendation
// // // // //   useEffect(() => {
// // // // //     if (userInput && careerData.length) {
// // // // //       const bestMatch = calculateBestMatch(userInput, careerData);
// // // // //       setBestRecommendation(bestMatch);
// // // // //     }
// // // // //   }, [userInput, careerData]);

// // // // //   const calculateBestMatch = (inputs, careers) => {
// // // // //     // Score each career option based on matches to user inputs
// // // // //     return careers.reduce((best, career) => {
// // // // //       let score = 0;
// // // // //       if (inputs['What are your career goals?'] === career.CareerGoal) score += 2;
// // // // //       if (career.Skills && career.Skills.includes(inputs['What skills would you like to improve?'])) score += 1;

// // // // //       return score > (best.score || 0) ? { ...career, score } : best;
// // // // //     }, { score: 0 });
// // // // //   };

// // // // //   return (
// // // // //     <div className="model-container">
// // // // //       <header className="model-header">
// // // // //         <h1>Your Personalized Career Path Recommendation</h1>
// // // // //       </header>
// // // // //       {bestRecommendation && bestRecommendation.score > 2 && (
// // // // //         <div className="recommendation-card">
// // // // //           <h2>Best Match for Your Career Goals</h2>
// // // // //           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
// // // // //           <p>{`Skills: ${bestRecommendation.Skills}`}</p>
// // // // //           <p>{`Expected Salary: ${bestRecommendation.ExpectedSalary}`}</p>
// // // // //           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
// // // // //           <ul>
// // // // //             {bestRecommendation.CertificationLinks && bestRecommendation.CertificationLinks.map(link => <li key={link}>{link}</li>)}
// // // // //           </ul>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Model;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { auth, db, rtdb } from '../firebase-config';
// // // // import { doc, getDoc } from 'firebase/firestore';
// // // // import { ref as databaseRef, get as getFromRTDB } from 'firebase/database';
// // // // import './Model.css';

// // // // const Model = () => {
// // // //   const navigate = useNavigate();
// // // //   const [careerData, setCareerData] = useState([]);
// // // //   const [userInput, setUserInput] = useState(null);
// // // //   const [bestRecommendation, setBestRecommendation] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const [debugInfo, setDebugInfo] = useState('');

// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       if (!auth.currentUser) {
// // // //         setError("No user authenticated. Please login.");
// // // //         navigate("/login");
// // // //         return;
// // // //       }

// // // //       const userDocRef = doc(db, "users", auth.currentUser.uid);
// // // //       try {
// // // //         const docSnap = await getDoc(userDocRef);
// // // //         if (docSnap.exists()) {
// // // //           const data = docSnap.data();
// // // //           if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
// // // //             const responses = data.chatbotInteractions[data.chatbotInteractions.length - 1].responses;
// // // //             setUserInput(responses);
// // // //             setDebugInfo(`User responses loaded: ${JSON.stringify(responses)}`);
// // // //           } else {
// // // //             setError("No interactions found for the user.");
// // // //           }
// // // //         } else {
// // // //           setError("User document does not exist.");
// // // //           navigate("/login");
// // // //         }
// // // //       } catch (error) {
// // // //         setError(`Error fetching user data: ${error.message}`);
// // // //       }
// // // //     };

// // // //     const fetchCareerData = async () => {
// // // //       const careerRef = databaseRef(rtdb, 'career_data');
// // // //       const snapshot = await getFromRTDB(careerRef);
// // // //       if (snapshot.exists()) {
// // // //         const data = Object.values(snapshot.val());
// // // //         setCareerData(data);
// // // //         setDebugInfo(`Career data loaded: ${JSON.stringify(data)}`);
// // // //       } else {
// // // //         setError('No career data available.');
// // // //       }
// // // //       setLoading(false);
// // // //     };

// // // //     fetchUserData();
// // // //     fetchCareerData();
// // // //   }, [navigate]);

// // // //   useEffect(() => {
// // // //     if (!userInput || !careerData.length) {
// // // //       setDebugInfo('User input or career data is not loaded correctly.');
// // // //       return;
// // // //     }

// // // //     const bestMatch = calculateBestMatch(userInput, careerData);
// // // //     setBestRecommendation(bestMatch);
// // // //     if (!bestMatch) {
// // // //       setDebugInfo('No valid match found. Check data compatibility.');
// // // //     } else {
// // // //       setDebugInfo(`Match found: ${JSON.stringify(bestMatch)}`);
// // // //     }
// // // //   }, [userInput, careerData]);

// // // //   const calculateBestMatch = (inputs, careers) => {
// // // //     let debugMatches = [];  // To store information about each match attempt
  
// // // //     if (!inputs || careers.length === 0) {
// // // //       return null;  // Return null early if inputs or careers are not properly loaded
// // // //     }
  
// // // //     const result = careers.reduce((best, career) => {
// // // //       let score = 0;
  
// // // //       // Ensure career goal exists and is a string before attempting to access its methods
// // // //       if (career.CareerGoal && typeof career.CareerGoal === 'string' &&
// // // //           inputs['What are your career goals?'] && typeof inputs['What are your career goals?'] === 'string') {
// // // //         const careerGoalKeywords = career.CareerGoal.toLowerCase().split(/\s+/);
// // // //         const inputCareerGoalKeywords = inputs['What are your career goals?'].toLowerCase().split(/\s+/);
  
// // // //         // Calculate score based on keyword match
// // // //         inputCareerGoalKeywords.forEach(keyword => {
// // // //           if (careerGoalKeywords.includes(keyword)) {
// // // //             score += 2;
// // // //           }
// // // //         });
// // // //       }
  
// // // //       // Ensure both career skills and input skills exist and are arrays before processing
// // // //       if (Array.isArray(career.Skills) && Array.isArray(inputs['What skills would you like to improve?'])) {
// // // //         const inputSkills = inputs['What skills would you like to improve?'].map(skill => skill.toLowerCase());
// // // //         const careerSkills = career.Skills.map(skill => skill.toLowerCase());
// // // //         inputSkills.forEach(skill => {
// // // //           if (careerSkills.includes(skill)) {
// // // //             score += 1;
// // // //           }
// // // //         });
// // // //       }
  
// // // //       debugMatches.push({ career: career.CareerGoal, score });  // Store debug information for each career
  
// // // //       // Return the career with the highest score
// // // //       return score > (best.score || 0) ? { ...career, score } : best;
// // // //     }, { score: 0 });
  
// // // //     setDebugInfo(`Match attempts: ${JSON.stringify(debugMatches)}`);  // Output all match attempts
// // // //     return result;
// // // //   };
  

// // // //   return (                             
// // // //     <div className="model-container">
// // // //       <header className="model-header">
// // // //         <h1>Your Personalized Career Path Recommendation</h1>
// // // //       </header>
// // // //       {loading ? (
// // // //         <p>Loading data...</p>
// // // //       ) : error ? (
// // // //         <p>Error: {error}</p>
// // // //       ) : bestRecommendation ? (
// // // //         <div className="recommendation-card">
// // // //           <h2>Best Match for Your Career Goals</h2>
// // // //           <p>Career Goal: {bestRecommendation.CareerGoal || 'Not available'}</p>
// // // //           <p>Skills: {bestRecommendation.Skills?.join(', ') || 'Not available'}</p>
// // // //           <p>Expected Salary: {bestRecommendation.ExpectedSalary || 'Not available'}</p>
// // // //           <p>Topics to Learn: {bestRecommendation.TopicsToLearn?.join(', ') || 'Not available'}</p>
// // // //         </div>
// // // //       ) : (
// // // //         <p>No recommendations available based on your inputs.</p>
// // // //       )}
// // // //       <div className="debug-info">
// // // //         <h3>Debug Information</h3>
// // // //         {debugInfo && <p>{debugInfo}</p>}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Model;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { auth, db, rtdb } from '../firebase-config';
// // // import { doc, getDoc } from 'firebase/firestore';
// // // import { ref as databaseRef, get as getFromRTDB } from 'firebase/database';
// // // import * as useModel from '@tensorflow-models/universal-sentence-encoder';
// // // import '@tensorflow/tfjs';
// // // import './Model.css';

// // // const Model = () => {
// // //   const navigate = useNavigate();
// // //   const [careerData, setCareerData] = useState([]);
// // //   const [userInput, setUserInput] = useState(null);
// // //   const [bestRecommendation, setBestRecommendation] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [debugInfo, setDebugInfo] = useState('');
// // //   const [model, setModel] = useState(null);

// // //   // 1) Load the Universal Sentence Encoder model
// // //   useEffect(() => {
// // //     const loadUSEModel = async () => {
// // //       try {
// // //         const loadedModel = await useModel.load();
// // //         setModel(loadedModel);
// // //       } catch (err) {
// // //         console.error('Error loading model:', err);
// // //         setError('Error loading semantic model.');
// // //       }
// // //     };
// // //     loadUSEModel();
// // //   }, []);

// // //   // 2) Fetch user data from Firestore & career data from RTDB
// // //   useEffect(() => {
// // //     const fetchUserData = async () => {
// // //       if (!auth.currentUser) {
// // //         setError("No user authenticated.");
// // //         navigate("/login");
// // //         return;
// // //       }

// // //       const userDocRef = doc(db, "users", auth.currentUser.uid);
// // //       try {
// // //         const docSnap = await getDoc(userDocRef);
// // //         if (docSnap.exists()) {
// // //           const data = docSnap.data();

// // //           // Check if there are chatbot interactions
// // //           if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
// // //             // Sort by completedAt in descending order (most recent first)
// // //             const sortedInteractions = data.chatbotInteractions.sort((a, b) => {
// // //               const aMillis = a.completedAt?.toMillis ? a.completedAt.toMillis() : 0;
// // //               const bMillis = b.completedAt?.toMillis ? b.completedAt.toMillis() : 0;
// // //               return bMillis - aMillis;
// // //             });

// // //             const recentInteraction = sortedInteractions[0];
// // //             if (recentInteraction.responses) {
// // //               setUserInput(recentInteraction.responses);
// // //               setDebugInfo(`User responses loaded: ${JSON.stringify(recentInteraction.responses)}`);
// // //             } else {
// // //               setError("No responses in the most recent interaction.");
// // //             }
// // //           } else {
// // //             setError("No interactions found for the user.");
// // //           }
// // //         } else {
// // //           setError("User document does not exist.");
// // //           navigate("/login");
// // //         }
// // //       } catch (err) {
// // //         setError(`Error fetching user data: ${err.message}`);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     const fetchCareerData = async () => {
// // //       const careerRef = databaseRef(rtdb, 'career_data');
// // //       try {
// // //         const snapshot = await getFromRTDB(careerRef);
// // //         if (snapshot.exists()) {
// // //           // Convert the object of career_data into an array
// // //           const data = Object.values(snapshot.val());
// // //           setCareerData(data);
// // //           setDebugInfo(prev => prev + `\nCareer data loaded: ${JSON.stringify(data)}`);
// // //         } else {
// // //           setError('No career data available.');
// // //         }
// // //       } catch (err) {
// // //         setError(`Error fetching career data: ${err.message}`);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserData();
// // //     fetchCareerData();
// // //   }, [navigate]);

// // //   // 3) Perform semantic matching once userInput, careerData, and model are ready
// // //   useEffect(() => {
// // //     const calculateBestMatch = async () => {
// // //       if (!userInput || !careerData.length || !model) {
// // //         setDebugInfo('User input, career data, or model is not loaded correctly.');
// // //         return;
// // //       }

// // //       // Use the correct field names from Firestore
// // //       const userCareerGoal = userInput.careerGoal || '';
// // //       const userSkills = userInput.skillsAndImprovements || '';
// // //       const userText = `${userCareerGoal}. ${userSkills}`.trim();

// // //       // Embed the user text
// // //       const userEmbedding = await model.embed([userText]);

// // //       // Prepare an array of career texts by combining "Career Goal" + "Skills"
// // //       const careerTexts = careerData.map((career) => {
// // //         // If your JSON truly has "Career Goal" as the key:
// // //         const careerGoal = career["Career Goal"] || '';
        
// // //         // Skills can be a string or array. If it's an array, join with commas
// // //         let careerSkills = '';
// // //         if (Array.isArray(career.Skills)) {
// // //           careerSkills = career.Skills.join(', ');
// // //         } else if (typeof career.Skills === 'string') {
// // //           careerSkills = career.Skills;
// // //         }

// // //         return `${careerGoal}. ${careerSkills}`.trim();
// // //       });

// // //       // Embed all career texts
// // //       const careerEmbeddings = await model.embed(careerTexts);

// // //       const userEmbeddingArray = await userEmbedding.array();
// // //       const careerEmbeddingArray = await careerEmbeddings.array();

// // //       // Helper function: compute cosine similarity
// // //       const cosineSimilarity = (vecA, vecB) => {
// // //         const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
// // //         const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
// // //         const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
// // //         return dotProduct / (normA * normB);
// // //       };

// // //       // Compare user vector with each career vector to find best match
// // //       let bestScore = -Infinity;
// // //       let bestMatch = null;

// // //       userEmbeddingArray.forEach((userVec) => {
// // //         careerEmbeddingArray.forEach((careerVec, idx) => {
// // //           const score = cosineSimilarity(userVec, careerVec);
// // //           if (score > bestScore) {
// // //             bestScore = score;
// // //             bestMatch = careerData[idx];
// // //           }
// // //         });
// // //       });

// // //       setBestRecommendation(bestMatch);

// // //       if (!bestMatch) {
// // //         setDebugInfo('No valid match found. Check data compatibility.');
// // //       } else {
// // //         setDebugInfo(prev => prev + `\nMatch found with score ${bestScore.toFixed(2)}: ${JSON.stringify(bestMatch)}`);
// // //       }
// // //     };

// // //     calculateBestMatch();
// // //   }, [userInput, careerData, model]);

// // //   // 4) Render the UI
// // //   return (
// // //     <div className="model-container">
// // //       <header className="model-header">
// // //         <h1>Your Personalized Career Path Recommendation</h1>
// // //       </header>
// // //       {loading ? (
// // //         <p>Loading data...</p>
// // //       ) : error ? (
// // //         <p className="error">Error: {error}</p>
// // //       ) : bestRecommendation ? (
// // //         <div className="recommendation-card">
// // //           <h2>Best Match for Your Career Goals</h2>
// // //           <p>
// // //             <strong>Career Goal:</strong>{" "}
// // //             {bestRecommendation["Career Goal"] || "Not available"}
// // //           </p>
// // //           <p>
// // //             <strong>Skills:</strong>{" "}
// // //             {Array.isArray(bestRecommendation.Skills)
// // //               ? bestRecommendation.Skills.join(', ')
// // //               : bestRecommendation.Skills || 'Not available'}
// // //           </p>
// // //           <p>
// // //             <strong>Expected Salary:</strong>{" "}
// // //             {bestRecommendation["Expected Salary"] || 'Not available'}
// // //           </p>
// // //           <p>
// // //             <strong>Topics to Learn:</strong>{" "}
// // //             {Array.isArray(bestRecommendation.TopicsToLearn)
// // //               ? bestRecommendation.TopicsToLearn.join(', ')
// // //               : bestRecommendation.TopicsToLearn || 'Not available'}
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         <p>No recommendations available based on your inputs.</p>
// // //       )}
// // //       <div className="debug-info">
// // //         <h3>Debug Information</h3>
// // //         <p>{debugInfo}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Model;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { auth, db, rtdb } from '../firebase-config';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { ref as databaseRef, get as getFromRTDB } from 'firebase/database';
// // import * as useModel from '@tensorflow-models/universal-sentence-encoder';
// // import '@tensorflow/tfjs';
// // import './Model.css';

// // const Model = () => {
// //   const navigate = useNavigate();
// //   const [careerData, setCareerData] = useState([]);
// //   const [userInput, setUserInput] = useState(null);
// //   const [bestRecommendation, setBestRecommendation] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [debugInfo, setDebugInfo] = useState('');
// //   const [model, setModel] = useState(null);

// //   // 1) Load the Universal Sentence Encoder model
// //   useEffect(() => {
// //     const loadUSEModel = async () => {
// //       try {
// //         const loadedModel = await useModel.load();
// //         setModel(loadedModel);
// //       } catch (err) {
// //         console.error('Error loading model:', err);
// //         setError('Error loading semantic model.');
// //       }
// //     };
// //     loadUSEModel();
// //   }, []);

// //   // 2) Fetch user data from Firestore & career data from RTDB
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       if (!auth.currentUser) {
// //         setError("No user authenticated.");
// //         navigate("/login");
// //         return;
// //       }

// //       const userDocRef = doc(db, "users", auth.currentUser.uid);
// //       try {
// //         const docSnap = await getDoc(userDocRef);
// //         if (docSnap.exists()) {
// //           const data = docSnap.data();

// //           // Check if there are chatbot interactions
// //           if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
// //             // Sort by completedAt in descending order (most recent first)
// //             const sortedInteractions = data.chatbotInteractions.sort((a, b) => {
// //               const aMillis = a.completedAt?.toMillis ? a.completedAt.toMillis() : 0;
// //               const bMillis = b.completedAt?.toMillis ? b.completedAt.toMillis() : 0;
// //               return bMillis - aMillis;
// //             });

// //             const recentInteraction = sortedInteractions[0];
// //             if (recentInteraction.responses) {
// //               setUserInput(recentInteraction.responses);
// //               setDebugInfo(`User responses loaded: ${JSON.stringify(recentInteraction.responses)}`);
// //             } else {
// //               setError("No responses in the most recent interaction.");
// //             }
// //           } else {
// //             setError("No interactions found for the user.");
// //           }
// //         } else {
// //           setError("User document does not exist.");
// //           navigate("/login");
// //         }
// //       } catch (err) {
// //         setError(`Error fetching user data: ${err.message}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const fetchCareerData = async () => {
// //       const careerRef = databaseRef(rtdb, 'career_data');
// //       try {
// //         const snapshot = await getFromRTDB(careerRef);
// //         if (snapshot.exists()) {
// //           // Convert the object of career_data into an array
// //           const data = Object.values(snapshot.val());
// //           setCareerData(data);
// //           setDebugInfo(prev => prev + `\nCareer data loaded: ${JSON.stringify(data)}`);
// //         } else {
// //           setError('No career data available.');
// //         }
// //       } catch (err) {
// //         setError(`Error fetching career data: ${err.message}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //     fetchCareerData();
// //   }, [navigate]);

// //   // 3) Perform semantic matching once userInput, careerData, and model are ready
// //   useEffect(() => {
// //     const calculateBestMatch = async () => {
// //       if (!userInput || !careerData.length || !model) {
// //         setDebugInfo('User input, career data, or model is not loaded correctly.');
// //         return;
// //       }

// //       // Use the correct field names from Firestore
// //       const userCareerGoal = userInput.careerGoal || '';
// //       const userSkills = userInput.skillsAndImprovements || '';
// //       const userText = `${userCareerGoal}. ${userSkills}`.trim();

// //       // Embed the user text
// //       const userEmbedding = await model.embed([userText]);

// //       // Prepare an array of career texts by combining "Career Goal" + "Skills"
// //       const careerTexts = careerData.map((career) => {
// //         const careerGoal = career["Career Goal"] || '';
// //         let careerSkills = '';
// //         if (Array.isArray(career.Skills)) {
// //           careerSkills = career.Skills.join(', ');
// //         } else if (typeof career.Skills === 'string') {
// //           careerSkills = career.Skills;
// //         }
// //         return `${careerGoal}. ${careerSkills}`.trim();
// //       });

// //       // Embed all career texts
// //       const careerEmbeddings = await model.embed(careerTexts);

// //       const userEmbeddingArray = await userEmbedding.array();
// //       const careerEmbeddingArray = await careerEmbeddings.array();

// //       // Helper function: compute cosine similarity
// //       const cosineSimilarity = (vecA, vecB) => {
// //         const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
// //         const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
// //         const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
// //         return dotProduct / (normA * normB);
// //       };

// //       // Compare user vector with each career vector to find best match
// //       let bestScore = -Infinity;
// //       let bestMatch = null;

// //       userEmbeddingArray.forEach((userVec) => {
// //         careerEmbeddingArray.forEach((careerVec, idx) => {
// //           const score = cosineSimilarity(userVec, careerVec);
// //           if (score > bestScore) {
// //             bestScore = score;
// //             bestMatch = careerData[idx];
// //           }
// //         });
// //       });

// //       setBestRecommendation(bestMatch);

// //       if (!bestMatch) {
// //         setDebugInfo('No valid match found. Check data compatibility.');
// //       } else {
// //         setDebugInfo(prev => prev + `\nMatch found with score ${bestScore.toFixed(2)}: ${JSON.stringify(bestMatch)}`);
// //       }
// //     };

// //     calculateBestMatch();
// //   }, [userInput, careerData, model]);

// //   // 4) Render the UI
// //   return (
// //     <div className="model-container">
// //       <header className="model-header">
// //         <h1>Your Personalized Career Path Recommendation</h1>
// //       </header>
// //       {loading ? (
// //         <p>Loading data...</p>
// //       ) : error ? (
// //         <p className="error">Error: {error}</p>
// //       ) : bestRecommendation ? (
// //         <div className="recommendation-card">
// //           <h2>Best Match for Your Career Goals</h2>
// //           <p>
// //             <strong>Career Goal:</strong>{" "}
// //             {bestRecommendation["Career Goal"] || "Not available"}
// //           </p>
// //           <p>
// //             <strong>Skills:</strong>{" "}
// //             {Array.isArray(bestRecommendation.Skills)
// //               ? bestRecommendation.Skills.join(', ')
// //               : bestRecommendation.Skills || 'Not available'}
// //           </p>
// //           <p>
// //             <strong>Expected Salary:</strong>{" "}
// //             {bestRecommendation["Expected Salary"] || 'Not available'}
// //           </p>
// //           <p>
// //             <strong>Topics to Learn:</strong>{" "}
// //             {Array.isArray(bestRecommendation["Topics To Learn"])
// //               ? bestRecommendation["Topics To Learn"].join(', ')
// //               : bestRecommendation["Topics To Learn"] || 'Not available'}
// //           </p>
// //           <div className="certification-links">
// //             <h3>Certification Links</h3>
// //             <ul>
// //               {bestRecommendation["Certification Links"] &&
// //                 bestRecommendation["Certification Links"].map((link, index) => (
// //                   <li key={index}>
// //                     <a href={link} target="_blank" rel="noopener noreferrer">
// //                       {link}
// //                     </a>
// //                   </li>
// //                 ))}
// //             </ul>
// //           </div>
// //         </div>
// //       ) : (
// //         <p>No recommendations available based on your inputs.</p>
// //       )}
// //       <div className="debug-info">
// //         <h3>Debug Information</h3>
// //         <p>{debugInfo}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Model;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db, rtdb } from '../firebase-config';
// import { doc, getDoc } from 'firebase/firestore';
// import { ref as databaseRef, get as getFromRTDB } from 'firebase/database';
// import * as useModel from '@tensorflow-models/universal-sentence-encoder';
// import '@tensorflow/tfjs';
// import './Model.css';

// const Model = () => {
//   const navigate = useNavigate();
//   const [careerData, setCareerData] = useState([]);
//   const [userInput, setUserInput] = useState(null);
//   const [bestRecommendation, setBestRecommendation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [debugInfo, setDebugInfo] = useState('');
//   const [model, setModel] = useState(null);

//   // 1) Load the Universal Sentence Encoder model
//   useEffect(() => {
//     const loadUSEModel = async () => {
//       try {
//         const loadedModel = await useModel.load();
//         setModel(loadedModel);
//       } catch (err) {
//         console.error('Error loading model:', err);
//         setError('Error loading semantic model.');
//       }
//     };
//     loadUSEModel();
//   }, []);

//   // 2) Fetch user data from Firestore & career data from RTDB
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!auth.currentUser) {
//         setError("No user authenticated.");
//         navigate("/login");
//         return;
//       }

//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       try {
//         const docSnap = await getDoc(userDocRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();

//           // Check if there are chatbot interactions
//           if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
//             // Sort by completedAt in descending order (most recent first)
//             const sortedInteractions = data.chatbotInteractions.sort((a, b) => {
//               const aMillis = a.completedAt?.toMillis ? a.completedAt.toMillis() : 0;
//               const bMillis = b.completedAt?.toMillis ? b.completedAt.toMillis() : 0;
//               return bMillis - aMillis;
//             });

//             const recentInteraction = sortedInteractions[0];
//             if (recentInteraction.responses) {
//               setUserInput(recentInteraction.responses);
//               setDebugInfo(`User responses loaded: ${JSON.stringify(recentInteraction.responses)}`);
//             } else {
//               setError("No responses in the most recent interaction.");
//             }
//           } else {
//             setError("No interactions found for the user.");
//           }
//         } else {
//           setError("User document does not exist.");
//           navigate("/login");
//         }
//       } catch (err) {
//         setError(`Error fetching user data: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchCareerData = async () => {
//       const careerRef = databaseRef(rtdb, 'career_data');
//       try {
//         const snapshot = await getFromRTDB(careerRef);
//         if (snapshot.exists()) {
//           // Convert the object of career_data into an array
//           const data = Object.values(snapshot.val());
//           setCareerData(data);
//           setDebugInfo(prev => prev + `\nCareer data loaded: ${JSON.stringify(data)}`);
//         } else {
//           setError('No career data available.');
//         }
//       } catch (err) {
//         setError(`Error fetching career data: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//     fetchCareerData();
//   }, [navigate]);

//   // 3) Perform semantic matching once userInput, careerData, and model are ready
//   useEffect(() => {
//     const calculateBestMatch = async () => {
//       if (!userInput || !careerData.length || !model) {
//         setDebugInfo('User input, career data, or model is not loaded correctly.');
//         return;
//       }

//       // Use the correct field names from Firestore
//       const userCareerGoal = userInput.careerGoal || '';
//       const userSkills = userInput.skillsAndImprovements || '';
//       const userText = `${userCareerGoal}. ${userSkills}`.trim();

//       // Embed the user text
//       const userEmbedding = await model.embed([userText]);

//       // Prepare an array of career texts by combining "Career Goal" + "Skills"
//       const careerTexts = careerData.map((career) => {
//         const careerGoal = career["Career Goal"] || '';
//         let careerSkills = '';
//         if (Array.isArray(career.Skills)) {
//           careerSkills = career.Skills.join(', ');
//         } else if (typeof career.Skills === 'string') {
//           careerSkills = career.Skills;
//         }
//         return `${careerGoal}. ${careerSkills}`.trim();
//       });

//       // Embed all career texts
//       const careerEmbeddings = await model.embed(careerTexts);

//       const userEmbeddingArray = await userEmbedding.array();
//       const careerEmbeddingArray = await careerEmbeddings.array();

//       // Helper function: compute cosine similarity
//       const cosineSimilarity = (vecA, vecB) => {
//         const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
//         const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
//         const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
//         return dotProduct / (normA * normB);
//       };

//       // Compare user vector with each career vector to find best match
//       let bestScore = -Infinity;
//       let bestMatch = null;

//       userEmbeddingArray.forEach((userVec) => {
//         careerEmbeddingArray.forEach((careerVec, idx) => {
//           const score = cosineSimilarity(userVec, careerVec);
//           if (score > bestScore) {
//             bestScore = score;
//             bestMatch = careerData[idx];
//           }
//         });
//       });

//       setBestRecommendation(bestMatch);

//       if (!bestMatch) {
//         setDebugInfo('No valid match found. Check data compatibility.');
//       } else {
//         setDebugInfo(prev => prev + `\nMatch found with score ${bestScore.toFixed(2)}: ${JSON.stringify(bestMatch)}`);
//       }
//     };

//     calculateBestMatch();
//   }, [userInput, careerData, model]);

//   // 4) Render the UI (wrapped in a local container .model-page)
//   return (
//     <div className="model-page">
//       <div className="model-container">
//         <header className="model-header">
//           <h1>Your Personalized Career Path Recommendation</h1>
//         </header>
//         {loading ? (
//           <p>Loading data...</p>
//         ) : error ? (
//           <p className="error">Error: {error}</p>
//         ) : bestRecommendation ? (
//           <div className="recommendation-card">
//             <h2>Best Match for Your Career Goals</h2>
//             <p>
//               <strong>Career Goal:</strong>{" "}
//               {bestRecommendation["Career Goal"] || "Not available"}
//             </p>
//             <div className="skills-container">
//               <h3>Skills</h3>
//               <div className="skills-cards">
//                 {(() => {
//                   let skillsArray = [];
//                   if (Array.isArray(bestRecommendation.Skills)) {
//                     skillsArray = bestRecommendation.Skills;
//                   } else if (typeof bestRecommendation.Skills === 'string') {
//                     skillsArray = bestRecommendation.Skills.split(',').map(skill => skill.trim());
//                   }
//                   return skillsArray.map((skill, index) => (
//                     <div key={index} className="skill-card">
//                       {skill}
//                     </div>
//                   ));
//                 })()}
//               </div>
//             </div>
//             <p>
//               <strong>Expected Salary:</strong>{" "}
//               {bestRecommendation["Expected Salary"] || 'Not available'}
//             </p>
//             <p>
//               <strong>Topics to Learn:</strong>{" "}
//               {Array.isArray(bestRecommendation["Topics To Learn"])
//                 ? bestRecommendation["Topics To Learn"].join(', ')
//                 : bestRecommendation["Topics To Learn"] || 'Not available'}
//             </p>
//             <div className="certification-links">
//               <h3>Certification Links</h3>
//               <div className="certification-cards">
//                 {bestRecommendation["Certification Links"] &&
//                   bestRecommendation["Certification Links"].map((link, index) => (
//                     <div key={index} className="certification-card">
//                       <a href={link} target="_blank" rel="noopener noreferrer">
//                         {link}
//                       </a>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>No recommendations available based on your inputs.</p>
//         )}
//         <div className="debug-info">
//           <h3>Debug Information</h3>
//           <p>{debugInfo}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Model;

import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, rtdb } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { ref as databaseRef, get as getFromRTDB } from "firebase/database";
import * as useModel from "@tensorflow-models/universal-sentence-encoder";
import "@tensorflow/tfjs"; // Keep if your environment needs TF
import { RecommendationContext } from "../context/RecommendationContext";
import "./Model.css"; // Your existing Model.css
import Logo from "./Logo.png"; // The same logo as in Dashboard
import jsPDF from "jspdf";

// Inline styles for the top nav bar
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

const Model = () => {
  const navigate = useNavigate();

  // States for data & loading
  const [userInput, setUserInput] = useState(null);
  const [careerData, setCareerData] = useState([]);
  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [careerDataLoaded, setCareerDataLoaded] = useState(false);

  // Error (no debug info displayed)
  const [error, setError] = useState("");

  // Recommendation context
  const { bestRecommendation, setBestRecommendation } = useContext(RecommendationContext);

  // UI states
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // For PDF generation
  const recommendationRef = useRef(null);

  // 1) Load the Universal Sentence Encoder model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await useModel.load();
        setModel(loadedModel);
        setModelLoaded(true);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Error loading semantic model.");
      }
    };
    loadModel();
  }, []);

  // 2) Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        setError("No user authenticated.");
        navigate("/login");
        return;
      }
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.chatbotInteractions && data.chatbotInteractions.length > 0) {
            const sorted = data.chatbotInteractions.sort((a, b) => {
              const aMillis = a.completedAt?.toMillis?.() || 0;
              const bMillis = b.completedAt?.toMillis?.() || 0;
              return bMillis - aMillis;
            });
            const recent = sorted[0];
            if (recent.responses) {
              setUserInput(recent.responses);
            } else {
              setError("No responses in the most recent interaction.");
            }
          } else {
            setError("No interactions found for the user.");
          }
        } else {
          setError("User document does not exist.");
          navigate("/login");
        }
      } catch (err) {
        setError(`Error fetching user data: ${err.message}`);
      } finally {
        setUserDataLoaded(true);
      }
    };
    fetchUserData();
  }, [navigate]);

  // 3) Fetch career data from Realtime DB
  useEffect(() => {
    const fetchCareerData = async () => {
      const careerRef = databaseRef(rtdb, "career_data");
      try {
        const snapshot = await getFromRTDB(careerRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          setCareerData(data);
        } else {
          setError("No career data available.");
        }
      } catch (err) {
        setError(`Error fetching career data: ${err.message}`);
      } finally {
        setCareerDataLoaded(true);
      }
    };
    fetchCareerData();
  }, []);

  // 4) Once model, user data, and career data are loaded, do matching
  useEffect(() => {
    if (error) return;
    if (!modelLoaded || !userDataLoaded || !careerDataLoaded) return;
    if (!userInput || !careerData.length || !model) return;

    const calculateBestMatch = async () => {
      const userCareerGoal = userInput.careerGoal || "";
      const userSkills = userInput.skillsAndImprovements || "";
      const userText = `${userCareerGoal}. ${userSkills}`.trim();

      const userEmbedding = await model.embed([userText]);
      const careerTexts = careerData.map((career) => {
        const cGoal = career["Career Goal"] || "";
        let cSkills = "";
        if (Array.isArray(career.Skills)) {
          cSkills = career.Skills.join(", ");
        } else if (typeof career.Skills === "string") {
          cSkills = career.Skills;
        }
        return `${cGoal}. ${cSkills}`.trim();
      });
      const careerEmbeddings = await model.embed(careerTexts);

      const userEmbeddingArray = await userEmbedding.array();
      const careerEmbeddingArray = await careerEmbeddings.array();

      const cosineSimilarity = (vecA, vecB) => {
        const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
        const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
        const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
        return dotProduct / (normA * normB);
      };

      let bestScore = -Infinity;
      let bestMatch = null;

      userEmbeddingArray.forEach((uVec) => {
        careerEmbeddingArray.forEach((cVec, idx) => {
          const score = cosineSimilarity(uVec, cVec);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = careerData[idx];
          }
        });
      });

      setBestRecommendation(bestMatch);
      setMatchingComplete(true);
    };

    calculateBestMatch();
  }, [error, modelLoaded, userDataLoaded, careerDataLoaded, userInput, careerData, model, setBestRecommendation]);

  // 5) Progress Bar
  const loadedCount = [modelLoaded, userDataLoaded, careerDataLoaded].filter(Boolean).length;
  const progress = Math.round((loadedCount / 3) * 100);

  // 6) Wait 2 seconds at 100% progress
  useEffect(() => {
    if (progress === 100 && matchingComplete) {
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, matchingComplete]);

  const handleExportPDF = () => {
    if (!bestRecommendation) {
      alert("No recommendation to export.");
      return;
    }
  
    const doc = new jsPDF({ orientation: "p", unit: "pt", format: "letter" });
  
    // Basic styling
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
  
    let yPos = 60;
  
    // 1) Header / Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Your Personalized Career Path Recommendation", 40, yPos);
    yPos += 10;
  
    // Horizontal line under title
    doc.setLineWidth(1);
    doc.setDrawColor(66, 133, 244);
    doc.line(40, yPos, 570, yPos);
    yPos += 30;
  
    // 2) Subheader
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(66, 133, 244);
    doc.text("Best Match for Your Career Goals", 40, yPos);
    doc.setTextColor(40, 40, 40);
    yPos += 20;
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    // We'll build an array of text lines we want to print
    const rec = bestRecommendation;
  
    let lines = [];
  
    // Career Goal
    lines.push(`Career Goal: ${rec["Career Goal"] || "N/A"}`);
  
    // Skills
    let skillsArray = [];
    if (Array.isArray(rec.Skills)) {
      skillsArray = rec.Skills;
    } else if (typeof rec.Skills === "string") {
      skillsArray = rec.Skills.split(",").map((s) => s.trim());
    }
    lines.push(`Skills: ${skillsArray.join(", ")}`);
  
    // Expected Salary
    lines.push(`Expected Salary: ${rec["Expected Salary"] || "N/A"}`);
  
    // Topics
    const topics = Array.isArray(rec["Topics To Learn"])
      ? rec["Topics To Learn"].join(", ")
      : rec["Topics To Learn"] || "N/A";
    lines.push(`Topics to Learn: ${topics}`);
  
    // Certification Links
    if (rec["Certification Links"] && rec["Certification Links"].length > 0) {
      lines.push("Certification Links:");
      rec["Certification Links"].forEach((link) => {
        lines.push(`• ${link}`);
      });
    }
  
    // We measure how many lines we have
    const lineSpacing = 18; // spacing between lines
    const boxPaddingTop = 15; // extra top padding
    const boxPaddingBottom = 15; // extra bottom padding
    let boxHeight = lines.length * lineSpacing + boxPaddingTop + boxPaddingBottom;
  
    // 3) Draw the background box
    const boxLeft = 35;
    const boxWidth = 540;
    const startBoxY = yPos - boxPaddingTop; // so text lines start inside the box
  
    doc.setFillColor(245, 245, 245); // light gray
    doc.rect(boxLeft, startBoxY, boxWidth, boxHeight, "F");
  
    // 4) Print each line on top of the box
    let textY = yPos;
    lines.forEach((line) => {
      doc.text(line, 50, textY);
      textY += lineSpacing;
    });
  
    // 5) Optional small footer note
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Exported from Project S", 40, textY + 20);
  
    // 6) Save the PDF
    doc.save("recommendation.pdf");
  };
  

  // 8) Error state
  if (error) {
    return (
      <div className="model-page">
        <header style={navStyles.navbar}>
          <div style={navStyles.navLeft}>
            <img src={Logo} alt="Project S Logo" style={navStyles.logo} />
            <ul style={navStyles.navLinks}>
              <li>
                <a href="/dashboard" style={navStyles.navLink}>
                  Home
                </a>
              </li>
              <li>
                <a href="/Model" style={navStyles.navLink}>
                  Model
                </a>
              </li>
              <li>
                <a href="/topics" style={navStyles.navLink}>
                  Topics
                </a>
              </li>
              <li>
                <a href="/certifications" style={navStyles.navLink}>
                  Certifications
                </a>
              </li>
              <li>
                <a href="/skills" style={navStyles.navLink}>
                  Skills
                </a>
              </li>
              <li>
                <a href="/bookmarkspage" style={navStyles.navLink}>
                  Saved
                </a>
              </li>
            </ul>
          </div>
          <div style={navStyles.navRight}>
            <a href="/profile" style={navStyles.navLinkRight}>
              Profile
            </a>
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

        <div className="model-container">
          <p className="error">Error: {error}</p>
        </div>
      </div>
    );
  }

  // 9) Loading / progress
  if (!showResults) {
    return (
      <div className="model-page">
        <header style={navStyles.navbar}>
          <div style={navStyles.navLeft}>
            <img src={Logo} alt="Project S Logo" style={navStyles.logo} />
            <ul style={navStyles.navLinks}>
              <li>
                <a href="/dashboard" style={navStyles.navLink}>
                  Home
                </a>
              </li>
              <li>
                <a href="/Model" style={navStyles.navLink}>
                  Model
                </a>
              </li>
              <li>
                <a href="/topics" style={navStyles.navLink}>
                  Topics
                </a>
              </li>
              <li>
                <a href="/certifications" style={navStyles.navLink}>
                  Certifications
                </a>
              </li>
              <li>
                <a href="/skills" style={navStyles.navLink}>
                  Skills
                </a>
              </li>
              <li>
                <a href="/bookmarkspage" style={navStyles.navLink}>
                  Saved
                </a>
              </li>
            </ul>
          </div>
          <div style={navStyles.navRight}>
            <a href="/profile" style={navStyles.navLinkRight}>
              Profile
            </a>
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

        <div className="model-container">
          <h2>Loading your personalized recommendation...</h2>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 10) Final recommendation
  return (
    <div className="model-page">
      <header style={navStyles.navbar}>
        <div style={navStyles.navLeft}>
          <img src={Logo} alt="Project S Logo" style={navStyles.logo} />
          <ul style={navStyles.navLinks}>
            <li>
              <a href="/dashboard" style={navStyles.navLink}>
                Home
              </a>
            </li>
            <li>
              <a href="/Model" style={navStyles.navLink}>
                Model
              </a>
            </li>
            <li>
              <a href="/topics" style={navStyles.navLink}>
                Topics
              </a>
            </li>
            <li>
              <a href="/certifications" style={navStyles.navLink}>
                Certifications
              </a>
            </li>
            <li>
              <a href="/skills" style={navStyles.navLink}>
                Skills
              </a>
            </li>
            <li>
              <a href="/bookmarkspage" style={navStyles.navLink}>
                Saved
              </a>
            </li>
          </ul>
        </div>
        <div style={navStyles.navRight}>
          <a href="/profile" style={navStyles.navLinkRight}>
            Profile
          </a>
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

      <div className="model-container">
        <header className="model-header">
          <h1 style={{ fontSize: "1.6rem" }}>
            Your Personalized Career Path Recommendation
          </h1>
        </header>

        {bestRecommendation ? (
          <div
            className="recommendation-card"
            style={{ padding: "1rem 1.2rem" }}
            ref={recommendationRef}
          >
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>
              Best Match for Your Career Goals
            </h2>
            <p>
              <strong>Career Goal:</strong>{" "}
              {bestRecommendation["Career Goal"] || "Not available"}
            </p>

            {/* Skills */}
            <div className="skills-container">
              <h3 style={{ fontSize: "1rem" }}>Skills</h3>
              <div className="skills-cards">
                {(() => {
                  let sArr = [];
                  if (Array.isArray(bestRecommendation.Skills)) {
                    sArr = bestRecommendation.Skills;
                  } else if (typeof bestRecommendation.Skills === "string") {
                    sArr = bestRecommendation.Skills.split(",").map((s) => s.trim());
                  }
                  return sArr.map((skill, idx) => (
                    <div key={idx} className="skill-card">
                      {skill}
                    </div>
                  ));
                })()}
              </div>
            </div>

            <p>
              <strong>Expected Salary:</strong>{" "}
              {bestRecommendation["Expected Salary"] || "Not available"}
            </p>

            {/* Topics */}
            <p>
              <strong>Topics to Learn:</strong>{" "}
              {Array.isArray(bestRecommendation["Topics To Learn"])
                ? bestRecommendation["Topics To Learn"].join(", ")
                : bestRecommendation["Topics To Learn"] || "Not available"}
            </p>

            {/* Certification Links */}
            <div className="certification-links">
              <h3 style={{ fontSize: "1rem" }}>Certification Links</h3>
              <div className="certification-cards">
                {bestRecommendation["Certification Links"] &&
                  bestRecommendation["Certification Links"].map((link, idx) => (
                    <div key={idx} className="certification-card">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No recommendations available based on your inputs.</p>
        )}

        {/* Export to PDF button */}
        <button
          onClick={handleExportPDF}
          style={{
            backgroundColor: "#4285f4",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "1rem",
            fontSize: "1rem",
          }}
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default Model;
