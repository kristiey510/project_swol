import React, { useState, useEffect } from "react"; 
import Select from 'react-select';
import "react-select-search/style.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import {Heading,Box, Flex, Text, Button, Spacer, HStack, Stack} from "@chakra-ui/react";
import { db, collection, addDoc, updateDoc, auth, getDocs, query, orderBy} from "../firebase/firebase";

export default function AddFriend() {
	const [options, setOptions] = useState({value : "", label: ""});
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [searchUser, setSearchUser] = useState({name: "", user_id:""});
	const finalRef = React.useRef()

	useEffect(async () => {
		const optionVals =[];
		const querySnapshot = await getDocs(query(collection(db, "Profile"),orderBy("Name")));
		querySnapshot.forEach(async(doc) => {
		  	optionVals.push({value: doc.id, label: doc.data().Name});
		});
		await setOptions(optionVals);
	}, []);

	const addFriend = (val) => {
		setSearchUser({name: val.label, user_id: val.value});
	};

	const Follow = async() =>{
		await addDoc(collection(db, "Following"),{
			Uid: auth.currentUser.uid,
	    	Following: searchUser.user_id
    	}).then(async ()=>{
    		await addDoc(collection(db, "Followers"),{
		    	Uid: searchUser.user_id,
		    	Followed_by: auth.currentUser.uid
	    	});
    	});
	};

  return (
    <Flex>
    	<Stack w= "400px" ml= "50px" mt = "50px"> 
    	<Heading align = "center" mb = "10px" mt = "10px" color = "primary.2350"> Follow </Heading>
       <Select
       	theme={(theme) => ({
	      ...theme,
	      borderRadius: "25px",
	      colors: {
	        ...theme.colors,
	        primary25: "#FEEBC8",
	        primary: "#90CDF4"
	      }
	    })}
       	components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
        options={options}
        openMenuOnClick = {false}
        search
        placeholder="Search User"
        onChange = {addFriend}
       />
       <Box>
       		<Button mt = "10px" ml = "125px" w = "150px" bg = "primary.3200" color  = "primary.150" fontWeight = "bold" fontSize = "16" onClick = {onOpen} > Search User</Button>
       </Box>
       </Stack> 
       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color = "primary.2350">User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Do you want to follow {searchUser.name}?
          </ModalBody>
          <ModalFooter>
            <Button bg = "primary.3200" color  = "primary.150" fontWeight = "bold" fontSize = "16" onClick={onClose}>
              Back
            </Button>
            <Button ml = "5" variant="ghost" bg = "primary.3200" color  = "primary.150" fontWeight = "bold" fontSize = "16" onClick = {Follow}>Follow</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>

  );
}


