import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Topbar.css";
import Logo from "../../ui/Logo"
import { Search, Person } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Logo />
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends, post, or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Link to="./Profile">
          <button>
          <img src="assets/user/guy_1.png" alt="" className="topbarImg"/>
          </button>
        </Link>
      </div>
    </div>
  );
}

