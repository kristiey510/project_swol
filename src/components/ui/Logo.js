import React from "react";
import { Box, Image } from "@chakra-ui/react";
import logo from "../../icons/landing_page/Logo.png";

export default function Logo(props) {
  return (
    <Box {...props}>
       <Image
              src={logo}
              backgroundColor="transparent"
              w="100px"
              h="50px"
            />
    </Box>
  );
}