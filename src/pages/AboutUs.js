import React from "react";
import PropTypes from "prop-types";
import Header from "../components/sections/LandingHeader";
import { Flex, Heading, Stack } from "@chakra-ui/react";

export default function AboutUs({ title, subtitle, subtitle2, ...rest }) {
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
          <br></br>
          {subtitle2}
        </Heading>
      </Stack>
    </Flex>
  );
}

AboutUs.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitle2: PropTypes.string,
};

AboutUs.defaultProps = {
  title: "About Us",
  subtitle:
    "SWOL is a project created by 7 Emory students, with the goal of encouraging our users to devote time to staying fit and healthy",
  subtitle2: "You can reach us at <placeholder>@<placeholder.com>",
};
