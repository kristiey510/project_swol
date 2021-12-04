import React, { useState, useEffect, useCallback } from "react";
import Graph from "../Graph";
import "./Sidebar.css";
import {
  RssFeed,
  PostAddOutlined,
  HelpOutline,
  Person,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import {
  db,
  getDoc,
  doc,
  getStorage,
  ref,
  getDownloadURL,
  updateDoc,
  arrayRemove,
} from "../../../firebase/firebase";

export default function Sidebar({ user }) {
  const [friends, setFriends] = useState([]);

  const unfollow = useCallback(
    async (uid) => {
      await updateDoc(doc(db, "Profile", user.uid), {
        following: arrayRemove(uid),
      });
    },
    [user.uid]
  );

  useEffect(() => {
    const storage = getStorage();
    async function fetchFriends() {
      user.following?.forEach(async (u) => {
        if (u !== user.uid) {
          const docSnap = await getDoc(doc(db, "Profile", u));
          if (docSnap.data()) {
            var new_obj = {};
            const pathReference = ref(storage, docSnap.data().Picture_id);
            getDownloadURL(pathReference).then((url) => {
              new_obj = { ...docSnap.data(), imgUrl: url };
              setFriends((prev) => [...prev, new_obj]);
            });
          } else {
            //remove from following if user has been deleted
            await unfollow(u);
            alert("One the people you follow has deactivated their account");
          }
        }
      });
    }
    fetchFriends();
  }, [user.following, user.uid, unfollow]);

  return (
    <div className="Sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarLists">
          <Flex
            bg={`${
              window.location.pathname === "/dashboard" ? "gray.100" : ""
            }`}
            pt="10px"
            pb="10px"
            cursor="pointer"
          >
            <RssFeed className="sidebarIcon" />
            {window.location.pathname === "/dashboard" ? (
              <div
                onClick={() => {
                  window.location = "./dashboard";
                }}
              >
                <span className="sidebarListItemNext">Feed</span>
              </div>
            ) : (
              <Link to="./dashboard">
                <span className="sidebarListItemNext">Feed</span>
              </Link>
            )}
          </Flex>
          <Flex
            bg={`${
              window.location.pathname === "/followers" ? "gray.100" : ""
            }`}
            pt="10px"
            pb="10px"
            cursor="pointer"
          >
            <Person className="sidebarIcon" />
            {window.location.pathname === "/followers" ? (
              <div
                onClick={() => {
                  window.location = "./followers";
                }}
              >
                <span className="sidebarListItemNext">Follows</span>
              </div>
            ) : (
              <Link to="./followers">
                <span className="sidebarListItemNext">Follows</span>
              </Link>
            )}
          </Flex>
          <Flex
            bg={`${
              window.location.pathname === "/personal_log" ? "gray.100" : ""
            }`}
            pt="10px"
            pb="10px"
            cursor="pointer"
          >
            <PostAddOutlined className="sidebarIcon" />
            {window.location.pathname === "/personal_log" ? (
              <div
                onClick={() => {
                  window.location = "./personal_log";
                }}
              >
                <span className="sidebarListItemNext">Personal log</span>
              </div>
            ) : (
              <Link to="./personal_log">
                <span className="sidebarListItemNext">Personal log</span>
              </Link>
            )}
          </Flex>
          <Flex
            bg={`${window.location.pathname === "/faq" ? "gray.100" : ""}`}
            pt="10px"
            pb="10px"
            cursor="pointer"
          >
            <HelpOutline className="sidebarIcon" />
            {window.location.pathname === "/faq" ? (
              <div
                onClick={() => {
                  window.location = "./faq";
                }}
              >
                <span className="sidebarListItemNext">FAQ</span>
              </div>
            ) : (
              <Link to="./faq">
                <span className="sidebarListItemNext">FAQ</span>
              </Link>
            )}
          </Flex>
        </ul>
        <hr className="sidebarHr" />
        {(window.location.pathname === "/dashboard" ||
          window.location.pathname === "/") && (
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
        )}
        {window.location.pathname === "/personal_log" && <Graph user={user} />}
      </div>
    </div>
  );
}
