import React from "react";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import "./Dashboard.css";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function Faq({ user }) {
  return (
    <Flex width="100%" direction="column">
      <Topbar user={user} />
      <Flex direction="row">
        <Box width="370px">
          <Sidebar user={user} />
        </Box>
        <Box w="100%" mt="30px">
          <Heading
            color="primary.2350"
            align="center"
            fontSize="md"
            textTransform="uppercase"
          >
            Frequently asked questions
          </Heading>
          <Box align="center" mt="50px">
            <Accordion
              allowToggle
              w="800px"
              boxShadow="lg"
              rounded={"xl"}
              bg="#FDF2E9"
              border="gray.100"
            >
              <AccordionItem rounded={"xl"}>
                <h2>
                  <AccordionButton rounded={"xl"}>
                    <Box flex="1" textAlign="left">
                      1. What is Swol?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Swol is an all-in-one fitness and social media app, with a
                  goal of staying healthy and connecting with others. It allows
                  you to post about activities of all kinds, and share them with
                  a group of followers. It also has a complete list of exercises
                  so you can use Swol to plan your workout and hit the gym!
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton rounded={"xl"}>
                    <Box flex="1" textAlign="left">
                      2. How can I follow my friends?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  To search for friends to follow, click on the followers tab on
                  the left-hand sidebar. Then, click search and search for your
                  friends by first and last name. Once you follow and they
                  accept, their activities will show up in your feed!
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton rounded={"xl"}>
                    <Box flex="1" textAlign="left">
                      3. Can I edit my profile?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Yes! Click on your profile picture in the top right corner,
                  and navigate to your profile. From there, if you click on the
                  light blue edit button, you can edit features such as height,
                  weight, gender, profile picture, and password.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton rounded={"xl"}>
                    <Box flex="1" textAlign="left">
                      4. I am having trouble uploading images to my post
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  In order to upload images to our website, they need to be in
                  .jpg or .png format. Please convert the image file you are
                  uploading as either .jpg or .png format.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton rounded={"xl"}>
                    <Box flex="1" textAlign="left">
                      5. Have any further questions or concerns?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Send your questions or feedback via
                  https://forms.gle/1jESpBitqYy5bSHX9.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
