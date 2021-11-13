import React from "react";
import "./Sidebar.css";
import {
  RssFeed,
  PostAddOutlined,
  ScheduleOutlined,
  HelpOutline,
  Person,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarLists">
          <li className="sidebarListsItems">
            <RssFeed className="sidebarIcon" />
            <Link to="./dashboard">
              <span className="sidebarListItemNext">Feed</span>
            </Link>
          </li>
          <li className="sidebarListsItems">
            <Person className="sidebarIcon" />
            <Link to="./personal_log">
              <span className="sidebarListItemNext">Followers</span>
            </Link>
          </li>
          <li className="sidebarListsItems">
            <PostAddOutlined className="sidebarIcon" />
            <Link to="./personal_log">
              <span className="sidebarListItemNext">Personal log</span>
            </Link>
          </li>
          <li className="sidebarListsItems">
            <ScheduleOutlined className="sidebarIcon" />
            <span className="sidebarListItemNext">Schedule</span>
          </li>
          <li className="sidebarListsItems">
            <HelpOutline className="sidebarIcon" />
            <Link to="./faq">
              <span className="sidebarListItemNext">Questions</span>
            </Link>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="/assets/user/girl_1.png"
              alt=""
            />
            <span className="sidebarFriendName">Jane</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
