import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LandingHeader from "../components/sections/LandingHeader/LandingHeader";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Input,
  Spacer,
  FormControl,
  InputRightElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import {
  auth,
  createUser,
  sendEmailVerification,
  updateProfile,
} from "../firebase/firebase";
import { doc, setDoc, db } from "../firebase/firebase";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function CreateAccount({
  title,
  subtitle,
  ctaLinkCreate,
  ctaTextCreate,
  ctaLinkLogIn,
  ctaTextLogIn,
  ...rest
}) {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errs, setErrs] = useState(null);

  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleMakeUser = async () => {
    const following = [];
    following[0] = auth.currentUser.uid;
    await setDoc(doc(db, "Profile", auth.currentUser.uid), {
      User_id: auth.currentUser.uid,
      Name: auth.currentUser.displayName,
      Email: auth.currentUser.email,
      Dob: input.dob,
      Picture_id: "default.png",
      following: following,
    });
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const validate = async () => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (
      input.firstName.length === 0 ||
      input.lastName.length === 0 ||
      input.dob.length === 0 ||
      input.email.length === 0 ||
      input.password.length === 0 ||
      input.confirmPass.length === 0
    ) {
      setErrs("Missing required fields");
    } else if (!regex.test(input.dob)) {
      setErrs("Check format of dob (MM/DD/YYYY)");
    } else if (input.password.length < 8) {
      setErrs("Passwords length too short");
    } else if (input.password.length !== input.confirmPass.length) {
      setErrs("Passwords don't match");
    }
  };

  const onSubmit = async () => {
    await validate();
    await createUser(auth, input.email, input.password)
      .then(async (userCred) => {
        var name = input.firstName.concat(" ", input.lastName);
        await sendEmailVerification(userCred.user);
        await updateProfile(auth.currentUser, { displayName: name });
        await handleMakeUser();
        var state = auth.onAuthStateChanged(async (user) => {
          if (state) state();
          if (user) {
            window.location = "/profile_info";
          }
        });
      })
      .catch((error) => {
        setErrs(error.code);
      });
  };

  return (
    <Flex direction="column" m="0 auto" align="center">
      <LandingHeader />
      <Box
        h="630px"
        w="600px"
        mt="25px"
        boxShadow="xl"
        bg="#FDF2E9"
        rounded={"xl"}
        p={3}
      >
        <Link to="./">
          <Button
            color="primary.2350"
            ml="10px"
            mt="5px"
            size="xs"
            bg="transparent"
            variant="link"
          >
            <ArrowBackIcon /> BACK
          </Button>
        </Link>
        <Stack spacing={6} align="center" mt="10px">
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
            lineHeight={1.5}
            textAlign="center"
          >
            {subtitle}
          </Heading>
          <Box w="300px" h="300px" align="center">
            <form>
              <Stack align="center">
                <FormControl>
                  <Input
                    mb="5"
                    id="firstName"
                    size="sm"
                    placeholder="First Name"
                    bg="gray.50"
                    rounded="md"
                    onChange={(event) =>
                      handleChange("firstName", event.target.value)
                    }
                  />
                  <Input
                    mb="5"
                    bg="gray.50"
                    rounded="md"
                    id="lastName"
                    size="sm"
                    placeholder="Last Name"
                    onChange={(event) =>
                      handleChange("lastName", event.target.value)
                    }
                  />
                  <Input
                    bg="gray.50"
                    rounded="md"
                    mb="5"
                    type="text"
                    placeholder="Date of Birth MM/DD/YY"
                    size="sm"
                    onChange={(event) =>
                      handleChange("dob", event.target.value)
                    }
                  />
                  <Input
                    bg="gray.50"
                    rounded="md"
                    mb="5"
                    id="email"
                    placeholder="Email address"
                    value={input.email}
                    size="sm"
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                  />
                  <InputGroup size="md">
                    <Input
                      bg="gray.50"
                      rounded="md"
                      mb="5"
                      id="password"
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      value={input.password}
                      onChange={(event) =>
                        handleChange("password", event.target.value)
                      }
                      size="sm"
                    />
                    <InputRightElement width="4.3rem">
                      <Button
                        variant="solid"
                        mt="-8px"
                        mr="-7px"
                        h="1.2rem"
                        size="xs"
                        fontSize="6pt"
                        bg="gray.200"
                        onClick={handleClick}
                        textTransform="uppercase"
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup size="md">
                    <Input
                      bg="gray.50"
                      rounded="md"
                      type={showConfirm ? "text" : "password"}
                      onChange={(event) =>
                        handleChange("confirmPass", event.target.value)
                      }
                      placeholder="Confirm Password"
                      size="sm"
                    />
                    <InputRightElement width="4.3rem">
                      <Button
                        bg="gray.200"
                        variant="solid"
                        mt="-8px"
                        mr="-7px"
                        h="1.4rem"
                        size="xs"
                        fontSize="6pt"
                        onClick={handleClickConfirm}
                        textTransform="uppercase"
                      >
                        {showConfirm ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Box h="25px" align="center" p="2px">
                  <Text color="red" fontSize="xs">
                    {errs}
                  </Text>
                </Box>
                <Spacer />
                <Spacer />
              </Stack>

              <Stack spacing={5} align="center">
                <Button
                  id="submit_button"
                  ml="10px"
                  color="primary.150"
                  borderRadius="10px"
                  fontWeight="bold"
                  fontSize="10pt"
                  bg="primary.3200"
                  w="150px"
                  h="32px"
                  lineHeight="1"
                  size="md"
                  onClick={onSubmit}
                >
                  {ctaTextCreate}
                </Button>
                <Link to={ctaLinkLogIn}>
                  <Button
                    ml="10px"
                    color="primary.150"
                    borderRadius="10px"
                    fontWeight="bold"
                    fontSize="10pt"
                    bg="primary.3200"
                    w="150px"
                    h="32px"
                    lineHeight="1"
                    size="md"
                  >
                    {ctaTextLogIn}
                  </Button>
                </Link>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

CreateAccount.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaTextCreate: PropTypes.string,
  ctaTextLogIn: PropTypes.string,
  ctaLinkCreate: PropTypes.string,
  ctaLinkLogIn: PropTypes.string,
};

CreateAccount.defaultProps = {
  title: "Create Account",
  subtitle: "One step closer to a healthier life",
  ctaTextCreate: "Create Account",
  ctaTextLogIn: "Log In Instead",
  ctaLinkCreate: "/homepage",
  ctaLinkLogIn: "/login",
};
