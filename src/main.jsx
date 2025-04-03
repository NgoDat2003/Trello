import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Experimental_CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
    </Experimental_CssVarsProvider>
  </StrictMode>
);