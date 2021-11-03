import React from "react";
import { Flex , Spacer} from "@chakra-ui/react";
import Header from "../components/sections/Header";
import StartingPage from "../components/sections/StartingPage";

export default function Landing() {
  return (

    <Flex
      direction="column"
      m="0 auto"
    >
      <Header />
      <StartingPage />
    </Flex>
   
  );
}
