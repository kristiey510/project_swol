import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/sections/Header";
import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  HStack,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { auth, logIn } from "../firebase/firebase";
import errors from "../firebase/errors";

export default function LogIn({
  title,
  subtitle,
  ctaLinkLogIn,
  ctaTextLogIn,
  ctaForgotPass,
  ctaForgotUser,
  ...rest
}) {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errs, setErrs] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      await logIn(auth, input.email, input.password);
    } catch ({ code }) {
      setErrs({ email: "", password: "", ...errors[code] });
    }
  };

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      <Stack
        spacing={10}
        w={{ base: "10%", md: "120%" }}
        mt="10"
        align="center"
      >
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
          lineHeight="1.5"
          textAlign="center"
        >
          {subtitle}
        </Heading>
        <Box w="300px" h="300px" align="center">
          <Stack spacing={5} align="center">
            <Input
              value={input.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="Email"
              size="sm"
            />
            {errs?.email && <Text color="red">{errs?.email}</Text>}
            <Input
              value={input.password}
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="Password"
              type="password"
              size="sm"
            />
            {errs?.password && <Text color="red">{errs?.password}</Text>}
            <Spacer />
            <Spacer />
          </Stack>
          <Stack spacing={5} align="center">
            {/* <Link to={ctaLinkLogIn}> */}
            <Button
              color="primary.150"
              borderRadius="8px"
              fontWeight="bold"
              onClick={handleLogin}
              py="4"
              px="7"
              lineHeight="1"
              size="md"
              bg="primary.3200"
            >
              {ctaTextLogIn}
            </Button>
            {/* </Link> */}
            <Spacer />
          </Stack>
          <HStack align="center">
            <Link to={ctaForgotPass}>
              <Button
                color="primary.150"
                borderRadius="8px"
                fontWeight="bold"
                py="2"
                px="4"
                size="sm"
                bg="primary.3200"
              >
                Forgot Password
              </Button>
            </Link>
            <Link to={ctaForgotUser}>
              <Button
                color="primary.3100"
                borderRadius="8px"
                fontWeight="bold"
                py="2"
                px="4"
                size="sm"
                bg="primary.3200"
              >
                Forgot Username
              </Button>
            </Link>
          </HStack>
        </Box>
      </Stack>
    </Flex>
  );
}

LogIn.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaTextLogIn: PropTypes.string,
  ctaLinkLogIn: PropTypes.string,
  ctaForgotPass: PropTypes.string,
  ctaForgotUser: PropTypes.string,
};

LogIn.defaultProps = {
  title: "Log in",
  subtitle: "One step closer to a healthier life",
  ctaTextLogIn: "Log in",
  ctaLinkLogIn: "/homepage",
  ctaForgotPass: "/forgot_pass",
  ctaForgotUser: "/forgot_user",
};
