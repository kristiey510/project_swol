import React, { useState } from "react"; 
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
import { doc, setDoc, db, collection, addDoc, updateDoc, auth, getDoc} from "../firebase/firebase";
<<<<<<< HEAD
import {EditIcon, CheckIcon} from "@chakra-ui/icons"
=======
import {EditIcon, CheckIcon, CloseIcon} from "@chakra-ui/icons"
>>>>>>> 63a9a92cbf368ce251bbf037676b84f2d9b462b3

export default function ProfileEdit(){


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
      Weight: input.weight});
}



const [input, setInput] = useState({name: "", dob: "", gender: "" , weight: "", height_in: "", height_ft: ""});

const docData = async () => {
  await getDoc(doc(db, "Profile", "iu90wX9I0cfI7w1KNrMBVfWxFF82")).then(async (docSnap) => {
  if (docSnap.exists()) {
     await setInput((prev) => ({ ...prev, name: docSnap.data().Name}));
     await setInput((prev) => ({ ...prev, gender: docSnap.data().Gender}));
     await setInput((prev) => ({ ...prev, weight: docSnap.data().Weight}));
     await setInput((prev) => ({ ...prev, height_in: docSnap.data().Height_In}));
     await setInput((prev) => ({ ...prev, height_ft: docSnap.data().Height_Ft}));
  } else {
    console.log("No such document!");
  }
});
};

window.onload = docData;

return(
	<Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="auto"> 

		<FeedHeader/>
		<Box rounded={'xl'} mt = "38" w = "680px" h = "600" bg={useColorModeValue('gray.50', 'gray.100')}> 
			<Heading mt = "5" align = "center" color = "primary.2350"> Profile Update </Heading>
			<InputGroup mt = "10" ml = "20px">
    			<InputLeftAddon color = "primary.150" fontSize = "md" fontWeight = "extrabold" w = "100px" bg= "primary.3200" ml = "5" mr = "2"> Name </InputLeftAddon>
    			<Editable	
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
          defaultValue = "Height"
          value= {input.height_ft}
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
