import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import Faq from "./pages/Faq";
import PersonalLog from "./pages/PersonalLog";
import Followers from "./pages/Followers";
import ErrorPage from "./errorPage";

import { db, getDoc, doc } from "./firebase/firebase";

function SignedIn({ userTemp }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUserDoc() {
      const docSnap = await getDoc(doc(db, "Profile", userTemp.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        data["uid"] = userTemp.uid; //can add to here if need emailVerified, etc.
        setUser(data);
      }
    }
    fetchUserDoc();
  }, [userTemp.uid]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard user={user} />
        </Route>
        <Route path="/dashboard">
          <Dashboard user={user} />
        </Route>
        <Route path="/about_us">
          <AboutUs user={user} />
        </Route>
        <Route path="/profile_info">
          <ProfileCreate user={user} />
        </Route>
        <Route path="/profile">
          <ProfileEdit user={user} />
        </Route>
        <Route path="/personal_log">
          <PersonalLog user={user} />
        </Route>
        <Route path="/followers">
          <Followers user={user} />
        </Route>
        <Route path="/faq">
          <Faq user={user} />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default SignedIn;
