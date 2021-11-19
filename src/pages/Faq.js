import React from "react";
import Feed from "../components/sections/Feed/Feed";
import Rightbar from "../components/sections/Rightbar/Rightbar";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import "./Dashboard.css";
import {Flex, 
        Container,
        Accordion,
        AccordionItem,
        AccordionButton,
        AccordionPanel,
        AccordionIcon,
        Box,
        Heading,
        Input
} from "@chakra-ui/react";

export default function Faq({ user }) {
  return (
        <Flex width = "100%" direction = "column">
        <Topbar user = {user}/>
        <Flex direction = "row">
          <Box width = "370px">
          <Sidebar user = {user}/>
          </Box>
          <Box w = "100%" mt = "30px" > 
          <Heading color = "primary.2350" align = "center" fontSize = "md" textTransform = "uppercase"> Frequently asked questions </Heading>
          <Box align = "center" mt = "50px"> 
          <Accordion allowToggle w = "800px" boxShadow="lg" rounded={"xl"} bg = "#FDF2E9" border = "gray.100">
            <AccordionItem rounded={"xl"}>
              <h2>
                <AccordionButton rounded={"xl"}>
                  <Box flex="1" textAlign="left" >
                    1. Question 1
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Answer to q1
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton rounded={"xl"}>
                  <Box flex="1" textAlign="left">
                    2. Question 2
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Answer to q2
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton rounded={"xl"}>
                  <Box flex="1" textAlign="left">
                    3. Question 3
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Answer to q3
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton rounded={"xl"}>
                  <Box flex="1" textAlign="left">
                    4. Question 4
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Answer to q4
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton rounded={"xl"}>
                  <Box flex="1" textAlign="left">
                    5. Question 5
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Answer to q5
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          </Box>
          </Box>

          </Flex>
        </Flex>
  );
}
