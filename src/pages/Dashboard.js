import React, { useEffect, useState } from "react";
import { db, getDoc, doc } from "../firebase/firebase";
import Feed from "../components/sections/Feed/Feed";
import Rightbar from "../components/sections/Rightbar/Rightbar";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const [userDoc, setUserDoc] = useState({});

  useEffect(() => {
    async function fetchUserDoc() {
      const docSnap = await getDoc(doc(db, "Profile", user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        data["uid"] = user.uid; //can add to here if need emailVerified, etc.
        setUserDoc(data);
      }
    }
    fetchUserDoc();
  }, [user.uid]);

  return (
    <>
      <Topbar user={userDoc} />
      <div className="homeContainer">
        <Sidebar user={userDoc} />
        <Feed user={userDoc} />
        <Rightbar user={userDoc} />
      </div>
    </>
  );
}
