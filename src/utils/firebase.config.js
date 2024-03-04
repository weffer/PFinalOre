import { initializeApp } from "firebase/app";
import { getFireSotre } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDwrD3P5ysOXPbXUCTGF06ymBUG6_1M8NA",
  authDomain: "ecommerce2024-e6b69.firebaseapp.com",
  projectId: "ecommerce2024-e6b69",
  storageBucket: "ecommerce2024-e6b69.appspot.com",
  messagingSenderId: "723538470863",
  appId: "1:723538470863:web:aa279805663672ec17d4ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFireSotre(app);