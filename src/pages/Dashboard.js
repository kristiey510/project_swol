import React from "react";
import { Flex } from "@chakra-ui/react";
import FeedHeader from "../components/sections/FeedHeader"

export default function Dashboard() {
  return (

    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
    >

    <FeedHeader/>
    
    </Flex>
   
  );
}
