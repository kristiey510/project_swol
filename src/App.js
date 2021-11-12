import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateAccount from "./pages/CreateAccount";
import LogIn from "./pages/LogIn";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import TestPost from "./pages/TestPost";
import ForgotPass from "./pages/forgotPassword";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import {auth, onAuthStateChanged} from "./firebase/firebase";
import AddFriend from "./pages/AddFriend";
import SignedIn from "./SignedIn";
import NotSignedIn from "./NotSignedIn";

function App() {
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
      //console.log("user",user)
      //window.location = "/dashboard";
    } else setUser(null)
  })


  return user ? <SignedIn user = {user}/> : <NotSignedIn />;
}

export default App;
