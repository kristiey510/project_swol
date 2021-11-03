import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/sections/Header";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Input,
  Spacer,
  FormControl,
  FormErrorMessage,
  HStack,
  InputRightElement,
  InputGroup
} from "@chakra-ui/react";
import {
  auth,
  createUser,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
} from "../firebase/firebase";
import { useForm } from "react-hook-form";
import { doc, setDoc, db, collection, addDoc, updateDoc} from "../firebase/firebase";

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
  });
  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleMakeUser = async() => {
    await setDoc(doc(db, "Profile", auth.currentUser.uid),{
      User_id: auth.currentUser.uid,
      Name: auth.currentUser.displayName,
      Email: auth.currentUser.email,
      Dob: input.dob
    });
};

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const onSubmit = async () => {
    const userCred = await createUser(auth, input.email, input.password).then(async(userCred)=>{
     var name = input.firstName.concat(" ", input.lastName);
      await sendEmailVerification(userCred.user);
      await updateProfile(auth.currentUser, { displayName: name });
      await alert("User is created & updated & added to database");
      await handleMakeUser();
      var state = auth.onAuthStateChanged((user)=> {
        if (state) state();
        if (user){
          window.location = '/profile_info';
        }
    });
    }).catch((error) => {alert(error.message)});
  };

  return (
    <Flex direction="column" m="0 auto">
      <Header />
      <Stack spacing={6} align = "center">
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
        <Box w="300px" h="300px" align="center" >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack align="center">
              <FormControl isInvalid={errors}>
                <Input
                  mb="5"
                  id="firstName"
                  size="sm"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "Field is required",
                  })}
                  onChange={(event) =>
                    handleChange("firstName", event.target.value)
                  }
                />
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
                <Input
                  mb="5"
                  id="lastName"
                  size="sm"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Field is required",
                  })}
                  onChange={(event) =>
                    handleChange("lastName", event.target.value)
                  }
                />
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
                <Input
                  mb="5"
                  type="text"
                  placeholder="Date of Birth MM/DD/YY"
                  size="sm"
                  {...register("dob", {
                    required: "Field is required",
                  })}
                  onChange={(event) => handleChange("dob", event.target.value)}
                />
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.dob && errors.dob.message}
                </FormErrorMessage>
                <Input
                  mb="5"
                  id="email"
                  {...register("email", {
                    required: "Field is required",
                  })}
                  placeholder="Email address"
                  value={input.email}
                  size="sm"
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                />
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.email && errors.email.message}
                </FormErrorMessage>

                <InputGroup size="md">
                <Input
                  mb="5"
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={input.password}
                  {...register("password", {
                    required: "Field is required",
                    minLength: {
                      value: 8,
                      message: "Minimum length should be 8",
                    },
                  })}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  size="sm"
                />
                <InputRightElement width="4.3rem">
                  <Button variant="outline" mt = "-8px" mr = "-7px" h="1.4rem" size="xs" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <InputGroup size="md">
                <Input
                  mb="5"
                  id="password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
               
                  {...register("confirm", {
                    required: "Field is required",
                    validate: (value) => value === input.password,
                  })}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  size="sm"
                />
                <InputRightElement width="4.3rem">
                  <Button variant="outline" mt = "-8px" mr = "-7px" h="1.4rem" size="xs" onClick={handleClickConfirm}>
                    {showConfirm ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.confirm && errors.confirm.type === "validate" && (
                    <div className="error">Password must match</div>
                  )}
                </FormErrorMessage>
              </FormControl>
              <Spacer />
              <Spacer />
              <Spacer />
            </Stack>
            <Stack spacing={5} align="center">
              <Button
                id="submit_button"
                color="primary.150"
                fontWeight="bold"
                borderRadius="8px"
                type="submit"
                py=""
                px="7"
                bg="primary.3200"
                lineHeight="1"
                size="md"
              >
                {ctaTextCreate}
              </Button>
              <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                {errors.submit_button && errors.submit_button.message}
              </FormErrorMessage>
              <Link to={ctaLinkLogIn}>
                <Button
                  color="primary.150"
                  borderRadius="8px"
                  fontWeight="bold"
                  py="4"
                  px="7"
                  lineHeight="1"
                  size="md"
                  bg="primary.3200"
                >
                  {ctaTextLogIn}
                </Button>
              </Link>
            </Stack>
          </form>
        </Box>
      </Stack>
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
