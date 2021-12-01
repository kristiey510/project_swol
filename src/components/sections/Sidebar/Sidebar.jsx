import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import {
  RssFeed,
  PostAddOutlined,
  ScheduleOutlined,
  HelpOutline,
  Person,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  db,
  collection,
  getStorage,
  ref,
  getDownloadURL,
  query,
  where,
  getDocs,
} from "../../../firebase/firebase";

export default function Sidebar({ user }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      user.following?.forEach((u) => {
        const postQuery = query(
          collection(db, "Profile"),
          where("User_id", "==", u)
        );
        getDocs(postQuery).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var new_obj = {};
            //console.log("friend: ",doc.data())
            if (doc.data().img !== "no_image_provided") {
              //get image ref
              const storage = getStorage();
              const pathReference = ref(storage, doc.data().Picture_id);

              //download, then set attribute to image tag in file
              getDownloadURL(pathReference).then((url) => {
                //console.log("url",url)
                new_obj = { ...doc.data(), imgUrl: url };
                setFriends((prev) => [...prev, new_obj]);
              });
            } else {
              new_obj = { ...doc.data(), imgUrl: null };
              setFriends((prev) => [...prev, new_obj]);
            }
          });
        });
      });
    }
    fetchFriends();
  }, [user.following]);

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
            <Link to="./followers">
              <span className="sidebarListItemNext">Follows</span>
            </Link>
          </li>
          <li className="sidebarListsItems">
            <PostAddOutlined className="sidebarIcon" />
            <Link to="./personal_log">
              <span className="sidebarListItemNext">Personal log</span>
            </Link>
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
          {friends.map((friend, index) => (
            <li className="sidebarFriend" key={index}>
              <img
                className="sidebarFriendImg"
                id="proPic"
                src={friend.imgUrl}
                alt=""
              />
              <span className="sidebarFriendName">{friend.Name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
