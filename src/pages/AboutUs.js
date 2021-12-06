import React, { useState } from "react";
import PropTypes from "prop-types";
import LandingHeader from "../components/sections/LandingHeader/LandingHeader";
import { Flex, Heading, Stack, Link, Box, HStack, Image, Text} from "@chakra-ui/react";

export default function AboutUs({ title, subtitle, subtitle2, ...rest }) {
  const [follows] = useState([]);


  follows.push({name: "Anderson Shew", img : "assets/Staff/Andy_Shew.JPG", email: "ashew@emory.edu"});
  follows.push({name: "David Chen", img : "assets/Staff/David_Chen.JPG", email: "dche242@emory.edu"});
  follows.push({name: "Kristie Yip", img : "assets/Staff/Kristie_Yip.JPG", email: "kyip3@emory.edu"});
  follows.push({name: "Ryan Lo", img : "assets/Staff/Ryan_Lo.JPG", email: "ylo9@emory.edu"});
  follows.push({name: "Prince Xian", img : "assets/Staff/Prince_Qian.JPG", email: "xqian3@emory.edu"});
  follows.push({name: "Jon Marcus", img : "assets/Staff/Jon_Marcus.JPG", email: "jdmarcu@emory.edu"});
  follows.push({name: "Daeho Kim", img : "assets/Staff/Daeho_Kim.PNG", email: "dkim598@emory.edu"});
  return (
    <Flex direction="column" m="0 auto" align="center" w = "full">
      <LandingHeader />
      <Stack
        spacing={10}
        mt="10"
        align="center"
      >
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
          lineHeight="1.5"
          textAlign="center"
        >
          {subtitle}
          <br></br>
          You can reach us{" "}
          <Link color="teal.500" href="https://forms.gle/1jESpBitqYy5bSHX9">
            here
          </Link>
          !
        </Heading>
        <Flex wrap="wrap" justify="space-evenly" mt="-30px" width = "1300px">
          {follows.map((item, index) => (
            <Box
              key={index}
              bg="#FDF2E9"
              mt="20px"
              mb="20px"
              ml="20px"
              mr="20px"
              w="250px"
              h="165px"
              px="20px"
              py="15px"
              borderRadius="10"
              boxShadow="md"
            >
              <HStack spacing={10} >
                <Box >
                  <Image src={item.img} w="100px" h="110px" borderRadius="10" />
                  <Text mt="10px" fontSize="xs" align="center">
                    {item.email}
                  </Text>
                </Box>
                <Box ml = "-10px" align = "center">
                  <Text fontSize = "xs"> 
                    {item.name}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
}

AboutUs.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitle2: PropTypes.string,
};

AboutUs.defaultProps = {
  title: "About Us",
  subtitle:
    "SWOL is a project created by 7 Emory students, with the goal of encouraging our users to devote time to staying fit and healthy!",
};
