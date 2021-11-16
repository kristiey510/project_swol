import React from "react";
import { Flex } from "@chakra-ui/react";
import LandingHeader from "../components/sections/LandingHeader/LandingHeader";
import StartingPage from "../components/sections/StartingPage";

export default function Landing() {
  return (
    <Flex direction="column" m="0 auto" align = "center" >
      <LandingHeader />
      <StartingPage />
    </Flex>
  );
}
