import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT9mXFjJAARMvsLpCje4thVwV6-s9ETaA",
  authDomain: "tech-doctor-game.firebaseapp.com",
  projectId: "tech-doctor-game",
  storageBucket: "tech-doctor-game.firebasestorage.app",
  messagingSenderId: "282263174693",
  appId: "1:282263174693:web:1acf75bb04a72fbfc609cc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);