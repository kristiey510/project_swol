import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import TestPost from "./pages/TestPost";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import AddFriend from "./pages/AddFriend";
import Faq from "./pages/Faq";
import CreateAccount from "./pages/CreateAccount";
import PersonalLog from "./pages/PersonalLog"
import Followers from "./pages/Followers";

function SignedIn({ user }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard user={user}/>
        </Route>
        <Route path="/dashboard">
          <Dashboard user={user} />
        </Route>
        <Route path="/about_us">
          <AboutUs user={user}/>
        </Route>
        <Route path="/TestPost">
          <TestPost user={user}/>
        </Route>
        <Route path="/profile_info">
          <ProfileCreate user={user}/>
        </Route>
        <Route path="/profile">
          <ProfileEdit user={user}/>
        </Route>
        <Route path="/personal_log">
          <PersonalLog user={user}/>
        </Route>
        <Route path="/followers">
          <Followers/>
        </Route>
        <Route path="/faq">
          <Faq user={user}/>
        </Route>
        <Route path="/signup">
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default SignedIn;
