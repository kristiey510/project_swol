import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import Logo from "../ui/Logo";

// eslint-disable-next-line react/prop-types
const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Text
      mb = {{ base: isLast ? 0 : 8, sm: 0 }}
      mr = {{ base: 0, sm: isLast ? 0 : 8 }}
      display = "block"
      {...rest}
    >
      <Link to = {to}>{children}</Link>
    </Text>
  );
};

const Header = (props) => {
  const show = React.useState(false);
  return (
    <Flex
      mt = "13px"
      pt = "2"
      mb = "25px"
      color = {["white", "white", "primary.700", "primary.700"]}
      {...props}

    >
      <HStack ml ="5 px" w = "1400px">
        <Link to = "./">
          <Button
            color = "primary.150"
            fontWeight = "bold"
            lineHeight = "1"
            size = "3xl"
            bgColor = "transparent"
            variant ="link"
          >
          <Logo
           w = "300px"
           color = "primary.2400"
           h = "80px"
         />
         </Button>
        </Link>
      </HStack>
     <Box
        display = {{ base: show ? "block" : "none", md: "block" }}
        flexBasis = {{ base: "100%", md: "auto" }}
      >
     <Flex
        align = "center"
        color = "primary.2400"
        fontFamily = "body"
        >
          <MenuItem to = "/About_us">
            <Button
              mt = "20px"
              size = "100px"
              fontWeight = "bold"
              rounded = "lg"
              height = "30px"
              width = "100px"
              color = "primary.150"
              bg = "primary.3200"
            >
              About Us
            </Button>
          </MenuItem>
     </Flex>
    </Box>
     
    </Flex>
  );
};

export default Header;
