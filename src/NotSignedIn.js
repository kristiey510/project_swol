import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateAccount from "./pages/CreateAccount";
import LogIn from "./pages/LogIn";
import ForgotPass from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";

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
        <Route path="/forgot_pass">
          <ForgotPass />
        </Route>
        <Route path="/about_us">
          <AboutUs />
        </Route>
      </Switch>
    </Router>
  );
}

export default NotSignedIn;
