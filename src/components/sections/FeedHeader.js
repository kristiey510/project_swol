import React from "react";
import { auth, signOut } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Spacer, HStack, Input, InputLeftElement, InputGroup} from "@chakra-ui/react";
import Logo from "../ui/Logo";
import {SearchIcon} from "@chakra-ui/icons"

// eslint-disable-next-line react/prop-types
const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const exit = () => {
  signOut(auth);
  alert("You are signed out.");
};

const FeedHeader = (props) => {
  const show = React.useState(false);
  return (
    <Flex
      pt="2"
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
       <Logo
         w = "300px"
         color = "primary.2400"
         h = "80px"
       />
      <HStack align="center" ml="0" mt = "30px">
        <Link to="./profile">
          <Button
            color="primary.2400"
            fontWeight="bold"
            lineHeight="1"
            size="3xl"
            bgColor="transparent"
            variant="link"
          >
            <Text fontSize="lg" color="primary.2400">
              Profile
            </Text>
          </Button>
        </Link>
        <Spacer />
        <Spacer />
        <Spacer />
        <Link to="./dashboard">
          <Button
            color="primary.2400"
            fontWeight="bold"
            lineHeight="1"
            size="3xl"
            bgColor="transparent"
            variant="link"
          >
            <Text fontSize="lg" color="primary.2400">
              Dashboard
            </Text>
          </Button>
        </Link>
        <Spacer />
        <Spacer />
        <Spacer />
        <Link to="./personal_log">
          <Button
            color="primary.2400"
            fontWeight="bold"
            lineHeight="1"
            size="3xl"
            bgColor="transparent"
            variant="link"
          >
            <Text fontSize="lg" color="primary.2400">
              Personal Log
            </Text>
          </Button>
        </Link>
        <Box px = "80px">
        <InputGroup>
          <InputLeftElement>{<SearchIcon color = "primary.3200" />}</InputLeftElement>
          <Input placeholder = "Search" w = "450px" color = "primary.2400"/>
        </InputGroup>
        </Box>
      </HStack>
      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex align="center" color="primary.2400" fontFamily="body">
          <MenuItem to="/">
            <Button
              mt = "43px"
              size="sm"
              fontWeight="bold"
              rounded="lg"
              height="30px"
              width="80px"
              color="primary.150"
              bg="primary.3200"
              onClick={exit}
            >
              Log Out
            </Button>
          </MenuItem>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FeedHeader;
