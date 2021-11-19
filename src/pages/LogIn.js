import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LandingHeader from "../components/sections/LandingHeader/LandingHeader";
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
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { auth, logIn } from "../firebase/firebase";
import { useForm } from "react-hook-form";
import { ArrowBackIcon } from '@chakra-ui/icons'

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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      await logIn(auth, input.email, input.password);
      window.location = "/dashboard";
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
  };

  return (
    <Flex direction="column" m="0 auto" align = "center">
      <LandingHeader />
      <Box  h = "600px" w = "600px" mt = "25px" boxShadow = "xl" bg = "#FDF2E9" rounded={"xl"} p={3}>
      <Link to = "./"> 
       <Button color = "primary.2350" ml = "10px" mt = "5px" size = "xs" bg = "transparent" variant = "link">  <ArrowBackIcon /> BACK</Button>
     </Link>
      <Stack spacing={10} mt="10" align="center">
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
            <FormControl>
              <Stack spacing={3} align="center">
                <Input
                  bg = "gray.50"
                  rounded = "md"
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
                <InputGroup size="md">
                  <Input
                    bg = "gray.50"
                    rounded = "md"
                    mb="5"
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    value={input.password}
                    {...register("password", {
                      required: "Field is required",
                    })}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    size="sm"
                  />
                  <InputRightElement width="4.3rem">
                    <Button
                      bg = "gray.200"
                      variant="solid"
                      mt="-8px"
                      mr="-7px"
                      h="1.4rem"
                      size = "xs"
                      fontSize="6pt"
                      onClick={handleClick}
                      textTransform ="uppercase"
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage mb="3" fontSize="12px">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <Spacer />
                <Spacer />
              </Stack>
              <Stack spacing={5} align="center">
                <Button
                  ml = "10px"
                  type = "submit"
                  color="primary.150"
                  borderRadius="10px"
                  fontWeight="bold"
                  fontSize="10pt"
                  bg="primary.3200"
                  w="150px"
                  h="32px"
                  lineHeight="1"
                  size="md"
                >
                  {ctaTextLogIn}
                </Button>
                <Spacer />
              </Stack>
            </FormControl>
            <HStack align="center" spacing = "10px">
              <Link to={ctaForgotPass}>
                <Button
                  color="primary.150"
                  borderRadius="10px"
                  fontWeight="bold"
                  fontSize="10pt"
                  bg="primary.3200"
                  w="150px"
                  h="32px"
                  lineHeight="1"
                  size="md"
                >
                  Forgot Password
                </Button>
              </Link>
              <Link to={ctaCreateAccount}>
                <Button
                  color="primary.150"
                  borderRadius="10px"
                  fontWeight="bold"
                  fontSize="10pt"
                  bg="primary.3200"
                  w="150px"
                  h="32px"
                  lineHeight="1"
                  size="md"
                >
                  Create Account
                </Button>
              </Link>
            </HStack>
          </form>
        </Box>
      </Stack>
      </Box>
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
  ctaLinkLogIn: "/dashboard",
  ctaForgotPass: "/forgot_pass",
  ctaCreateAccount: "/signup",
};
