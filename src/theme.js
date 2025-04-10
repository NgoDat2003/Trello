import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { red, blue, grey } from "@mui/material/colors";

const theme = extendTheme({
  trello: {
    heightBar: 58,
    heightHeader: 60,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[700],
        },
        secondary: {
          main: grey[800], 
        },
        error: {
          main: red.A400,
        },
        background: {
          default: "#ffffff",
          paper: "#f5f5f5",
        },
        text: {
          primary: grey[900],
          secondary: grey[600],
        },
        common: {
          black: "#000000",
          white: "#ffffff", 
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[200], 
        },
        secondary: {
          main: grey[500], 
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
        common: {
          black: "#000000", // Định nghĩa màu đen
          white: "#ffffff", // Định nghĩa màu trắng
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => ( {
          color:theme.palette.primary.main,
          fontSize: "1rem",
          'MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          "& fieldset": {
            borderWidth: "1px !important",
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.primary.main,
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
  },
});

export default theme;