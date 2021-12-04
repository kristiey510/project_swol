import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { RightbarData } from "./RightbarData";
import Recommendation from "./Recommendation";
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

  const cardio = ["Running", "Biking", "Elliptical", "Stair climber"];

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
      case "Cardio":
        list = cardio;
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
    <div className="Rightbar">
      <div className="rightbarWrapper">
        <Box mt="5px" flex="2.5" width="100%" gridGap="10px">
          {RightbarData.map((item, index) => (
            <Box
              p="15px"
              key={index}
              bg={`${item.title === rightbar ? "gray.100" : ""}`}
              cursor="pointer"
              justify="flex-start"
              onClick={() => handleClick(item.title)}
            >
              <Flex alignItems="center">
                {item.icon}
                <Text ml="5px">{item.title}</Text>
              </Flex>
            </Box>
          ))}
          {scored?.length && (
            <>
              <hr className="sidebarHr" />
              {rightbar ? (
                <Recommendation
                  category={rightbar || ""}
                  topScored={filtered[0]}
                />
              ) : (
                <Recommendation topScored={scored[0]} />
              )}
            </>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Rightbar;
