import React from "react";
import { Box, Image } from "@chakra-ui/react";
import logo from "../../icons/landing_page/Logo.png";
import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link to=".">
        <Image src={logo} backgroundColor="transparent" w="155px" h="50px" />
      </Link>
    </Box>
  );
}
