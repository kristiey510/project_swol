import React, { useState, useEffect } from "react";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import AddFriend from "./AddFriend";
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
  Text
} from "@chakra-ui/react";
import {
  db,
  collection,
  auth,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  arrayUnion,
  getStorage,
  getDownloadURL,
  ref,
  getDoc
} from "../firebase/firebase";

export default function Followers({ user }) {
  const [followers, setFollowers] = useState([]);

  useEffect(async () => {
    await getDoc(doc(db, "Profile", auth.currentUser.uid)).then(async (docSnap) => {
      if (docSnap.exists()) {
        const currUser = docSnap.data();     
        currUser.following?.forEach((u) => {
          getDoc(doc(db, "Profile", u)).then((docSnap) => {
            console.log(docSnap.data().Name);
            followers.push({ name: docSnap.data().Name , pic: docSnap.data().Picture_id })     
          });
        });
      }
      console.log(followers);
    });
  }, []);



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
            Followers
          </Heading>
          <Box align="center" mt="50px">
            <Tabs isFitted colorScheme="white" variant="enclosed" border = "30pt" borderColor = "gray.50" spacing = "10px">
              <TabList mb="3em">
                <Tab bg="#FDF2E9" color="primary.2350" fontWeight = "bold" fontSize = "xs">FOLLOWING</Tab>
                <Tab ml = "5px" mr = "5px"bg="#FDF2E9" color="primary.2350" fontWeight = "bold" fontSize = "xs">SEARCH</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {followers.map((item, index) => (
                    <Text key = {index} >{item.name}</Text>
                   ))}
                </TabPanel>
                <TabPanel>
                  <AddFriend user = {user}/>
                </TabPanel>
              </TabPanels>
           </Tabs>
            
              
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
