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
  HStack,
  Input,
  Spacer,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { auth, logIn } from "../firebase/firebase";
import { useForm } from "react-hook-form";

export default function LogIn({
  title,
  subtitle,
  ctaLinkLogIn,
  ctaTextLogIn,
  ctaForgotPass,
  ctaCreateAccount,
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
      alert(code);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    await handleLogin();
    var state = auth.onAuthStateChanged((user)=> {
        if (state) state();
        if (user){
          window.location = "/dashboard"
        }
    });
    // if (auth.currentUser) window.location = "/dashboard";
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors}>
              <Stack spacing={3} align="center">
                <Input
                  id="email"
                  value={input.email}
                  placeholder="Email"
                  size="sm"
                  {...register("email", {
                    required: "Field is required",
                  })}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                />
                <FormErrorMessage mb="3" fontSize="12px">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
                <Input
                  type="password"
                  id="password"
                  value={input.password}
                  placeholder="Password"
                  size="sm"
                  {...register("password", {
                    required: "Field is required",
                  })}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                />
                <FormErrorMessage mb="3" fontSize="12px">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <Spacer />
                <Spacer />
              </Stack>
              <Stack spacing={5} align="center">
                <Button
                  color="primary.150"
                  borderRadius="8px"
                  fontWeight="bold"
                  type="submit"
                  py="4"
                  px="7"
                  lineHeight="1"
                  size="md"
                  bg="primary.3200"
                >
                  {ctaTextLogIn}
                </Button>
                <Spacer />
              </Stack>
            </FormControl>
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
              <Link to={ctaCreateAccount}>
                <Button
                  color="primary.150"
                  borderRadius="8px"
                  fontWeight="bold"
                  py="2"
                  px="4"
                  size="sm"
                  bg="primary.3200"
                >
                  Create Account
                </Button>
              </Link>
            </HStack>
          </form>
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
  ctaCreateAccount: PropTypes.string,
};

LogIn.defaultProps = {
  title: "Log in",
  subtitle: "One step closer to a healthier life",
  ctaTextLogIn: "Log in",
  ctaLinkLogIn: "/homepage",
  ctaForgotPass: "/forgot_pass",
  ctaCreateAccount: "/signup",
};
