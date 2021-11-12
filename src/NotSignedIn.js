import "./App.css";
import React from "react";
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

function NotSignedIn() {



  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/signup">
          <CreateAccount />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path={"/forgot_pass"}>
          <ForgotPass />
        </Route>
      </Switch>
    </Router>
  );
}

export default NotSignedIn;
