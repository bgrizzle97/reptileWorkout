import { FirebaseConfig } from '../types';

// Firebase configuration - should be moved to environment variables
export const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDjkuZOPnqJgajCdvBILkEMSOpYBuaahg0",
  authDomain: "reptiledysfunction-2601f.firebaseapp.com",
  projectId: "reptiledysfunction-2601f",
  storageBucket: "reptiledysfunction-2601f.firebasestorage.app",
  messagingSenderId: "527592177863",
  appId: "1:527592177863:web:9249c38abd6a24eae87ee2",
  measurementId: ""
};

// TODO: Replace with environment variables
// export const firebaseConfig: FirebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
//   appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ""
// }; 