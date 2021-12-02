import React, { useEffect, useState } from "react";
import { db, getDoc, doc } from "../firebase/firebase";
import Feed from "../components/sections/Feed/Feed";
import Rightbar from "../components/sections/Rightbar/Rightbar";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import "./Dashboard.css";

export default function Dashboard({ user }) {

  return (
    <>
      <Topbar user={user} />
      <div className="homeContainer">
        <Sidebar user={user} />
        <Feed user={user} />
        <Rightbar user={user} />
      </div>
    </>
  );
}
