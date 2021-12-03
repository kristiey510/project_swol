import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { RightbarIcons } from "./RightbarData";
import { GiBodyBalance } from "react-icons/gi";
import "./Rightbar.css";

function Recommendation({ category, topScored }) {
  return (
    <Box align="center">
      <Text>{`Recommended${category ? ` for ${category}` : ""}:`}</Text>
      <Box p="15px">
        {category ? RightbarIcons[category] : <GiBodyBalance size="100px" />}
      </Box>
      <Text>{`${topScored.name}:`}</Text>
      <Text
        color={`rgba(${255 - 255 * topScored.score}, ${
          255 * topScored.score
        }, 0, 1)`}
      >{`${Math.round(topScored.score * 100)}% match`}</Text>
    </Box>
  );
}

export default Recommendation;
