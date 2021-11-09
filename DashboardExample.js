import React, { useState, useEffect } from "react"; 
import ReactDOM from 'react-dom';
import { 
  Flex,
  Box,
  Grid,
  GridItem,
  Spacer,
  Center,
  Square,
  Text,
  Divider,
  Stack,
  VStack,
  StackDivider,
  HStack,
  Image
} from "@chakra-ui/react";
import { 
  doc, 
  setDoc, 
  db, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getStorage, 
  ref, 
  uploadBytes, 
  getDoc, 
  getDownloadURL,
  auth, 
  updateDoc,
  arrayUnion,
  query,
  where,
  increment,
  arrayRemove,
  getDocs,
  orderBy
  } from "../firebase/firebase";
import FeedHeader from "../components/sections/FeedHeader"
import { wait } from "@testing-library/react";

export default function Dashboard() {

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  //console.log("og",posts);



  //var postDict = ["Morning run in lullwater","Cool bike ride on the beltline","Swam at the SAAC"]
  //var currentUser = auth.currentUser;
  var currentUser = "Y5sAEElg7cUOAdrswinf8Swrs443"
  //how to make sure user is validated?

  //console.log(currentUser);

  //var currentUser = auth.currentUser;
  //console.log("user",auth.currentUser);

  useEffect(async() => {
    await getDoc(doc(db, "Profile", currentUser)).then(async(docSnap) => {
    if (docSnap.exists()) {
      var postDict = [];
      var count = 0;
      console.log("User data:", docSnap.data());

      const user = docSnap.data();
      //loop through follows

      user.following.forEach((u) => {
        const postQuery = query(collection(db, "test"), where("usr", "==", u));
        getDocs(postQuery).then(querySnapshot => {
          querySnapshot.forEach((doc) => {

            if(doc.data().img != 'no_image_provided'){
            
              console.log("image", doc.data().img);
  
              //get image ref
              const storage = getStorage();
              const pathReference = ref(storage, doc.data().img);
  
              //download, then set attribute to image tag in file
              getDownloadURL(pathReference).then((url) => {
                console.log("url",url)
                setImages(prev => [...prev, url]);
              })
            }
            else{
              setImages(prev => [...prev, null]);
            }


            setPosts(prev => [...prev, doc.data()]);
          });
        })
      })

      // console.log("before", posts);
      // setPosts(postDict);
      // console.log("this2",posts);
      // //return postDict;
    } else {
      console.log("No such document!");
      return [{desc:'no posts'}];
    }
    })
    
  }, [])

  //var postDict = []


  //var postDict = ["no posts","hi"];

  //console.log("we got posts", postDict);
  console.log("this",posts);



    return(
     <Flex>
    <VStack>
    <FeedHeader/>

    <VStack>
      {posts.map((post,index) => (
        <Box key = {index} border = "1px" h="300px" w="500px">
          <Text> title: {post?.title}</Text>
          <Text> type: {post?.type}</Text>
          <Text> desc: {post?.desc}</Text>
          <Text>user: {post?.usr}</Text>
          <Text>likes: {post?.likes}</Text>
          <Text>imgName: {post?.img}</Text>
          {/* <Text>timestamp: {post?.timestamp}</Text> */}
          <center>
          {console.log("index, image: ", index, images[index])}
          {post.img != 'no_image_provided' ? 
           <Image
           boxSize="150px"
           objectFit="cover"
           id = {index}
           src= {images[index]}
           alt="no image"
         /> 
         :
            <Text></Text> }
        </center>
        </Box>
      ))}
    </VStack>
    </VStack>
    </Flex> 
    );
}