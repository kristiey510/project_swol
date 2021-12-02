import "./App.css";
import React, { useState } from "react";
import { auth } from "./firebase/firebase";
import SignedIn from "./SignedIn";
import NotSignedIn from "./NotSignedIn";

function App() {
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((u) => {
    if (u) setUser(u);
    else setUser(null);
  });

  return user ? <SignedIn userTemp={user} /> : <NotSignedIn />;
}

export default App;
