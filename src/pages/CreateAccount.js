import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/sections/Header";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { auth, createUser } from "../firebase";

export default function CreateAccount({
  title,
  subtitle,
  ctaLinkCreate,
  ctaTextCreate,
  ctaLinkLogIn,
  ctaTextLogIn,
  ...rest
}) {
  const [input, setInput] = useState({ email: "", password: "" });
  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateUser = () => {
    createUser(auth, input.email, input.password);
  };

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      <Stack spacing={8} w={{ base: "10%", md: "120%" }} align="center">
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          color="primary.2500"
          textAlign="center"
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.2400"
          opacity="0.8"
          fontWeight="bold"
          lineHeight={1.5}
          textAlign="center"
        >
          {subtitle}
        </Heading>
        <Box w="300px" h="300px" align="center">
          <Stack spacing={5} align="center">
            <Input placeholder="First Name" size="sm" />
            <Input placeholder="Last Name" size="sm" />
            <Input placeholder="Date of Birth" size="sm" />
            <Input
              placeholder="Email address"
              value={input.email}
              onChange={(event) => handleChange("email", event.target.value)}
              size="sm"
            />
            <Input placeholder="Username" size="sm" />
            <Input
              placeholder="Password"
              value={input.password}
              onChange={(event) => handleChange("password", event.target.value)}
              size="sm"
            />
            <Spacer />
            <Spacer />
          </Stack>
          <Stack spacing={5} align="center">
            <Link to={ctaLinkCreate}>
              <Button
                color="primary.150"
                fontWeight="bold"
                borderRadius="8px"
                onClick={handleCreateUser}
                py=""
                px="7"
                bg="primary.3200"
                lineHeight="1"
                size="md"
              >
                {ctaTextCreate}
              </Button>
            </Link>
            <Link to={ctaLinkLogIn}>
              <Button
                color="primary.150"
                borderRadius="8px"
                fontWeight="bold"
                py="4"
                px="7"
                lineHeight="1"
                size="md"
                bg="primary.3200"
              >
                {ctaTextLogIn}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

CreateAccount.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaTextCreate: PropTypes.string,
  ctaTextLogIn: PropTypes.string,
  ctaLinkCreate: PropTypes.string,
  ctaLinkLogIn: PropTypes.string,
};

CreateAccount.defaultProps = {
  title: "Create Account",
  subtitle: "One step closer to a healthier life",
  ctaTextCreate: "Create Account",
  ctaTextLogIn: "Log In Instead",
  ctaLinkCreate: "/homepage",
  ctaLinkLogIn: "/login",
};
