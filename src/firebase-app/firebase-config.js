import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAKMWoqmR7FfgOFPhzq6JULcHBcRg14bx8",
  authDomain: "monkey-blogging-bf808.firebaseapp.com",
  projectId: "monkey-blogging-bf808",
  storageBucket: "monkey-blogging-bf808.appspot.com",
  messagingSenderId: "726154643959",
  appId: "1:726154643959:web:c74d54e15f11a2f28606f2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
