import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const db = getFirestore(app);


// const app = initializeApp(firebaseConfig);


// // Firebase services
// const auth = firebase.auth();
// const db = firebase.firestore();
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);

// export { app, auth, db, analytics };

