import { initializeApp } from "firebase/app";
import * as Auth from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  query,
  where,
  increment,
  arrayRemove,
  orderBy
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile, 
  EmailAuthProvider, 
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail
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
  sendEmailVerification,
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  getStorage,
  ref,
  uploadBytes,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getDoc, 
  updateDoc,
  getDownloadURL,
  arrayUnion,
  query,
  where,
  increment,
  arrayRemove, 
  getDocs,
  orderBy,
  Auth,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail
};
