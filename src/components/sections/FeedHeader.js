import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Spacer, HStack } from "@chakra-ui/react";
import Logo from "../ui/Logo";

const auth = getAuth();

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

const FeedHeader = (props) => {
  const show = React.useState(false);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="115%"
      mt="3"
      pt="2"
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      <HStack align="center" ml="20">
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
      </HStack>
      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex align="center" color="primary.2400" fontFamily="body">
          <MenuItem to="/log_out">
            <Button
              size="sm"
              fontWeight="bold"
              rounded="lg"
              height="30px"
              width="80px"
              color="primary.150"
              bg="primary.3200"
              onclick={signOut(auth)}
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
