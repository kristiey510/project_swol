import React, {Component, useState} from 'react';
import {auth, createUser, logIn} from "../firebase/firebase";
import errors from "../firebase/errors";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/sections/Header";
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    Icon,
    useColorModeValue, HStack,
} from '@chakra-ui/react';
import LogIn from "./LogIn";

/*
const [input, setInput] = useState({ username: "", email: "" });
const [errs, setErrs] = useState({ username: "", email: "" });
const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
};
*/

export default function ForgotPassword(
    title,
    subtitle,
    ctaLinkLogIn,
    ctaTextLogIn,
    ctaForgotPass,
    ctaForgotUser,
    ...rest
): JSX.Element {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} color="primary.2500">
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color= 'primary.2400'>
                    You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email">
                        <Input
                             placeholder="Email"
                             _placeholder={{ color: 'gray.500' }}
                              type="email"
                        />
                </FormControl>
                <Stack spacing={12}>
                    <Button
                        bg={'priamry.3200'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                      //  onClick={ctaLogin}
                    >
                        Request Reset
                    </Button>
                    <Link to={ctaForgotUser}>
                        <Button
                            color="primary.3100"
                            borderRadius="8px"
                            fontWeight="bold"
                            py="2"
                            px="4"
                            size="sm"
                            bg="primary.3200"
                        >
                            Forgot Username
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Flex>
    );
}
ForgotPassword.propTypes = {
    ctaHomePage: PropTypes.string,
    ctaLogIn: PropTypes.string,
    ctaForgotUser: PropTypes.string,
};

ForgotPassword.defaultProps = {
    ctaLogIn: "/login",
    ctaForgotUser: "/forgot_user",
    ctaHomePage: "/homepage",
}