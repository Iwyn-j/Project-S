const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Xm_fx0HS_yecOPXZSMEwT2tyKeYiFiY",
  authDomain: "project-s-8e354.firebaseapp.com",
  projectId: "project-s-8e354",
  storageBucket: "project-s-8e354.appspot.com",
  messagingSenderId: "347197645159",
  appId: "1:347197645159:web:4114cce9b78475a66f8fc2",
  measurementId: "G-DSQSSGTQ4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Load JSON data
const careerData = require('./data/career_Data.json');

// Function to upload data to Firebase Realtime Database
const uploadData = async () => {
  const dbRef = ref(database, 'career_data');
  await set(dbRef, careerData)
    .then(() => console.log('Data uploaded successfully!'))
    .catch((error) => console.error('Failed to upload data:', error));
};

uploadData();
