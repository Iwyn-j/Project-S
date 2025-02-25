// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import { auth, db } from '../firebase-config';
// // // import { doc, getDoc, collection, query, where } from 'firebase/firestore';
// // // import './model.css';

// // // const Model = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [data, setData] = useState([]);
// // //   const [bestRecommendation, setBestRecommendation] = useState(null);
// // //   const [userInput, setUserInput] = useState(null);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const careerDataRef = collection(db, 'careerData');
// // //         const q = query(careerDataRef, where("isActive", "==", true)); // Assuming there's an 'isActive' flag
// // //         const careerSnapshot = await getDocs(q);
// // //         const careers = careerSnapshot.docs.map(doc => doc.data());
// // //         setData(careers);

// // //         if (location.state && location.state.userInput) {
// // //           setUserInput(location.state.userInput);
// // //           calculateAndSetRecommendation(location.state.userInput, careers);
// // //         } else {
// // //           // Handle error or redirect
// // //           console.error("No user input provided for recommendation.");
// // //           navigate("/"); // Redirect to home or another appropriate route
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [navigate, location.state]);

// // //   // Function to calculate and set the best recommendation
// // //   const calculateAndSetRecommendation = (input, careers) => {
// // //     const scores = calculateSimilarity(input.careerGoal, careers);
// // //     const bestMatch = scores.reduce((a, b) => a.score > b.score ? a : b);
// // //     setBestRecommendation(bestMatch);
// // //   };

// // //   // Placeholder for actual similarity calculation
// // //   const calculateSimilarity = (inputCareerGoal, careerData) => {
// // //     return careerData.map(item => ({
// // //       item: item,
// // //       score: Math.random() // This is a placeholder. Implement actual similarity calculation.
// // //     }));
// // //   };

// // //   return (
// // //     <div className="model-container">
// // //       <header className="model-header">
// // //         <h1>Discover Your Path</h1>
// // //       </header>
// // //       {bestRecommendation && (
// // //         <div className="recommendation-card">
// // //           <h2>Best Match for Your Career Goal</h2>
// // //           <p>{`Suggestion: ${bestRecommendation.item.careerGoal}`}</p>
// // //           <p>{`Details: ${bestRecommendation.item.description}`}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Model;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, rtdb } from '../firebase-config'; // Assuming 'rtdb' is the Realtime Database reference
import { doc, getDoc, ref as dbRef, get as getFromRTDB } from 'firebase/firestore';
import { getDatabase, ref, get } from 'firebase/database';
import './Model.css';

const Model = () => {
  const navigate = useNavigate();
  const [careerData, setCareerData] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [bestRecommendation, setBestRecommendation] = useState(null);

  // Fetch user's last interaction from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user authenticated.");
        navigate("/login");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
        setUserInput(lastInteraction.responses);
      } else {
        console.error("User document does not exist.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch career data from Realtime Database
  useEffect(() => {
    const fetchCareerData = async () => {
      const careerRef = ref(rtdb, 'careerData');
      const snapshot = await get(careerRef);
      if (snapshot.exists()) {
        setCareerData(Object.values(snapshot.val()));
      } else {
        console.log('No career data available.');
      }
    };

    fetchCareerData();
  }, []);

  // Function to calculate and set the best recommendation
  useEffect(() => {
    if (userInput && careerData.length) {
      const bestMatch = calculateBestMatch(userInput, careerData);
      setBestRecommendation(bestMatch);
    }
  }, [userInput, careerData]);

  const calculateBestMatch = (inputs, careers) => {
    // Placeholder for similarity calculation
    // Implement your logic to calculate the best match based on 'inputs' and 'careers'
    return careers.reduce((prev, current) => {
      return (prev.score || 0) > current.score ? prev : current; // Just a placeholder comparison
    });
  };

  return (
    <div className="model-container">
      <header className="model-header">
        <h1>Your Personalized Career Path Recommendation</h1>
      </header>
      {bestRecommendation && (
        <div className="recommendation-card">
          <h2>Best Match for Your Career Goals</h2>
          <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
          <p>{`Skills to Improve: ${bestRecommendation.Skills}`}</p>
          <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
        </div>
      )}
    </div>
  );
};

export default Model;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db, rtdb } from '../firebase-config';
// import { doc, getDoc } from 'firebase/firestore';
// import { ref, get } from 'firebase/database';
// import './Model.css';
// import natural from 'natural';  // Assuming you found a way to include this in your client-side environment

// const Model = () => {
//   const navigate = useNavigate();
//   const [careerData, setCareerData] = useState([]);
//   const [userInput, setUserInput] = useState({});
//   const [bestRecommendation, setBestRecommendation] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         console.error("No user authenticated.");
//         navigate("/login");
//         return;
//       }
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const lastInteraction = data.chatbotInteractions[data.chatbotInteractions.length - 1];
//         setUserInput(lastInteraction.responses);
//       } else {
//         console.error("User document does not exist.");
//         navigate("/login");
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchCareerData = async () => {
//       const careerRef = ref(rtdb, 'careerata');
//       const snapshot = await get(careerRef);
//       if (snapshot.exists()) {
//         const data = Object.values(snapshot.val());
//         setCareerData(data);
//         calculateTFIDF(userInput, data);
//       } else {
//         console.log('No career data available.');
//       }
//     };

//     fetchCareerData();
//   }, [userInput]);

//   const calculateTFIDF = (input, careers) => {
//     const tfidf = new natural.TfIdf();
//     tfidf.addDocument(prepareDocument(input.careerGoals, input.skills));

//     careers.forEach((career, index) => {
//       tfidf.addDocument(prepareDocument(career.CareerGoal, career.Skills), index);
//     });

//     let maxScore = -Infinity;
//     let bestIndex = -1;

//     tfidf.tfidfs(prepareDocument(input.careerGoals, input.skills), (i, measure) => {
//       if (i !== 0 && measure > maxScore) {
//         maxScore = measure;
//         bestIndex = i - 1;
//       }
//     });

//     if (bestIndex !== -1) {
//       setBestRecommendation(careers[bestIndex]);
//     }
//   };

//   const prepareDocument = (careerGoals, skills) => `${careerGoals} ${skills}`;

//   return (
//     <div className="model-container">
//       <header className="model-header">
//         <h1>Your Personalized Career Path Recommendation</h1>
//       </header>
//       {bestRecommendation && (
//         <div className="recommendation-card">
//           <h2>Best Match for Your Career Goals</h2>
//           <p>{`Career Goal: ${bestRecommendation.CareerGoal}`}</p>
//           <p>{`Skills to Improve: ${bestRecommendation.Skills}`}</p>
//           <p>{`Topics to Learn: ${bestRecommendation.TopicsToLearn}`}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Model;
