import React, { useState} from "react";
import { Link } from "react-router-dom";
import LandingHeader from "../components/sections/LandingHeader/LandingHeader";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Input,
  Text,
  Spacer,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Image,
} from "@chakra-ui/react";
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
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ArrowBackIcon } from '@chakra-ui/icons'


export default function ProfileCreate() {
  const [input, setInput] = useState({
    Height_Ft: "",
    Height_In: "",
    Gender: "",
    Weight: "",
  });

  const [image, setImage] = useState(null);
  const [Error, setError] = useState("");

  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const { handleSubmit } = useForm();

  const toDash = () => {
    window.location = "/dashboard";
  };

  const handleMakeUser = async () => {
    if (
      !input.Height_Ft ||
      !input.Gender ||
      !input.Weight ||
      !input.Height_In
    ) {
      alert("You forgot to upload information");
    } else {
      await updateDoc(doc(db, "Profile", auth.currentUser.uid), {
        Height_Ft: input.Height_Ft,
        Height_In: input.Height_In,
        Gender: input.Gender,
        Weight: input.Weight,
      });
      alert("User information added to database");
      window.location = "./dashboard";
    }
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
    <Flex direction="column" align="center"  m="0 auto">
      <LandingHeader />
     <Box  h = "600px" w = "600px" mt = "25px" boxShadow = "xl" bg = "#FDF2E9" rounded={"xl"}>
       <Link to = "./signup"> 
       <Button color = "primary.2350" ml = "10px" mt = "5px" size = "xs" bg = "transparent" variant = "link">  <ArrowBackIcon /> BACK</Button>
       </Link>
      <Stack
        spacing="30px"
        mt="10"
        mb="10"
        align="center"
      >
        <Heading
          as="h1"
          size="md"
          fontWeight="bold"
          color="primary.2350"
          textAlign="center"
          textTransform = "uppercase"
        >
          Fill out additional information
        </Heading>
        <Heading
          as="h2"
          size="10pt"
          fontWeight="bold"
          color="primary.2350"
          textAlign="center"
        >
          <Text> Welcome !</Text>
        </Heading>
      </Stack>
      
      <form onSubmit={handleSubmit(handleMakeUser)} >
        <FormControl  align = "center">
        <Box w = "400px">
          <FormLabel textTransform = "uppercase" fontSize="sm"  fontWeight="bold" color="primary.2350">
            {" "}
            Height : {" "}
          </FormLabel>
          <HStack  spacing="10px" mb="6" >
            <Box w="200px" h="40px">
              <Input
                id="height_ft"
                size="sm"
                placeholder="ft"
                onChange={(event) =>
                  handleChange("Height_Ft", event.target.value)
                }
              />
            </Box>
            <Box w="200px" h="40px">
              <Input
                id="height_in"
                size="sm"
                placeholder="in"
                onChange={(event) =>
                  handleChange("Height_In", event.target.value)
                }
              />
            </Box>
          </HStack>
          <Spacer />
          <FormLabel textTransform = "uppercase" fontSize="sm" fontWeight="bold" color="primary.2350">
            {" "}
            Weight :
          </FormLabel>
          <Box w="400px" h="40px" mb="6">
            <Input
              id="weight"
              size="sm"
              placeholder="lbs"
              onChange={(event) => handleChange("Weight", event.target.value)}
            />
          </Box>
          <FormLabel textTransform = "uppercase" fontSize="sm" fontWeight="bold" color="primary.2350" mb="5">
            {" "}
            Gender :{" "}
          </FormLabel>
          <RadioGroup color = "gray.500" >
            <HStack spacing="100px">
              <Radio
                value="Female"
                size="sm"
                onChange={(event) => handleChange("Gender", event.target.value)}
              >
                Female
              </Radio>
              <Radio
                value="Male"
                size="sm"
                onChange={(event) => handleChange("Gender", event.target.value)}
              >
                Male
              </Radio>
              <Radio
                value="Other"
                size="sm"
                onChange={(event) => handleChange("Gender", event.target.value)}
              >
                Other
              </Radio>
            </HStack>
          </RadioGroup>
          </Box>
          <FormControl align = "center">
            <FormLabel
              mt = "30px"
              ml = "20px"
              pt="7px"
              pl="17px"
              bg="primary.3200"
              color = "white"
              borderRadius="10px"
              w="175px"
              h="35px"
              htmlFor="getFile"
              type="button"
              fontWeight="bold"
              fontSize="10pt"
              variant = "outline"
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
        
        <Box w="410px" h="35px" mt="15px" align="center">
          <Stack align = "center">
            <Button
              ml = "10px"
              type="submit"
              color="primary.150"
              borderRadius="10px"
              fontWeight="bold"
              fontSize="10pt"
              bg="primary.3200"
              w="150px"
              h="32px"
            >
              Submit
            </Button>
          </Stack>
        </Box>
        <Link to="/dashboard">
        <Button
          onClick={toDash}
          size="xs"
          variant="link"
          color="#89CFF0"
          fontWeight="bold"
          bg="transparent"
        >
          skip for now
        </Button>
      </Link>
        </FormControl>
      </form>
      </Box>
      
    </Flex>
  );
}
