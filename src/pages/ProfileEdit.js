import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import FeedHeader from "../components/sections/FeedHeader";
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
import {EditIcon, CheckIcon, CloseIcon} from "@chakra-ui/icons"

export default function ProfileEdit(){

function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
return isEditing ? (
	<ButtonGroup px = "4px" size = "sm"> 
    <IconButton colorScheme="blue" icon={<CheckIcon />} onClick={onSubmit} />
    <IconButton colorScheme="blue" icon={<CloseIcon />} onClick={onCancel} />
    </ButtonGroup>
) : (
	<Flex px = "15px" justify = "left">
    <IconButton colorScheme="blue" aria-label="Edit" size="sm" icon={<EditIcon />} onClick={onEdit} />
    </Flex>
);
};
const [input, setInput] = useState({ name : "", dob: "", gender: "" , weight: "", height: ""});
const handleChange = (name, value) => { setInput((prev) => ({ ...prev, [name]: value }));};
const getValue = (name) => {
  ///To be done
};

return(
	<Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="auto"> 
		<FeedHeader/>
		<Box rounded={'xl'} mt = "38" w = "550px" h = "600" bg={useColorModeValue('gray.50', 'gray.100')}> 
			<Heading mt = "5" align = "center" color = "primary.2500"> Profile Update </Heading>
			<InputGroup mt = "10" ml = "20px">
    			<InputLeftAddon w = "100px" bg= "white" ml = "5"> Name: </InputLeftAddon>
    			<Editable	
          fontSize = "md"
     			defaultValue= "{auth.currentUser.displayName}"
      		isPreviewFocusable={false}
    			>	
		      {props => (
		        <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableInput variant= "filled" textAlign = "center" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
		          <EditableControls {...props} />
		        </HStack>
		      )}
    		</Editable>
  			</InputGroup>
        <InputGroup mt = "10" ml = "20px">
          <InputLeftAddon w = "100px"  bg= "white" ml = "5"> Height:</InputLeftAddon>
          <Editable  
          fontSize = "md"
           defaultValue= "{auth.currentUser.displayName}"
          isPreviewFocusable={false}
          >  
          {props => (
            <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableInput variant= "filled" textAlign = "center" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableControls {...props} />
            </HStack>
          )}
        </Editable>
        </InputGroup>
        <InputGroup mt = "10" ml = "20px">
          <InputLeftAddon w = "100px" bg= "white" ml = "5"> Weight: </InputLeftAddon>
          <Editable  
          fontSize = "md"
           defaultValue= "{auth.currentUser.displayName}"
          isPreviewFocusable={false}
          >  
          {props => (
            <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableInput textAlign = "center" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableControls {...props} />
            </HStack>
          )}
        </Editable>
        </InputGroup>
        <InputGroup w = "100px" mt = "10" ml = "20px">
          <InputLeftAddon w = "100px" bg= "white" ml = "5"> Gender: </InputLeftAddon>
          <Editable  
          fontSize = "md"
          defaultValue= "{auth.currentUser.displayName}"
          isPreviewFocusable={false}
          >  
          {props => (
            <HStack >
              <EditablePreview textAlign = "center" ml = "3" mt = "1" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableInput textAlign = "center" minW = "300" maxW= "300" minH = "9" maxH = "9"/>
              <EditableControls {...props} />
            </HStack>
          )}
        </Editable>
        </InputGroup>

        <Button ml= "180px" mt = "60px" color  = "primary.2500"> Upload Profile Picture </Button>
        <Link to='/dashboard'>
        <Button ml= "250px" mt = "40px" color  = "primary.2500"> Done </Button>
        </Link>
		</Box> 
	</Flex> 

	);

};
