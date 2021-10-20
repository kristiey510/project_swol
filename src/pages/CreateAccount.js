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
} from "@chakra-ui/react";
import { auth, createUser, sendEmailVerification } from "../firebase/firebase";
import { useForm } from "react-hook-form";

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

  const handleCreateUser = async () => {
    const userCred = await createUser(auth, input.email, input.password).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    );

    await sendEmailVerification(userCred.user);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    window.location = "/profile_info";
  };

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      <Stack spacing={6} w={{ base: "10%", md: "120%" }} align="center">
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
        <Spacer />
        <Box w="300px" h="300px" align="center">
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
                <Input
                  mb="5"
                  id="password"
                  type="password"
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
                <FormErrorMessage mt="-3" mb="1.5" fontSize="12px">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <Input
                  mb="5"
                  id="confirm"
                  type="password"
                  size="sm"
                  placeholder="Confirm Password"
                  {...register("confirm", {
                    required: "Field is required",
                    validate: (value) => value === input.password,
                  })}
                />
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
                color="primary.150"
                fontWeight="bold"
                borderRadius="8px"
                type="submit"
                onClick={handleCreateUser}
                py=""
                px="7"
                bg="primary.3200"
                lineHeight="1"
                size="md"
              >
                {ctaTextCreate}
              </Button>
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
