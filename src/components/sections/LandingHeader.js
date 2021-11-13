import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Logo from "../ui/Logo";

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

const Header = (props) => {
  const show = React.useState(false);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="115%"
      mt="2"
      pt="2"
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
        <Link to="./">
          <Button
            color="primary.150"
            fontWeight="bold"
            lineHeight="1"
            size="3xl"
            bgColor="transparent"
            variant="link"
          >
            <Logo w="200px" color="primary.2400" />
          </Button>
        </Link>
      </Flex>
      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex align="center" color="primary.2400" fontFamily="body">
          <MenuItem to="/About_us">
            <Button
              size="100px"
              fontWeight="bold"
              rounded="lg"
              height="30px"
              width="100px"
              color="primary.150"
              bg="primary.3200"
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
