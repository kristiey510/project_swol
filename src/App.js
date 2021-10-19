import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateAccount from "./pages/CreateAccount";
import LogIn from "./pages/LogIn";
import AboutUs from "./pages/aboutUs";
import Dashboard from "./pages/Dashboard";
import TestPost from "./pages/TestPost";
import ForgotPass from "./pages/forgotPassword";

function App() {
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
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/About_us">
          <AboutUs />
        </Route>
        <Route path="/TestPost">
          <TestPost />
        </Route>
        <Route path="/About_us">
          <AboutUs />
        </Route>
        <Route path={"/forgot_pass"}>
          <ForgotPass />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
