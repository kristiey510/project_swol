import { extendTheme } from "@chakra-ui/react";
// refer to https://chakra-ui.com/docs/theming/theme
const colors = {
  primary: {
    //gray 50
    150: "#F7FAFC",
    //gray 100
    1100: "#EDF2F7", 
    //gray 600
    1600: "#4A5568",
    //gray 900 - basically black
    1900: "#171923",
    //orange 50
    250: "#FFFAF0",
    //orange 100
    2100: "#FEEBC8",
    //orange 200
    2200: "#FBD38D",
   //primary orange color
    2300: "#F6AD55",
    //orange 400
    2400: "#ED8936",
    //orange 500
    2500: "#DD6B20",
    //blue 50
    350: "#EBF8FF",
    //blue 100
    3100: "#BEE3F8",
    //blue 200
    3200: "#90CDF4",
    //green 50
    450: "#F0FFF4", 
    //green 100
    4100: "#C6F6D5", 
    //green 200
    4200: "#9AE6B4", 
    //teal 400
    5400: "#38B2AC", 
  }
};
const fonts = {
  body: "noto serif",
  heading: "noto serif",
  logo: "pacifico"
  };

const customTheme = extendTheme({ colors, fonts});

export default customTheme;