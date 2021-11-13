import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import TestPost from "./pages/TestPost";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import AddFriend from "./pages/AddFriend";

function SignedIn({ user }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/dashboard">
          <Dashboard user={user} />
        </Route>
        <Route path="/About_us">
          <AboutUs />
        </Route>
        <Route path="/TestPost">
          <TestPost />
        </Route>
        <Route path="/profile_info">
          <ProfileCreate />
        </Route>
        <Route path="/profile">
          <ProfileEdit />
        </Route>
        <Route path="/personal_log">
          <AddFriend />
        </Route>
      </Switch>
    </Router>
  );
}

export default SignedIn;
