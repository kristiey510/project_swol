import React from "react";
import { Link } from "react-router-dom";
import "./LandingHeader.css";
import Logo from "../../ui/Logo";
import { Button } from "@chakra-ui/react";

export default function LandingHeader() {
  return (
    <div className="LandingHeaderContainer">
      <div className="LandingHeaderLeft">
        <Logo/>
      </div>
      <div className="LandingHeaderCenter"></div>
      <div className="LandingHeaderRight">
        <Link to="./about_us">
          <Button
            w="100px"
            h="30px"
            bg="transparent"
            variant="link"
            color="primary.2350"
          >
            About Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
