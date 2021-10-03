import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="70px" fontWeight="bold" fontFamily = "logo">
        SWOL
      </Text>
    </Box>
  );
}
