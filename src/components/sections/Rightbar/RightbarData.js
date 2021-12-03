import React from "react";
import * as GiIcons from "react-icons/gi";

const RightbarData = [
  {
    title: "Arms",
    icon: <GiIcons.GiForearm />,
  },
  {
    title: "Shoulders",
    icon: <GiIcons.GiShoulderArmor />,
  },
  {
    title: "Chest",
    icon: <GiIcons.GiChestArmor />,
  },
  {
    title: "Back",
    icon: <GiIcons.GiMuscleUp />,
  },
  {
    title: "Abdominals",
    icon: <GiIcons.GiAbdominalArmor />,
  },
  {
    title: "Legs",
    icon: <GiIcons.GiLegArmor />,
  },
  {
    title: "Cardio",
    icon: <GiIcons.GiHearts />,
  },
];

const RightbarIcons = {
  Arms: <GiIcons.GiForearm size="100px" />,
  Shoulders: <GiIcons.GiShoulderArmor size="100px" />,
  Chest: <GiIcons.GiChestArmor size="100px" />,
  Back: <GiIcons.GiMuscleUp size="100px" />,
  Abdominals: <GiIcons.GiAbdominalArmor size="100px" />,
  Legs: <GiIcons.GiLegArmor size="100px" />,
  Cardio: <GiIcons.GiHearts size="100px" />,
};

export { RightbarData, RightbarIcons };
