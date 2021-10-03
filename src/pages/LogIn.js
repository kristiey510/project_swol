import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {Box, Button, Flex, Heading, Stack, HStack, Input, Spacer} from "@chakra-ui/react";
import Logo from "../components/ui/Logo";

export default function LogIn({
  title,
  subtitle, 
  ctaLinkLogIn,
  ctaTextLogIn,
  ctaForgotPass,
  ctaForgotUser,
  ...rest
}) {
  return (
    <Flex
      align = "flex-start"
      ml = "5"
      mt = "2"
      pt = "2"
      pr = "2"
      minH = "30vh"
      {...rest}
    >
      <Link to = "./">
          <Button
            color = "primary.150"
            fontWeight = "bold"
            lineHeight = "1"
            size = "sm"
            bgColor = "transparent"
            variant ="link"
          >
            <Logo
            w = "100px"
            color = "primary.2400"
            />
          </Button>
        </Link>
      <Spacer/>
      <Stack 
        spacing = {10}
        w = {{ base: "10%", md: "120%"}}
        mt = "20"
        align = "center">
        <Heading
          as = "h1"
          size = "2xl"
          fontWeight = "bold"
          color = "primary.2500"
          textAlign = "center"
        >
          {title}
        </Heading>
        <Heading
          as = "h2"
          size = "md"
          color = "primary.2400"
          opacity = "0.8"
          fontWeight = "bold"
          lineHeight = "1.5"
          textAlign = "center"
        >
          {subtitle}
        </Heading>
        <Box w = "300px" h = "300px" align = "center">
          <Stack spacing = {5} align = "center">
            <Input placeholder = "Username" size = "sm" />
            <Input placeholder = "Password" size = "sm" />
            <Spacer/>
            <Spacer/>
          </Stack>
         <Stack spacing = {5} align = "center">
           <Link to = {ctaLinkLogIn}>
            <Button
              color = "primary.150"
              borderRadius = "8px"
              fontWeight = "bold"
              py = "4"
              px = "7"
              lineHeight = "1"
              size = "md" 
              bg = "primary.3200"
            >
              {ctaTextLogIn}
            </Button>
          </Link>
         <Spacer/>
        </Stack>
        <HStack align = "center"> 
          <Link to = {ctaForgotPass}>
            <Button
              color = "primary.150"
              borderRadius ="8px"
              fontWeight = "bold"
              py = "2"
              px = "4"
              size = "sm"
              bg = "primary.3200"
            >
              Forgot Password
            </Button>
          </Link>
          <Link to = {ctaForgotUser}>
            <Button
              color = "primary.150"
              borderRadius = "8px"
              fontWeight = "bold"
              py = "2"
              px = "4"
              size = "sm"
              bg = "primary.3200"
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
  title: "Log in" ,
  subtitle: "One step closer to a healthier life",
  ctaTextLogIn: "Log in",
  ctaLinkLogIn: "/homepage",
  ctaForgotPass: "/forgot_pass",
  ctaForgotUser: "/forgot_user",
};
