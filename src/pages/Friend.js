import React from "react";

import {
  Text,
  Box,
  Button,
  Flex,
  Image,
  HStack
} from "@chakra-ui/react";
import {
  db,
  updateDoc,
  doc,
  arrayRemove
} from "../firebase/firebase";

export default function Friend({user, uid, name, image}) {

const unfollow = async () => {
  console.log(user.uid);
  await updateDoc(doc(db, "Profile", user.uid), {
      following: arrayRemove(uid)
    }).then(async () =>{
      window.location.reload();
    }
   )
}


return (
  <Box bg="#FDF2E9" mt = "20px" mb = "20px" ml = "20px" mr = "20px" w = "250px" h = "150px" px = "20px" py = "15px" borderRadius= "10" boxShadow = "md">
    <HStack spacing = {10}>
    <Box>
      <Image src = {image} w = "100px" h = "80px" borderRadius= "10"/>
      <Text mt = "10px" fontSize = "sm" align = "center"> {name} </Text>
    </Box>
    <Button color = "white" bg = "primary.3200" p = "10px" size = "xs" onClick = {unfollow} fontSize = "6pt" fontWeight = "bold"> UNFOLLOW</Button>
    </HStack>
  </Box>
  );
}