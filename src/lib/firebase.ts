import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf3TX_l0OoC0l1z06vy0umlWUGBIceLuM",
  authDomain: "companyassessmentt.firebaseapp.com",
  projectId: "companyassessmentt",
  storageBucket: "companyassessmentt.firebasestorage.app",
  messagingSenderId: "34635995791",
  appId: "1:34635995791:web:7e5cabae6f777a6bb12efa",
  measurementId: "G-2009C0H8C9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
