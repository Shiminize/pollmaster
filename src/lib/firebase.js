// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCcihL6_lLs7WmFXydg2ea8y5-g-21El1c",
    authDomain: "poll-project-eb8ab.firebaseapp.com",
    projectId: "poll-project-eb8ab",
    storageBucket: "poll-project-eb8ab.firebasestorage.app",
    messagingSenderId: "342605366072",
    appId: "1:342605366072:web:9595c0951c174537e237cd",
    measurementId: "G-C0WSWFWZMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
