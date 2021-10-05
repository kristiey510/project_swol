import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "../components/sections/Header";
import StartingPage from "../components/sections/StartingPage";

export default function Landing() {
  return (

    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
    >
      <Header />
      <StartingPage />
    </Flex>
   
  );
}
