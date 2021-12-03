import React, { useState, useEffect } from "react";
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
  getStorage,
  getDownloadURL,
  ref,
  getDoc,
  arrayRemove, 
  getDocs,
  query,
  collection,
  orderBy,
  where
} from "../firebase/firebase";

export default function FollowedBy({user}) {

const [follows, setFollows] = useState([]);


  useEffect(() => {
     async function fetchFollowedBy(){
       const optionVals = [];
       var new_obj = {};
       const querySnapshot = await getDocs(
        query(collection(db, "Profile"), where("following", "array-contains", user.uid))
      );
       querySnapshot.forEach(async (doc) => {
        if (doc.data().User_id !== user.uid){
            const storage = getStorage();
            const info = doc.data();  
            try{
              const pathReference = ref(storage, info.Picture_id)
              getDownloadURL(pathReference).then((url) => {
              new_obj = { uid: info.User_id,  name: info.Name , imgUrl: url};  
              setFollows(prev => [...prev, new_obj]);
              });
            }catch (error){
            }
        }
       });
     }
   fetchFollowedBy();
  }, []);

  const unfollow = async (uid) => {
     await updateDoc(doc(db, "Profile", uid), {
      following: arrayRemove(user.uid)
    }).then(async () =>{
     var obj = follows.filter(function(item, idx) {
          return item.uid !== uid;
      });
      await setFollows(obj);
    }
   )
}


return (
    <Flex wrap = "wrap" justify = "space-evenly" mt = "-30px">
    {follows.map((item, index) => (
      <Box key = {index} bg="#FDF2E9" mt = "20px" mb = "20px" ml = "20px" mr = "20px" w = "250px" h = "150px" px = "20px" py = "15px" borderRadius= "10" boxShadow = "md">
        <HStack spacing = {10}>
        <Box>
          <Image src = {item.imgUrl} w = "100px" h = "80px" borderRadius= "10"/>
          <Text mt = "10px" fontSize = "sm" align = "center"> {item.name} </Text>
        </Box>
        <Button color = "white" bg = "#EE7C6A" p = "10px" size = "xs" onClick = {() => unfollow(item.uid)} fontSize = "6pt" fontWeight = "bold"> DELETE</Button>
        </HStack>
      </Box>
     ))}
    </Flex>
  );
}