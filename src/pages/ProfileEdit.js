import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import FeedHeader from "../components/sections/FeedHeader";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Input,
  Text,
  Spacer,
  VStack, 
  HStack,
  Button,
  Radio, 
  RadioGroup,
  useColorModeValue,
  Editable, EditableInput, EditablePreview, IconButton, ButtonGroup, InputGroup, InputLeftAddon
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { doc, setDoc, db, collection, addDoc, updateDoc, auth, getDoc} from "../firebase/firebase";
import {EditIcon, CheckIcon} from "@chakra-ui/icons"


export default function ProfileEdit(){

const [input, setInput] = useState({name: "", dob: "", gender: "" , weight: "", height_in: "" , height_ft: ""});


useEffect(async () => {
      await getDoc(doc(db, "Profile", auth.currentUser.uid)).then(async(docSnap) => {
        if (docSnap.exists()) {
          const data = await docSnap.data();
          await setInput({name: data.Name,height_in : data.Height_In, height_ft: data.Height_Ft, gender: data.Gender, weight: data.Weight});
          console.log("Done with data update")
        }
       });
    }, [])

function EditableControls({ isEditing, onSubmit, onEdit}) {
return isEditing ? (
	<ButtonGroup px = "18px" py = "3px" size = "sm"> 
    <IconButton colorScheme="myblue" icon={<CheckIcon />} onClick={onSubmit} />
  </ButtonGroup>
) : (
	<Flex px = "15px" justify = "left">
    <IconButton colorScheme="myblue" aria-label="Edit" size="sm" icon={<EditIcon />} onClick={onEdit} />
  </Flex>
);
};
const handleChange = async(name, value) => { 
   await setInput((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async() => {
   await updateDoc(doc(db, "Profile", "iu90wX9I0cfI7w1KNrMBVfWxFF82"),{
      Name: input.name,
      Height_Ft: input.height_ft,
      Height_In: input.height_in,
      Gender: input.gender,
      Weight: input.weight
    });
};

return (
	<Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="auto" > 
		<FeedHeader/>
		<Box rounded={'xl'} mt = "38" w = "680px" h = "600" > 
			<Heading mt = "5" align = "center" color = "primary.2350"> Profile Update </Heading>
			<InputGroup mt = "10" ml = "20px">
    			<InputLeftAddon color = "primary.150" fontSize = "md" fontWeight = "extrabold" w = "100px" bg= "primary.3200" ml = "5" mr = "2"> Name </InputLeftAddon>
    			<Editable	
            id = "name"
            fontSize = "md"
            value = {input.name}
        		isPreviewFocusable={false}
            onChange={(nextValue) => handleChange("name", nextValue)}
            onSubmit = {handleSubmit}
    			>	
		      {props => (
		        <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "420" maxW= "420" minH = "9" maxH = "9"/>
              <EditableInput textAlign = "center" minW = "420" maxW= "420" minH = "9" maxH = "9"/>
		          <EditableControls {...props} />
		        </HStack>
		      )}
    		</Editable>
  			</InputGroup>
        <Flex  >
        <InputGroup mt = "10" ml = "20px"  >
          <InputLeftAddon align = "center" color = "primary.150" fontSize = "15" fontWeight = "extrabold" w = "100px"  bg= "primary.3200" ml = "5" mr = "2"> Height (Ft)</InputLeftAddon>
          <Editable  
          fontSize = "md"
          value = {input.height_ft}
          isPreviewFocusable={false}
          onChange={(nextValue) => handleChange("height_ft", nextValue)}
          onSubmit = {handleSubmit}
          >  
          {props => (
            <HStack  >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "100px" maxW= "100px" minH = "9" maxH = "9"/>
              <EditableInput variant= "filled" textAlign = "center" minW = "100px" maxW= "100px" minH = "9" maxH = "9"/>
              <EditableControls {...props} />
            </HStack>
          )}
        </Editable>
        </InputGroup>
        <InputGroup  mt = "10" >
          <InputLeftAddon color = "primary.150" fontSize = "15" fontWeight = "extrabold" w = "100px" bg= "primary.3200" ml = "5px" mr = "3"> Height (In) </InputLeftAddon>
          <Editable  
          fontSize = "md"
          value= {input.height_in}
          isPreviewFocusable={false}
          onChange={(nextValue) => handleChange("height_in", nextValue)}
          onSubmit = {handleSubmit}
          >  
          {props => (
            <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "100px" maxW = "100px" minH = "9" maxH = "9"/>
              <EditableInput textAlign = "center" minW = "100px" maxW= "100px" minH = "9" maxH = "9"/>
              <EditableControls {...props} />
            </HStack>
          )}
        </Editable>
        </InputGroup>
        </Flex>
        <InputGroup mt = "10" ml = "20px">
          <InputLeftAddon color = "primary.150" fontSize = "md" fontWeight = "extrabold" w = "100px" bg= "primary.3200" ml = "5" mr = "2"> Weight </InputLeftAddon>
          <Editable  
          fontSize = "md"
          value= {input.weight}
          isPreviewFocusable={false}
          onChange={(nextValue) => handleChange("weight", nextValue)}
          onSubmit = {handleSubmit}
          >  
          {props => (
            <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "420" maxW= "420" minH = "9" maxH = "9"/>
              <EditableInput textAlign = "center" minW = "420" maxW= "420" minH = "9" maxH = "9"/>
              <EditableControls {...props}/>
            </HStack>
          )}
        </Editable>
        </InputGroup>
        <InputGroup w = "100px" mt = "10" ml = "20px">
          <InputLeftAddon color = "primary.150" fontSize = "md" fontWeight = "extrabold" w = "100px" bg= "primary.3200" ml = "5" mr = "10"> Gender </InputLeftAddon>
          <RadioGroup color = "primary.2350" fontWeight = "bold" mt = "10px" value= {input.gender} >
           <HStack spacing="71.5px" >
              <Radio value="Female" size = 'md' onChange={(event) => handleChange("gender", event.target.value)} onClick= {handleSubmit}>Female</Radio>
              <Radio value="Male" size = 'md' onChange={(event) => handleChange("gender", event.target.value)}>Male</Radio>
              <Radio mr = "0px" value="Other" size = 'md' onChange={(event) => handleChange("gender", event.target.value)}>Other</Radio>
              <IconButton colorScheme="myblue" aria-label="Edit" size="sm" icon={<CheckIcon />} onClick={handleSubmit} />
           </HStack>
          </RadioGroup>
        </InputGroup>

        <Button ml= "250px" mt = "60px" bg = "primary.3200" color  = "primary.150" fontWeight = "bold" fontSize = "16"> Upload Profile Picture </Button>
        <Link to='/dashboard'>
        <Button ml= "310px" mt = "25px" bg = "primary.3200" color  = "primary.150" fontWeight = "bold" fontSize = "16"> Done </Button>
        </Link>
		</Box> 
	</Flex> 
	);
};

