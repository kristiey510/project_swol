import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

let config = {
  apiKey: "AIzaSyA1kmErQO5yLK1KAyFBHZwKecayDHhbPNc",
  authDomain: "project-swol.firebaseapp.com",
  projectId: "project-swol",
  storageBucket: "project-swol.appspot.com",
  messagingSenderId: "287215503",
  appId: "1:287215503:web:455e7e1a965d14e2e6c5fa",
  measurementId: "G-BV23BWHS9E",
};
firebase.initializeApp(config);

const db = firebase.firestore();

export { db };
