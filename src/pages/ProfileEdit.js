import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  HStack,
  Button,
  Radio,
  RadioGroup,
  Editable,
  FormLabel,
  FormControl,
  Stack,
  Image,
  InputRightAddon,
  EditableInput,
  EditablePreview,
  IconButton,
  ButtonGroup,
  InputGroup,
  InputLeftAddon,
  Checkbox,
  Text,
  Select
} from "@chakra-ui/react";
import Topbar from "../components/sections/Topbar/Topbar";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  db,
  updateDoc,
  auth,
  getDoc,
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
} from "../firebase/firebase";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

export default function ProfileEdit() {
  const [input, setInput] = useState({
    name: "",
    dob: "",
    gender: "",
    weight: "",
    height_in: "",
    height_ft: "",
    email: ""
  });
  const [image, setImage] = useState(null);
  const [Error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      await getDoc(doc(db, "Profile", auth.currentUser.uid)).then(
        async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setInput({
              name: data.Name,
              email: data.Email,
              height_in: data.Height_In,
              height_ft: data.Height_Ft,
              gender: data.Gender,
              weight: data.Weight,
              dob: data.Dob
            });
            const storage = getStorage();
            await getDownloadURL(ref(storage, data.Picture_id))
              .then((url) => {
                const img = document.getElementById("myimg");
                img.setAttribute("src", url);
              })
              .catch((error) => {
                console.log(error);
              });
            console.log("Done with data update");
          }
        }
      );
    }
    getUser();
  }, []);

  function EditableControls({ isEditing, onSubmit, onEdit }) {
    return isEditing ? (
      <ButtonGroup px="8px"  size="sm">
        <IconButton
          colorScheme="myblue"
          icon={<CheckIcon />}
          size="xs"
          onClick={onSubmit}
        />
      </ButtonGroup>
    ) : (
      <Flex px="15px" justify="left">
        <IconButton
          colorScheme="myblue"
          aria-label="Edit"
          size="xs"
          icon={<EditIcon />}
          onClick={onEdit}
        />
      </Flex>
    );
  }
  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await updateDoc(doc(db, "Profile", auth.currentUser.uid), {
      Name: input.name,
      Height_Ft: input.height_ft,
      Height_In: input.height_in,
      Gender: input.gender,
      Weight: input.weight,
    });
  };

  const handleImage = async (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    console.log("hello");
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (!acceptedImageTypes.includes(image.type)) {
      console.log("wrong file type:", image.type);
      setError("Error: Not a JPG or PNG");
      return;
    }
    var filename = uuidv4();
    const storage = getStorage();
    const imageRef = ref(storage, filename);
    await uploadBytes(imageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await updateDoc(doc(db, "Profile", auth.currentUser.uid), {
      Picture_id: filename,
    });
  };

  return (
    <Flex direction="column" align="center" m="auto">
      <Topbar/>
      <Flex direction = "row" mt = "50px" boxShadow="lg" borderRadius="lg" >
      <Box maxW="sm" borderRadius="lg" bg ="#E3EEF9" overflow="hidden" mr = "70px" w = "250px" boxShadow="lg" border = "3px">
      <Image id = "myimg" h="200px" w="200px" borderRadius = "lg" mt = "20px" ml= "25px" />
      <Box p="4"> 
        <Box display="flex" alignItems="baseline" >
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
          Name : 
          </Box>
        </Box>
        <Text fontSize = "sm"> 
        {input.name}
        </Text> 
        <Box 
          mt = "10px"
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
         Date of Birth:
        </Box>
          <Text fontSize = "sm"> 
          {input.dob}
          </Text> 
         <Box
          mt = "10px"
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
         Email:
        </Box>
          <Text fontSize = "sm"> 
          {input.email}
          </Text> 
        <FormControl id="email">
            <FormLabel
              mt = "50px"
              ml = "20px"
              pt="12px"
              pl="15px"
              bg="primary.3200"
              color = "white"
              borderRadius="10px"
              w="175px"
              h="40px"
              htmlFor="getFile"
              class="button"
              fontWeight="bold"
              fontSize="10pt"
            >
              Upload Profile Picture
            </FormLabel>
            <Input
              border="transparent"
              type="file"
              onChange={handleImage}
              id="getFile"
              style={{ display: "none" }}
            />
          </FormControl>
      </Box>
    </Box>
        <Box rounded={"xl"}  w="680px" h="600" >
          <Heading fontSize = "20pt" mt="25px" align="center" color="primary.2350" textTransform= "uppercase" fontWeight = "bold">
            Profile 
          </Heading>
          <HStack align = "space-between" mt = "10px" >
            <Stack> 
            <Heading fontSize = "11pt" mt="20px" align="left" color="primary.2350" textTransform= "uppercase" fontWeight = "bold">
              Personal Info
            </Heading>
            <InputGroup py = "5px">
             <FormLabel mt = "5px" fontSize = "10pt"  w = "125px"> Height (Feet): </FormLabel>
              <Editable
                fontSize="sm"
                value={input.height_ft}
                isPreviewFocusable={false}
                onChange={(nextValue) => handleChange("height_ft", nextValue)}
                onSubmit={handleSubmit}
                color="orange.400"
                fontWeight="bold"
              >
                {(props) => (
                  <HStack>
                  <EditablePreview
                    textAlign="center"
                    minW= "100px" 
                    maxW = "100px" 
                    minH = "25px" 
                    maxH = "25px"    
                  />
                  <EditableInput
                    textAlign="center"
                    minW= "100px" 
                    maxW = "100px" 
                    minH = "25px" 
                    maxH = "25px"   
               
                  />
                  <EditableControls {...props} />
                </HStack>
                )}
              </Editable>
            </InputGroup>
            <InputGroup py = "5px" >
            <FormLabel mt = "5px" fontSize = "10pt" w = "125px"> Height (Inches): </FormLabel>
              <Editable
                fontSize="sm"
                value={input.height_in}
                isPreviewFocusable={false}
                onChange={(nextValue) => handleChange("height_in", nextValue)}
                onSubmit={handleSubmit}
                color="orange.400"
                fontWeight="bold"
              >
                {(props) => (
                  <HStack>
                  <EditablePreview
                    textAlign="center"
                    minW= "100px" 
                    maxW = "100px" 
                    minH = "25px" 
                    maxH = "25px"  
                  />
                  <EditableInput
                    textAlign="center"
                    minW= "100px" 
                    maxW = "100px" 
                    minH = "25px" 
                    maxH = "25px"  
                  />
                  <EditableControls {...props} />
                </HStack>
                )}
              </Editable>
            </InputGroup>
          <InputGroup py = "5px">
            <FormLabel mt = "5px" fontSize = "10pt" w = "125px"> Weight (lbs): </FormLabel>
            <Editable
              fontSize="sm"
              value={input.weight}
              isPreviewFocusable={false}
              onChange={(nextValue) => handleChange("weight", nextValue)}
              onSubmit={handleSubmit}
              color="orange.400"
              fontWeight="bold"
            >
              {(props) => (
                <HStack>
                  <EditablePreview
                    textAlign="center"
                    minW= "100px" 
                    maxW = "100px" 
                    minH = "25px" 
                    maxH = "25px"  
                  />
                  <EditableInput
                    textAlign="center"
                    minW= "100px" 
                    maxW = "100px" 
                    minH = "25px" 
                    maxH = "25px"   
                  />
                  <EditableControls {...props} />
                </HStack>
              )}
            </Editable>
          </InputGroup>
          <InputGroup py = "5px">
            <FormLabel mt = "5px" fontSize = "10pt" w="125px"> Gender : </FormLabel>
            <Select w = "100px" fontSize = "sm" h = "25px" value = {input.gender} 
              onChange={(event) =>handleChange("gender", event.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
              <IconButton
                ml="23px"
                colorScheme="myblue"
                aria-label="Edit"
                size="xs"
                icon={<CheckIcon />}
                onClick={handleSubmit}
              />
          </InputGroup>
          <Stack spacing = "10px">
            <Checkbox size = "sm" defaultIsChecked>Follow requests</Checkbox>
            <Checkbox size = "sm"> Automatically accept follow requests</Checkbox>
          </Stack>
          </Stack>
          
          <Stack px = "50px">
          <Heading fontSize = "11pt" mt="20px" align="left" color="primary.2350" textTransform= "uppercase" fontWeight = "bold">
              Settings
          </Heading>
          <FormLabel py = "5px" fontSize = "9pt"> Old Password : </FormLabel>
            <Input w = "200px" placeholder="Type in old password" size="xs" type = "password"/>
          <FormLabel py = "5px" fontSize = "9pt" type = "password"> New Password : </FormLabel>
            <Input placeholder="New password" size="xs" type = "password"/>
          <FormLabel py = "5px" fontSize = "9pt"> Confirm New Password : </FormLabel>
            <Input placeholder="Retype new password" size="xs"/>
            <Box >
              <Button ml = "30px" mt = "15px" size = "xs" w = "125px" bg="primary.3200" color="primary.150"> Change Password</Button>
            </Box>
          </Stack>
          </HStack>
          <Link to="/dashboard">
            <Button
              ml="250px"
              mt="60px"
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="13"
            >
              Save Changes
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
