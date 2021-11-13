import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/sections/LandingHeader";
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
} from "@chakra-ui/react";
import { doc, db, updateDoc, auth } from "../firebase/firebase";
import { useForm } from "react-hook-form";

export default function ProfileCreate() {
  const [input, setInput] = useState({
    Height_Ft: "",
    Height_In: "",
    Gender: "",
    Weight: "",
  });
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
      window.location = "/profile_info";
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

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      <Stack
        spacing={10}
        w={{ base: "10%", md: "120%" }}
        mt="10"
        mb="10"
        align="center"
      >
        <Heading
          as="h1"
          size="lg"
          fontWeight="bold"
          color="#F89880"
          textAlign="center"
        >
          Fill out additional information
        </Heading>
        <Heading
          as="h2"
          size="md"
          fontWeight="bold"
          color="#F89880"
          textAlign="center"
        >
          <Text> Welcome !</Text>
        </Heading>
      </Stack>
      <form onSubmit={handleSubmit(handleMakeUser)}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold" color="#89CFF0">
            {" "}
            Height{" "}
          </FormLabel>
          <HStack spacing="10px" mb="6">
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
          <FormLabel fontSize="lg" fontWeight="bold" color="#89CFF0">
            {" "}
            Weight
          </FormLabel>
          <Box w="410px" h="40px" mb="6">
            <Input
              id="weight"
              size="sm"
              placeholder="lbs"
              onChange={(event) => handleChange("Weight", event.target.value)}
            />
          </Box>
          <FormLabel fontSize="lg" fontWeight="bold" color="#89CFF0" mb="5">
            {" "}
            Gender{" "}
          </FormLabel>
          <RadioGroup color="#F89880" fontWeight="semibold">
            <HStack spacing="80px">
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
        </FormControl>
        <Box w="410px" h="50px" mt="10" align="center">
          <Stack>
            <Button
              type="submit"
              color="primary.150"
              borderRadius="4px"
              fontWeight="bold"
              bg="primary.3200"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
      <Link to="/dashboard">
        <Button
          onClick={toDash}
          size="xs"
          variant="link"
          color="#89CFF0"
          borderRadius="4px"
          fontWeight="bold"
          bg="transparent"
        >
          skip for now
        </Button>
      </Link>
    </Flex>
  );
}
