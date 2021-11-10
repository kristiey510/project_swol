import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="30px" fontWeight="bold" fontFamily = "logo" color = "orange" ml = "10px">
        SWOL
      </Text>
    </Box>
  );
}
