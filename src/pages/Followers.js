import React, { useEffect, useState } from "react";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Topbar from "../components/sections/Topbar/Topbar";
import AddFriend from "./AddFriend";
import Following from "./Following";
import FollowedBy from "./FollowedBy";
import "./Dashboard.css";
import {
  db,
  doc,
  getStorage,
  getDownloadURL,
  ref,
  getDoc,
} from "../firebase/firebase";
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

export default function Followers({ user }) {
  const [followed, setFollowed] = useState([]);
  useEffect(() => {
    async function fetchFollowed() {
      var new_obj = {};
      await user.following?.forEach(async (u) => {
        if (u !== user.uid) {
          const docSnap = await getDoc(doc(db, "Profile", u));
          const storage = getStorage();
          const info = docSnap.data();
          try {
            const pathReference = ref(storage, info.Picture_id);
            getDownloadURL(pathReference).then((url) => {
              new_obj = { uid: u, name: info.Name, imgUrl: url };
              setFollowed((prev) => [...prev, new_obj]);
            });
          } catch (error) {}
        }
      });
    }
    fetchFollowed();
  }, [user.uid, user.following]);

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
            Follows
          </Heading>
          <Box align="center" mt="50px">
            <Tabs
              isLazy
              isFitted
              colorScheme="grey"
              variant="enclosed"
              border="30pt"
              borderColor="gray.50"
              spacing="10px"
            >
              <TabList mb="3em">
                <Tab
                  bg="#FDF2E9"
                  color="primary.2350"
                  fontWeight="bold"
                  fontSize="xs"
                >
                  FOLLOWING
                </Tab>
                <Tab
                  ml="5px"
                  bg="#FDF2E9"
                  color="primary.2350"
                  fontWeight="bold"
                  fontSize="xs"
                >
                  FOLLOWERS
                </Tab>
                <Tab
                  ml="5px"
                  mr="5px"
                  bg="#FDF2E9"
                  color="primary.2350"
                  fontWeight="bold"
                  fontSize="xs"
                >
                  SEARCH
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Following
                    user={user}
                    followed={followed}
                    setFollowed={setFollowed}
                  />
                </TabPanel>
                <TabPanel>
                  <FollowedBy user={user} />
                </TabPanel>
                <TabPanel>
                  <Flex
                    w="600px"
                    h="300px"
                    justify="center"
                    direction="column"
                    bg="#FDF2E9"
                    borderRadius="10"
                    boxShadow="lg"
                  >
                    <AddFriend user={user} setFollowed={setFollowed} />
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
