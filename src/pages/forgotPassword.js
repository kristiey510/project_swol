import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  auth,
  sendPasswordResetEmail
} from "../firebase/firebase";
import { ArrowBackIcon } from '@chakra-ui/icons'

export default function ForgotPassword(
  title,
  subtitle,
  ctaLinkLogIn,
  ctaTextLogIn,
  ctaForgotPass,
  ctaForgotUser,
  ...rest
) {

  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setEmail(value);
  };

  const resetPass= async () => {

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("Reset email sent!");
      })
      .catch((error) => {
        setError(error);
    });
  }

  return (
    <Flex
      minH={"100vh"}
      // align={"center"}
      justify={"center"}
    >
      <Stack
        spacing={4}
        w={"full"}
        h = {"full"}
        maxW={"lg"}
        bg = "#FDF2E9"
        rounded={"xl"}
        boxShadow={"lg"}
        p={3}
        my={12}
      >
      <Link to = "./"> 
       <Button color = "primary.2350" ml = "10px" mt = "5px" size = "xs" bg = "transparent" variant = "link">  <ArrowBackIcon /> BACK</Button>
     </Link>
        <Heading
          align = "center"
          mt = "20px"
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
          color="primary.2500"
        >
          Forgot your password?
        </Heading>
        <Text fontSize={{ base: "sm", sm: "md" }} color="primary.2400" align = "center">
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="Email"
            bg = "gray.50"
            type="email"
            onChange={(event) => handleChange(event.target.value)}
          />
        </FormControl>
        <Stack align = "center">
          <Button
            mt = "10px"
            w = "200px"
            bg={"primary.3200"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick = {resetPass}
            mb = "20px"
          >
            Request Reset
          </Button>
          <Text color = "red" fontSize = "xs" > {error} </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
ForgotPassword.propTypes = {
  ctaHomePage: PropTypes.string,
  ctaLogIn: PropTypes.string,
  ctaForgotUser: PropTypes.string,
};

ForgotPassword.defaultProps = {
  ctaLogIn: "/login",
  ctaForgotUser: "/forgot_user",
  ctaHomePage: "/homepage",
};
