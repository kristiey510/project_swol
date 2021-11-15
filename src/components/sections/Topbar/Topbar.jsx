import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import Logo from "../../ui/Logo";
import { Search } from "@material-ui/icons";
import { auth } from "../../../firebase/firebase";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
} from "@chakra-ui/react";

const exit = async () => {
  try {
    await auth.signOut();
    alert("You are signed out.");
    window.location = "/";
  } catch (err) {
    console.log("err", err);
  }
};

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="./dashboard">
          <Logo />
        </Link>
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
        <Menu>
          <MenuButton as={Button} colorScheme="transparent">
            <img
              src="assets/user/guy_1.png"
              alt="Just a dude"
              className="topbarImg"
            />
          </MenuButton>
          <MenuList bg="#FDEBD0" color="primary.2500" minW="150px" maxW="150px">
            <Link to="./profile">
              <MenuItem fontSize = "sm" fontWeight="bold">Profile</MenuItem>
            </Link>
            <MenuItem fontSize = "sm" fontWeight="bold" onClick={exit}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
