import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { red, blue, grey } from "@mui/material/colors";

const theme = extendTheme({
  trello: {
    heightBar: 48,
    heightHeader: 64,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[700], // Màu primary cho light mode
        },
        secondary: {
          main: grey[800], // Màu secondary cho light mode
        },
        error: {
          main: red.A400,
        },
        background: {
          default: "#ffffff", // Màu nền cho light mode
          paper: "#f5f5f5",
        },
        text: {
          primary: grey[900],
          secondary: grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[200], // Màu primary cho dark mode
        },
        secondary: {
          main: grey[500], // Màu secondary cho dark mode
        },
        error: {
          main: red.A400,
        },
        background: {
          default: "#121212", // Màu nền cho dark mode
          paper: "#1e1e1e",
        },
        text: {
          primary: grey[100],
          secondary: grey[400],
        },
      },
    },
  },
});

export default theme;
