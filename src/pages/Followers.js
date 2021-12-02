import React, { useState, useEffect } from "react";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import AddFriend from "./AddFriend";
import Friend from "./Friend";
import "./Dashboard.css";
import {
  Flex,
  Box,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import {
  db,
  doc,
  getDoc
} from "../firebase/firebase";

export default function Followers({ user }) {
  console.log(user.uid);

  const [userDoc, setUserDoc] = useState({});

  useEffect(() => {
    async function fetchUserDoc(){
      await getDoc(doc(db, "Profile", user.uid)).then(async (docSnap) => {
        const currUser = docSnap.data();  
        currUser["uid"] = user.uid;
        setUserDoc(currUser);
      });
    }
    fetchUserDoc();
  }, [user.uid]);

  return (
    <Flex width="100%" direction="column">
      <Topbar user={userDoc} />
      <Flex direction="row">
        <Box width="370px">
          <Sidebar user={userDoc} />
        </Box>
        <Box w="100%" mt="30px">
          <Heading
            color="primary.2350"
            align="center"
            fontSize="md"
            textTransform="uppercase"
          >
            Follows
          </Heading>
          <Box align="center" mt="50px">
            <Tabs isLazy isFitted colorScheme="white" variant="enclosed" border = "30pt" borderColor = "gray.50" spacing = "10px">
              <TabList mb="3em">
                <Tab bg="#FDF2E9" color="primary.2350" fontWeight = "bold" fontSize = "xs">FOLLOWING</Tab>
                <Tab ml = "5px" mr = "5px"bg="#FDF2E9" color="primary.2350" fontWeight = "bold" fontSize = "xs">SEARCH</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                    <Friend user = {user}/>
                </TabPanel>
                <TabPanel>
                  <Flex w = "600px" h = "300px" justify = "center" direction = "column" bg="#FDF2E9" borderRadius ="10" boxShadow = "lg">
                  <AddFriend user = {user}/>
                  </Flex>
                </TabPanel>
              </TabPanels>
           </Tabs>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
