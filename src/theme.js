import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { red, blue, grey } from "@mui/material/colors";
const HEIGHT_BAR = "58px";
const HEIGHT_HEADER = "60px";
const HEIGHT_CONTENT = `calc(100vh - ${HEIGHT_HEADER} - ${HEIGHT_BAR})`;

const theme = extendTheme({
  trello: {
    heightBar: HEIGHT_BAR,
    heightHeader: HEIGHT_HEADER,
    heightContent: HEIGHT_CONTENT,
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: "#00bfa5",
        // },
        // secondary: {
        //   main: grey[800], 
        // },
        // error: {
        //   main: red.A400,
        // },
        // background: {
        //   default: "#ffffff",
        //   paper: "#f5f5f5",
        // },
        // text: {
        //   primary: grey[900],
        //   secondary: grey[600],
        // },
        // common: {
        //   black: "#000000",
        //   white: "#ffffff", 
        // },
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
          },
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color:theme.palette.primary.main,
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
          "& fieldset": { borderWidth: "1px !important", },
          "&:hover fieldset": { borderWidth: "2px !important", },
          "&.Mui-focused fieldset": { borderWidth: "1px !important", },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        

        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        

        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "1px",
          },
        }),
      },
    },
  },
});

export default theme;