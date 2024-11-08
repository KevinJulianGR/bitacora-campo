import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAD0vHZM8HgXOmjti4CtGJi9PhkIRnRzCM",
  authDomain: "bitacora-de-campo-a0542.firebaseapp.com",
  projectId: "bitacora-de-campo-a0542",
  storageBucket: "bitacora-de-campo-a0542.firebasestorage.app",
  messagingSenderId: "501447505808",
  appId: "1:501447505808:web:693f34e0bc6aa6dad8a515"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


const auth = getAuth(app);


export { db, auth };
