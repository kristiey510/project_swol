import React from "react";
import girl1 from "../../icons/user/girl_4.png";
import guy1 from "../../icons/user/guy_4.png";
import weights from "../../icons/landing_page/weights.png";
import run from "../../icons/landing_page/running.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function StartingPage({
  title,
  subtitle,
  ctaLinkCreate,
  ctaLinkLogIn,
  ctaTextCreate,
  ctaTextLogIn,
  ...rest
}) {
  return (
    <Flex
      mt = "20px"
      align="center"
      justify={{ base: "center", md: "space-around", xl: "center" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="80vh"
      mb={20}
      {...rest}
    >
      <Stack spacing="70px">
        <HStack spacing="30px">
          <Spacer />
          <Spacer />
          <Box w="300px" bg="transparent">
            <Image
              src={run}
              backgroundColor="transparent"
              w="200px"
              h="200px"
            />
          </Box>
          <Box
            w={{ base: "80%", sm: "60%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
          >
            <Image
              src={girl1}
              backgroundColor="transparent"
              h="200px"
              w="170px"
            />
          </Box>
        </HStack>
        <HStack spacing="30px">
          <Spacer />
          <Spacer />
          <Box w="300px">
            <Image
              src={guy1}
              backgroundColor="transparent"
              h="200px"
              w="170px"
            />
          </Box>
          <Box w="300px" bg="transparent">
            <Image
              src={weights}
              backgroundColor="transparent"
              w="200px"
              h="200px"
            />
          </Box>
        </HStack>
        <Spacer />
      </Stack>
      <Stack spacing={10} w={{ base: "80%", md: "50%" }} align="center">
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
        <Link to={ctaLinkCreate}>
          <Button
            color="primary.150"
            fontWeight="bold"
            borderRadius="8px"
            py="4"
            px="7"
            bg="primary.3200"
            lineHeight="1"
            size="lg"
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
            size="lg"
            bg="primary.3200"
          >
            {ctaTextLogIn}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt="2"
          fontWeight="bold"
          textAlign="center"
          color="primary.2300"
        >
          Free to sign up.
        </Text>
      </Stack>
    </Flex>
  );
}

StartingPage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaTextCreate: PropTypes.string,
  ctaTextLogIn: PropTypes.string,
  ctaLinkCreate: PropTypes.string,
  ctaLinkLogIn: PropTypes.string,
};

StartingPage.defaultProps = {
  title: "Keeping track of your health.",
  subtitle: "Connect with friends and track your health",
  ctaTextCreate: "Create Account",
  ctaTextLogIn: "Log in",
  ctaLinkCreate: "/signup",
  ctaLinkLogIn: "/login",
};
