import React from "react";
import Feed from "../components/sections/Feed/Feed"
import Rightbar from "../components/sections/Rightbar/Rightbar"
import Sidebar from "../components/sections/Sidebar/Sidebar"
import Topbar from "../components/sections/Topbar/Topbar"
import "./Dashboard.css"

export default function Dashboard() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      <Rightbar/>
    </div>
    </>
  );
}
