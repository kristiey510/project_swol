import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { RightbarData } from "./RightbarData";
import "./Rightbar.css";
import recommend from "../../../utils/recommend";

function Rightbar({ user }) {
  const [rightbar, setRightbar] = useState(null);
  const [scored, setScored] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const arms = ["Pull up/chin up", "Push up", "Bench", "Bicep curl", "Rows"];

  const shoulders = [
    "Shoulder press",
    "Shoulder raise",
    "Shrugs",
    "Hang clean",
    "Clean and jerk",
    "Snatch",
  ];

  const chest = ["Push up", "Bench"];

  const back = ["Pull up/chin up", "Deadlift", "Rows", "Shrugs"];

  const abdomials = ["Plank", "Sit up/crunch", "Push up"];

  const legs = [
    "Running",
    "Biking",
    "Elliptical",
    "Stair climber",
    "Squat",
    "Deadlift",
    "Lunges",
    "Hang clean",
    "Clean and jerk",
    "Snatch",
  ];

  const cardio = [];

  useEffect(() => {
    user?.cache && setScored(recommend(user.cache));
  }, [user.cache]);

  const handleClick = (item) => {
    let list;
    switch (item) {
      case "Arms":
        list = arms;
        break;
      case "Shoulders":
        list = shoulders;
        break;
      case "Chest":
        list = chest;
        break;
      case "Back":
        list = back;
        break;
      case "Abdominals":
        list = abdomials;
        break;
      case "Legs":
        list = legs;
        break;
      default:
        break;
    }
    if (rightbar === item) {
      setRightbar(null);
    } else {
      setFiltered(scored.filter((a) => list.includes(a.name)));
      setRightbar(item);
    }
  };

  return (
    <Box mt="20px" flex="3.5" width="100%" gridGap="10px">
      {RightbarData.map((item, index) => (
        <Box
          mb="20px"
          key={index}
          justify="flex-start"
          onClick={() => handleClick(item.title)}
        >
          <Flex alignItems="center">
            {item.icon}
            <Text ml="5px">{item.title}</Text>
          </Flex>
        </Box>
      ))}
      {scored?.length !== 0 && !rightbar && (
        <>
          <Text>Recommended:</Text>
          <Text>{`${scored[0].name}: ${scored[0].score * 100}% match`}</Text>
        </>
      )}
      {scored?.length !== 0 && rightbar === "Arms" && (
        <>
          <Text>Recommended for arms:</Text>
          <Text>{`${filtered[0].name}: ${
            filtered[0].score * 100
          }% match`}</Text>
        </>
      )}
      {scored?.length !== 0 && rightbar === "Shoulders" && (
        <>
          <Text>Recommended for shoulders:</Text>
          <Text>{`${filtered[0].name}: ${
            filtered[0].score * 100
          }% match`}</Text>
        </>
      )}
      {scored?.length !== 0 && rightbar === "Chest" && (
        <>
          <Text>Recommended for chest:</Text>
          <Text>{`${filtered[0].name}: ${
            filtered[0].score * 100
          }% match`}</Text>
        </>
      )}
      {scored?.length !== 0 && rightbar === "Back" && (
        <>
          <Text>Recommended for back:</Text>
          <Text>{`${filtered[0].name}: ${
            filtered[0].score * 100
          }% match`}</Text>
        </>
      )}
      {scored?.length !== 0 && rightbar === "Abdominals" && (
        <>
          <Text>Recommended for abdominals:</Text>
          <Text>{`${filtered[0].name}: ${
            filtered[0].score * 100
          }% match`}</Text>
        </>
      )}
      {scored?.length !== 0 && rightbar === "Legs" && (
        <>
          <Text>Recommended for legs:</Text>
          <Text>{`${filtered[0].name}: ${
            filtered[0].score * 100
          }% match`}</Text>
        </>
      )}
    </Box>
  );
}

export default Rightbar;
