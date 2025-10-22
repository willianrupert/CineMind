
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// IMPORTANT: Replace this with your own Firebase project's configuration.
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyBrwQJ7KohWnTEgWko55eKEXy6vVG74C2o",
  authDomain: "cinemind-firebase.firebaseapp.com",
  projectId: "cinemind-firebase",
  storageBucket: "cinemind-firebase.firebasestorage.app",
  messagingSenderId: "287464930445",
  appId: "1:287464930445:web:a7684dbc9e3618e4ed36c4",
  measurementId: "G-BC4D6V5WTM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);