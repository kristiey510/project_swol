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
  Image,
  InputRightAddon,
  EditableInput,
  EditablePreview,
  IconButton,
  ButtonGroup,
  InputGroup,
  InputLeftAddon,
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
              height_in: data.Height_In,
              height_ft: data.Height_Ft,
              gender: data.Gender,
              weight: data.Weight,
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
      <ButtonGroup px="18px" py="3px" size="sm">
        <IconButton
          colorScheme="myblue"
          icon={<CheckIcon />}
          onClick={onSubmit}
        />
      </ButtonGroup>
    ) : (
      <Flex px="15px" justify="left">
        <IconButton
          colorScheme="myblue"
          aria-label="Edit"
          size="sm"
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
      <Topbar />
      <Flex mt="30px" ml="-230px">
        <Image
          id="myimg"
          h="200px"
          w="200px"
          bg="transparent"
          mt="80px"
          mr="80px"
          borderRadius="full"
        />
        <Box rounded={"xl"} mt="38" w="680px" h="600">
          <Heading mt="-5px" align="center" color="primary.2350">
            {" "}
            Profile Update{" "}
          </Heading>
          <InputGroup mt="60px" ml="20px">
            <InputLeftAddon
              color="primary.150"
              fontSize="md"
              fontWeight="extrabold"
              w="100px"
              bg="primary.3200"
              ml="5"
              mr="2"
            >
              {" "}
              Name{" "}
            </InputLeftAddon>
            <Editable
              id="name"
              fontSize="lg"
              value={input.name}
              isPreviewFocusable={false}
              onChange={(nextValue) => handleChange("name", nextValue)}
              onSubmit={handleSubmit}
              color="orange.400"
              fontWeight="bold"
            >
              {(props) => (
                <HStack>
                  <EditablePreview
                    textAlign="center"
                    ml="3"
                    mt="1"
                    minW="423"
                    maxW="423"
                    minH="9"
                    maxH="9"
                  />
                  <EditableInput
                    textAlign="center"
                    minW="423"
                    maxW="423"
                    minH="9"
                    maxH="9"
                  />
                  <EditableControls {...props} />
                </HStack>
              )}
            </Editable>
          </InputGroup>
          <Flex>
            <InputGroup mt="10" ml="20px">
              <InputLeftAddon
                align="center"
                color="primary.150"
                fontSize="15"
                fontWeight="extrabold"
                w="100px"
                bg="primary.3200"
                ml="5"
                mr="2"
              >
                {" "}
                Height (Ft)
              </InputLeftAddon>
              <Editable
                fontSize="md"
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
                      ml="3"
                      mt="1"
                      minW="104px"
                      maxW="104px"
                      minH="9"
                      maxH="9"
                    />
                    <EditableInput
                      variant="filled"
                      textAlign="center"
                      minW="104px"
                      maxW="104px"
                      minH="9"
                      maxH="9"
                    />
                    <EditableControls {...props} />
                  </HStack>
                )}
              </Editable>
            </InputGroup>
            <InputGroup mt="10">
              <InputLeftAddon
                color="primary.150"
                fontSize="15"
                fontWeight="extrabold"
                w="100px"
                bg="primary.3200"
                ml="5px"
                mr="3"
              >
                {" "}
                Height (In){" "}
              </InputLeftAddon>
              <Editable
                fontSize="md"
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
                      ml="3"
                      mt="1"
                      minW="104px"
                      maxW="104px"
                      minH="9"
                      maxH="9"
                    />
                    <EditableInput
                      textAlign="center"
                      minW="104px"
                      maxW="104px"
                      minH="9"
                      maxH="9"
                    />
                    <EditableControls {...props} />
                  </HStack>
                )}
              </Editable>
            </InputGroup>
          </Flex>
          <InputGroup mt="10" ml="20px">
            <InputLeftAddon
              color="primary.150"
              fontSize="md"
              fontWeight="extrabold"
              w="100px"
              bg="primary.3200"
              ml="5"
              mr="2"
            >
              {" "}
              Weight{" "}
            </InputLeftAddon>
            <Editable
              fontSize="md"
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
                    ml="3"
                    mt="1"
                    minW="385"
                    maxW="385"
                    minH="9"
                    maxH="9"
                  />
                  <EditableInput
                    textAlign="center"
                    ml="3"
                    minW="385"
                    maxW="385"
                    minH="9"
                    maxH="9"
                  />
                  <InputRightAddon
                    fontSize="md"
                    fontWeight="extrabold"
                    w="30px"
                    h="30px"
                  >
                    {" "}
                    lbs
                  </InputRightAddon>
                  <EditableControls {...props} />
                </HStack>
              )}
            </Editable>
          </InputGroup>
          <InputGroup w="100px" mt="10" ml="20px">
            <InputLeftAddon
              color="primary.150"
              fontSize="md"
              fontWeight="extrabold"
              w="100px"
              bg="primary.3200"
              ml="5"
              mr="10"
            >
              {" "}
              Gender{" "}
            </InputLeftAddon>
            <RadioGroup
              color="primary.2350"
              fontWeight="bold"
              mt="10px"
              value={input.gender}
            >
              <HStack spacing="73px">
                <Radio
                  value="Female"
                  size="md"
                  onChange={(event) =>
                    handleChange("gender", event.target.value)
                  }
                  onClick={handleSubmit}
                >
                  Female
                </Radio>
                <Radio
                  value="Male"
                  size="md"
                  onChange={(event) =>
                    handleChange("gender", event.target.value)
                  }
                >
                  Male
                </Radio>
                <Radio
                  value="Other"
                  size="md"
                  onChange={(event) =>
                    handleChange("gender", event.target.value)
                  }
                >
                  Other
                </Radio>
                <IconButton
                  colorScheme="myblue"
                  aria-label="Edit"
                  size="sm"
                  icon={<CheckIcon />}
                  onClick={handleSubmit}
                />
              </HStack>
            </RadioGroup>
          </InputGroup>
          <Box backgroundColor="tomato"></Box>

          <FormControl id="email">
            <FormLabel
              pt="12.5px"
              pl="18px"
              ml="250px"
              mt="50px"
              borderRadius="10px"
              w="200px"
              h="50px"
              htmlFor="getFile"
              class="button"
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
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
          <Link to="/dashboard">
            <Button
              ml="310px"
              mt="25px"
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
            >
              Done
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
