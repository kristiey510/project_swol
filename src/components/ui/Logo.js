import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="33px" fontWeight="bold" fontFamily = "logo" color = "primary.2350" ml = "10px">
        SWOL
      </Text>
    </Box>
  );
}
