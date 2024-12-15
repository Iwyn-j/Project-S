import firebase from 'firebase/app';
import 'firebase/auth';  // If using Firebase Authentication
import 'firebase/firestore';  // If using Firebase Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-Xm_fx0HS_yecOPXZSMEwT2tyKeYiFiY",
    authDomain: "project-s-8e354.firebaseapp.com",
    projectId: "project-s-8e354",
    storageBucket: "project-s-8e354.firebasestorage.app",
    messagingSenderId: "347197645159",
    appId: "1:347197645159:web:4114cce9b78475a66f8fc2",
    measurementId: "G-DSQSSGTQ4P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = getAnalytics(app);

export { auth, db, analytics};
