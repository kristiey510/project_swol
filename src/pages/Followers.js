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
  Text,
  Container
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

  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    await getDoc(doc(db, "Profile", user.uid)).then(async (docSnap) => {
        var new_obj = {}; 
        const currUser = docSnap.data();  
        await currUser.following?.forEach(async (u) => {
          await getDoc(doc(db, "Profile", u)).then(async (docSnap) => {
            const storage = getStorage();
            const pathReference = ref(storage, docSnap.data().Picture_id);
            getDownloadURL(pathReference).then((url) => {
              new_obj = { uid: u,  name: docSnap.data().Name , imgUrl: url};  
              setFollowers(prev => [...prev, new_obj]);
            });
          });
      });
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
            <Tabs isLazy isFitted colorScheme="white" variant="enclosed" border = "30pt" borderColor = "gray.50" spacing = "10px">
              <TabList mb="3em">
                <Tab bg="#FDF2E9" color="primary.2350" fontWeight = "bold" fontSize = "xs">FOLLOWING</Tab>
                <Tab ml = "5px" mr = "5px"bg="#FDF2E9" color="primary.2350" fontWeight = "bold" fontSize = "xs">SEARCH</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                    <Flex wrap = "wrap" justify = "space-evenly" mt = "-30px">
                   {followers.map((item, index) => (
                    <Friend key = {index} user = {user} uid = {item.uid} name = {item.name} image = {item.imgUrl} />
                   ))}
                    </Flex>
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
