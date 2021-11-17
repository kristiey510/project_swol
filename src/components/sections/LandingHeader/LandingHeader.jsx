import React from "react";
import { Link } from "react-router-dom";
import "./LandingHeader.css";
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

export default function LandingHeader() {
  return (
    <div className="LandingHeaderContainer">
      <div className="LandingHeaderLeft">
          <Logo />
      </div>
      <div className="LandingHeaderCenter">
      </div>
      <div className="LandingHeaderRight">
        <Link to = "./about_us">
          <Button w = "100px" h = "30px" bg = "transparent" variant = "link" color = "primary.2350" > About Us </Button>
        </Link>
      </div>
    </div>
  );
}
