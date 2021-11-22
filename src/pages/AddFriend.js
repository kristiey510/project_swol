import React, { useState, useEffect } from "react";
import Select from "react-select";
import "react-select-search/style.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image
} from "@chakra-ui/react";
import { Heading, Box, Flex, Button, Stack } from "@chakra-ui/react";
import {
  db,
  collection,
  auth,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  arrayUnion,
  getStorage,
  getDownloadURL,
  ref
} from "../firebase/firebase";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function AddFriend({user}) {
  const [options, setOptions] = useState({ value: "", label: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchUser, setSearchUser] = useState({ name: "", user_id: "" , id: ""});

  useEffect(() => {
    async function fetchUsers() {
      const optionVals = [];
      const querySnapshot = await getDocs(
        query(collection(db, "Profile"), orderBy("Name"))
      );
      querySnapshot.forEach(async (doc) => {
        const storage = getStorage();
        await getDownloadURL(ref(storage, doc.data().Picture_id))
          .then((url) => {
            optionVals.push({ value: doc.data().Name, id: doc.data().User_id, label: <Flex align = "center" direction = "row"><Image src={url} height="35px" width="40px" borderRadius= "10" mr = "10px"/>{doc.data().Name}</Flex>})
          });
      });
      setOptions(optionVals);
    }
    fetchUsers();
  }, []);

  const addFriend = (val) => {
    if (val != null){
      setSearchUser({ name: val.label, user_id: val.value , id: val.id});
    }
  };

  const Follow = async () => {
    await updateDoc(doc(db, "Profile", auth.currentUser.uid), {
      following: arrayUnion(searchUser.id),
    });
    onClose();
  };

  return (
    <Flex align = "center" direction = "column">
        <Heading align="center" mb="10px" mt="10px" color="primary.2350">
          Follow
        </Heading>
        <Box width='500px' mt = "20px">
        <Select
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#FEEBC8",
              primary: "#90CDF4",
            },
          })}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ClearIndicator: () => null
          }}
          arrowRenderer={null}
          options={options}
          openMenuOnClick={false}
          openMenuOnFocus = {false}
          search
          isClearable
          itemSize = {5}
          backspaceRemovesValue = {true}
          placeholder="Search User"
          onChange={addFriend}
          closeMenuOnSelect = {true}
          closeMenuOnScroll= {true}
        />
        </Box>
        <Box>
          <Button
            mt="30px"
            w="150px"
            bg="primary.3200"
            color="primary.150"
            fontWeight="bold"
            fontSize="16"
            onClick={onOpen}
          >
            Search User
          </Button>
        </Box>
      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader color="primary.2350">User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box >
            Do you want to follow {searchUser.user_id} ?
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              ml="5"
              variant="ghost"
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
              onClick={Follow}
            >
              Follow
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
