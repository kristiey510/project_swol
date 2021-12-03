import React, { useState, useEffect } from "react";
import { Text, Box, Button, Flex, Image, HStack } from "@chakra-ui/react";
import {
  db,
  updateDoc,
  doc,
  getStorage,
  getDownloadURL,
  ref,
  getDoc,
  arrayRemove,
} from "../firebase/firebase";

export default function Friend({ user }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function fetchUserDoc() {
      var new_obj = {};
      await user.following?.forEach(async (u) => {
        if (u !== user.uid) {
          getDoc(doc(db, "Profile", u)).then((docSnap) => {
            const storage = getStorage();
            const info = docSnap.data();
            try {
              const pathReference = ref(storage, info.Picture_id);
              getDownloadURL(pathReference).then((url) => {
                new_obj = { uid: u, name: info.Name, imgUrl: url };
                setFollowers((prev) => [...prev, new_obj]);
              });
            } catch (error) {}
          });
        }
      });
    }
    fetchUserDoc();
  }, [user.uid, user.following]);

  const unfollow = async (uid) => {
    console.log(user.uid);
    await updateDoc(doc(db, "Profile", user.uid), {
      following: arrayRemove(uid),
    }).then(async () => {
      var obj = followers.filter(function (item, idx) {
        return item.uid !== uid;
      });
      setFollowers(obj);
    });
  };

  return (
    <Flex wrap="wrap" justify="space-evenly" mt="-30px">
      {followers.map((item, index) => (
        <Box
          key={index}
          bg="#FDF2E9"
          mt="20px"
          mb="20px"
          ml="20px"
          mr="20px"
          w="250px"
          h="150px"
          px="20px"
          py="15px"
          borderRadius="10"
          boxShadow="md"
        >
          <HStack spacing={10}>
            <Box>
              <Image src={item.imgUrl} w="100px" h="80px" borderRadius="10" />
              <Text mt="10px" fontSize="sm" align="center">
                {item.name}
              </Text>
            </Box>
            <Button
              color="white"
              bg="primary.3200"
              p="10px"
              size="xs"
              onClick={() => unfollow(item.uid)}
              fontSize="6pt"
              fontWeight="bold"
            >
              UNFOLLOW
            </Button>
          </HStack>
        </Box>
      ))}
    </Flex>
  );
}
