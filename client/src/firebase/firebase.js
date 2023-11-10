// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "homigo-estate-project.firebaseapp.com",
  projectId: "homigo-estate-project",
  storageBucket: "homigo-estate-project.appspot.com",
  messagingSenderId: "427603908542",
  appId: "1:427603908542:web:3ece1b19de3f2def7e0bef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);