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
  Image,
  HStack,
  Button
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
  getDoc,
    arrayRemove
} from "../firebase/firebase";

export default function Followers({ user }) {
  const [followers, setFollowers] = useState([]);
  const [userDoc, setUserDoc] = useState({});

  useEffect(async () => {
      await getDoc(doc(db, "Profile", user.uid)).then(async (docSnap) => {
        var new_obj = {}; 
        const currUser = docSnap.data();  
        currUser["uid"] = user.uid;
        setUserDoc(currUser);
        console.log(userDoc);
        await currUser.following?.forEach(async (u) => {
           getDoc(doc(db, "Profile", u)).then((docSnap) => {
            const storage = getStorage();
            const info = docSnap.data();  
            try{
              const pathReference = ref(storage, info.Picture_id)
              getDownloadURL(pathReference).then((url) => {
              new_obj = { uid: u,  name: info.Name , imgUrl: url};  
              setFollowers(prev => [...prev, new_obj]);
            });
            }catch (error){
              console.log(error);
            }
          });
      });
    });
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
                    <Flex wrap = "wrap" justify = "space-evenly" mt = "-30px">
                   {followers.map((item, index) => (
                   <Friend key = {index} user = {user} uid = {item.uid} name = {item.name} image = {item.imgUrl}/>
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
