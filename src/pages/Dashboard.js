import React, { useState } from "react";
import Feed from "../components/sections/Feed/Feed";
import Rightbar from "../components/sections/Rightbar/Rightbar";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Topbar user={user} handleFilter={handleFilterChange} />
      <div className="homeContainer">
        <Sidebar user={user} />
        <Feed user={user} filter={filter} />
        <Rightbar user={user} />
      </div>
    </>
  );
}
