import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/sections/Header";
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
  Select
} from "@chakra-ui/react";
import { doc, setDoc, db, collection, addDoc, serverTimestamp, getStorage, ref, uploadBytes } from "../firebase/firebase";
import { file } from "@babel/types";

//function name needs to be capitalized
export default function TestPost({
  title,
  subtitle,
  subtitle2,
  ctaTextCreate,
  ...rest
}) {
    const [input, setInput] = useState({ title: "", type: "" , desc: ""});
    const [image , setImage] = useState(null);
    const handleChange = (name, value) => {
        setInput((prev) => ({ ...prev, [name]: value }));
    };
    const handleMakePost = () => {
        //need to hash filenames somehow to get unique id
        var filename = 'none'
        if(image != null){
            
            filename = image.name
        }
        addDoc(collection(db, "test"),{
            title: input.title,
            type: input.type,
            desc: input.desc,
            img: filename,
            timestamp: serverTimestamp()
        });
        //upload
        //console.log(image)
        //console.log(typeof image);
        if(image == null)
          return;
        const storage = getStorage();
        const imageRef = ref(storage, filename);
        uploadBytes(imageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    };


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

        </Heading>
        </Stack>
        </Flex>
    );
  }

    TestPost.propTypes = {
    title: PropTypes.string,
    ctaTextCreate: PropTypes.string
  };

  TestPost.defaultProps = {
    title: "Make Post",
    ctaTextCreate: "Create Post"
  };