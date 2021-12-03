import React from "react";
import { Text, Box, Button, Flex, Image, HStack } from "@chakra-ui/react";
import { db, updateDoc, doc, arrayRemove } from "../firebase/firebase";

export default function Friend({ user, followers, setFollowers }) {
  const unfollow = async (uid) => {
    await updateDoc(doc(db, "Profile", user.uid), {
      following: arrayRemove(uid),
    }).then(async () => {
      var obj = followers.filter(function (item) {
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
