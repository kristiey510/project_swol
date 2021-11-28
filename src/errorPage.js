import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

function ErrorPage() {
  const handleClick = () => {
    window.location = "/";
  };

  return (
    <Box mt="10%" w="100%" align="center">
      <WarningIcon />
      <Text fontSize="2xl">Something went wrong!</Text>
      <Button onClick={handleClick}>Click here to return to home</Button>
    </Box>
  );
}

export default ErrorPage;
