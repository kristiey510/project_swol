import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/noto-serif"
import "@fontsource/pacifico"

import App from "./App";
import customTheme from "./utils/theme";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
