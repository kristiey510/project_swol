import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyA1kmErQO5yLK1KAyFBHZwKecayDHhbPNc",
  authDomain: "project-swol.firebaseapp.com",
  projectId: "project-swol",
  storageBucket: "project-swol.appspot.com",
  messagingSenderId: "287215503",
  appId: "1:287215503:web:455e7e1a965d14e2e6c5fa",
  measurementId: "G-BV23BWHS9E",
});

const db = getFirestore();
const auth = getAuth();

export {
  db,
  auth,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as logIn,
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp
};
