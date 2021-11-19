import React from "react";
import { Flex,
Box,
HStack,
VStack } from "@chakra-ui/react";
import Topbar from "../components/sections/Topbar/Topbar";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Feed from "../components/sections/Feed/Feed";

export default function PersonalLog({user}) {
    return (
        <flex><Topbar user={user}/>
        <Box bg="orange" w="75%" p={10} color="white" textAlign="center">
  Sunday, November 7, 2021: Distance: 4 miles, type: run
</Box>
<Box bg="white" w="75%" p={10} color="black" textAlign="center">
  Monday, November 8, 2021: Day off. 
</Box>
<Box bg="orange" w="75%" p={10} color="white" textAlign="center">
  Tuesday, November 9, 2021: Distance: 6 miles, type: bike
</Box>
<Box bg="white" w="75%" p={10} color="black" textAlign="center">
  Wednesday, November 10, 2021: Distance: 3 miles, type: run
</Box>
<Box bg="orange" w="75%" p={10} color="white" textAlign="center">
  Thursday, November 11, 2021: Distance: 0, type: lift
</Box>
<Box bg="white" w="75%" p={10} color="black" textAlign="center">
  Friday, November 12, 2021: Distance: 1.5 miles, type: swim
</Box>
<Box bg="orange" w="75%" p={10} color="white" textAlign="center">
  Saturday, November 13, 2021: Day off. 
</Box>
<Box bg="white" w="75%" p={10} color="black" textAlign="center">
  Totals: 5 activities, 14.5 miles of types bike, run, and swim. Great work!
</Box>


</flex>
    );
  }