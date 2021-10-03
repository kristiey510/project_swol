import "./App.css";
import { db } from "./firebase";
import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateAccount from "./pages/CreateAccount"
import LogIn from "./pages/LogIn"

function App() {
  // eslint-disable-next-line
  const handleClick = async () => {
    const ref = db.collection("test").doc("fTsqmwDUuL3RpEGyyxdO");
    const doc = await ref.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data());
    }
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/signup" >
          <CreateAccount />
        </Route>
        <Route path="/login" >
          <LogIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
