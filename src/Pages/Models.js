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