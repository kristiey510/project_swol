import React, { useState, useEffect } from "react";
import { Box, Text, Button, Spinner } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

function ErrorPage() {
  let [fakeLoading, setFakeLoading] = useState(true);
  const handleClick = () => {
    window.location = "/";
  };

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box mt="10%" w="100%" align="center">
      {fakeLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <WarningIcon />
          <Text fontSize="2xl">Something went wrong!</Text>
          <Button onClick={handleClick}>Click here to return to home</Button>
        </>
      )}
    </Box>
  );
}

export default ErrorPage;
