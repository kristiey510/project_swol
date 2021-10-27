import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/sections/Header";
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Input,
  Spacer,
  Text,
  Textarea,
  Select,
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
  } from "../firebase/firebase";
import { file } from "@babel/types";

//function name needs to be capitalized
export default function TestPost({
  title,
  subtitle,
  subtitle2,
  title2,
  ctaTextCreate,
  showPostTest,
  postTitle,
  Like,
  ...rest
}) {
    const [input, setInput] = useState({ title: "", type: "" , desc: ""});
    const [image , setImage] = useState(null);
    const [display, setDisplay] = useState({id: ""});
    const [realPostTitle, setMyText] = useState("");
    const [postDesc, setMyText2] = useState("");
    const [postType, setType] = useState("");
    const [Error, setError] = useState("");
    const [LikeNoti, setLN] = useState("");


    const handleChange = (name, value) => {
        setInput((prev) => ({ ...prev, [name]: value }));
    };
    const handleDisplay = (name, value) => {
      setDisplay((prev) => ({ ...prev, [name]: value }));
  };
    const handleMakePost = () => {
        //check user
        var user = auth.currentUser;
        //if no user
        if(!user){
          return;
        }

        //validate image size
        if(image != null){
          console.log(image);
          if(image.size > 5000000){
            console.log("image too large")
            setError("Error: File too large");
            return;
          }
          //validate image filetype
          const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
          if(!acceptedImageTypes.includes(image.type)){
            console.log("wrong file type:",image.type);
            setError("Error: Not a JPG or PNG");
            return;
          }

        }
        //reset error on success
        setError("");

        console.log("user: ", user.uid)
        //default filename (sticks if empty)
        var filename = 'no_image_provided'
        if(image != null){
            //old way
            //filename = image.name
            //need to npm install uuid
            filename = uuidv4()
        }
        addDoc(collection(db, "test"),{
            title: input.title,
            type: input.type,
            desc: input.desc,
            timestamp: serverTimestamp(),
            img: filename,
            usr: user.uid,
            //no likes for now
            likes: 0
        });
        //no image log
        if(image == null){
          console.log("no image provided")
          return;
        }

        //size in bytes
        console.log("size:", image.size)

        //image type
        console.log("type:", image.type)

        //upload file
        const storage = getStorage();
        const imageRef = ref(storage, filename);
        uploadBytes(imageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    };

    const handleDisplayPost = () => {
      //console log for testing
      console.log('Searching for post:');
      console.log(display.id);

      //check if doc exists
      //https://stackoverflow.com/questions/69530622/firestore-unable-to-read-document-data-uncaught-typeerror-docsnap-exists-is-n
      getDoc(doc(db, "test", display.id)).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const data = docSnap.data();
          setMyText("Title: " + data.title);
          setMyText2("Description: " + data.desc);
          setType("Type: " + data.type);

          //image handling

          const img = document.getElementById('img');
          //no image
          if(data.img == 'no_image_provided'){
            //sets to no image
            img.setAttribute('src', "");
            return;
          }
          console.log("image", data.img);

          //get image ref
          const storage = getStorage();
          const pathReference = ref(storage, data.img);

          //download, then set attribute to image tag in file
          getDownloadURL(pathReference)
          .then((url) => {
            img.setAttribute('src', url);
          })
          
        } else {
          console.log("No such document!");
        }
      })
    }

    const handleLike = () => {
      setLN("");
      var alreadyLiked = false;
      var user = auth.currentUser;
      //if no user
      if(!user){
        console.log("No user");
        return;
      }
      console.log('Searching for post to like:');
      console.log(display.id);


      getDoc(doc(db, "test", display.id)).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const data = docSnap.data(); 
          //loop through array 
          for(let i = 0; i<data.likes;i++){
            //if the user has already liked it
            if(data.likers[i] == user.uid){
              console.log("already liked")
              alreadyLiked = true;
            }
          }   
          const docRef = doc(db, "test", display.id)

          console.log(alreadyLiked)
          //like post
          if(alreadyLiked == false){
            console.log("like")
            setLN("Liked Post");
            updateDoc(docRef, {
              likers: arrayUnion(user.uid),
              likes: increment(1)
            });
          }
          //unlike post
          else{
            console.log("unlike");
            setLN("Unliked Post");
            updateDoc(docRef, {
              likers: arrayRemove(user.uid),
              likes: increment(-1)
            });
          }
          
        } 
        else {
          console.log("No such document!");
        }
      })
    


    }

    return (
      <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      <Stack
        spacing={10}
        w={{ base: "10%", md: "120%" }}
        mt="10"
        align="center"
      >
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          color="primary.2500"
          textAlign="center"
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.2400"
          opacity="0.8"
          fontWeight="bold"
          lineHeight="1.5"
          textAlign="center"
        >  
        <Input
            placeholder="Post Title"
            value={input.title}
            onChange={(event) => handleChange("title", event.target.value)}
            size="sm"
        />
        <Spacer />
        <Spacer />
        <Input
            placeholder="Type of Exercise"
            value={input.type}
            onChange={(event) => handleChange("type", event.target.value)}
            size="sm"
        />

        {/* still working on changing to dropdown */}
        {/* <Select placeholder="Select option" 
            onChange={(event) => handleChange("desc", event.target.value)} >
            value={input.type}
            <option value="option1">Run</option>
            <option value="option2">Bike</option>
            <option value="option3">Lift</option>   
        </Select> */}

        <Textarea
            value={input.desc} 
            onChange={(event) => handleChange("desc", event.target.value)} 
            placeholder="Describe your activity" 
            size="sm"/>
        <Spacer />
        <Spacer />

        {/* Input image */}
        <input 
            type="file" 
            onChange={(event)=>{setImage(event.target.files[0])}}/>

        <Button
                color="primary.150"
                fontWeight="bold"
                borderRadius="8px"
                onClick={handleMakePost}
                py=""
                px="7"
                bg="primary.3200"
                lineHeight="1"
                size="md"
              >
                {ctaTextCreate}
              </Button>

        <Heading
          as="h6"
          color="red"
          textAlign="center"
        >
          {Error}
        </Heading>
            
        <br></br>
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          color="primary.2500"
          textAlign="center"
        >
          {title2}
        </Heading>

        <Input
            placeholder="Post ID"
            value={display.id}
            onChange={(event) => handleDisplay("id", event.target.value)}
            size="sm"
        />
        <Button
                color="primary.150"
                fontWeight="bold"
                borderRadius="8px"
                onClick={handleDisplayPost}
                py=""
                px="7"
                bg="primary.3200"
                lineHeight="1"
                size="md"
              >
                {showPostTest}
            </Button>

        <Heading
          as="h6"
          color="primary.3100"
          textAlign="center"
        >
          {realPostTitle}
        </Heading>
        <Heading
          as="h6"
          color="primary.3100"
          textAlign="center"
        >
          {postType}
        </Heading>
        <Heading
          as="h6"
          color="primary.3100"
          textAlign="center"
        >
          {postDesc}
        </Heading>

        <center>
        <Image
          boxSize="150px"
          objectFit="cover"
          id = 'img'
          src=""
          alt="no image"
        />
        </center>
        <Button
                color="primary.150"
                fontWeight="bold"
                borderRadius="8px"
                onClick={handleLike}
                py=""
                px="7"
                bg="primary.3200"
                lineHeight="1"
                size="md"
              >
                {Like}
            </Button>
            <Heading
          as="h6"
          color="red"
          textAlign="center"
        >
          {LikeNoti}
        </Heading>
        
        </Heading>
        </Stack>
        </Flex>
    );
  }

    TestPost.propTypes = {
    title: PropTypes.string,
    title2: PropTypes.string,
    ctaTextCreate: PropTypes.string,
    showPostTest: PropTypes.string,
    postTitle: PropTypes.string,
    Error: PropTypes.string,
    Like: PropTypes.string,
    LikeNoti: PropTypes.string
  };

  TestPost.defaultProps = {
    title: "Make Post",
    ctaTextCreate: "Create Post",
    title2: "Display Post",
    showPostTest: "Display Post",
    postTitle: "None",
    Error: "",
    Like: "Like/Unlike",
    LikeNoti: ""
  };
