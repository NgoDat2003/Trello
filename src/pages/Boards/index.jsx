import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container } from "@mui/material";
export default function Boards() {
    const { mode, setMode } = useColorScheme(); // Lấy chế độ hiện tại và hàm thay đổi chế độ
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const toggleTheme = () => {
      setMode(mode === "light" ? "dark" : "light"); // Chuyển đổi giữa light và dark mode
    };
  return (
    <Container maxWidth={false}disableGutters sx={{height: "100vh"}}>
    <Box sx={{
      height:(theme) => theme.trello.heightHeader,
      backgroundColor: "primary.main",
      display: "flex",
      alignItems: "center",
    }}>
      header
    </Box>
    <Box sx={
      {
        height: (theme) => theme.trello.heightBar,
        backgroundColor: "secondary.main",
        display: "flex",
        alignItems: "center",
      }
    }>
      <Button variant="contained" onClick={toggleTheme}>
        Toggle Theme
      </Button>
      <Typography variant="body1">
        Current mode: {mode}
      </Typography>
      <Typography variant="body1">
        Prefers dark mode: {prefersDarkMode ? 'Yes' : 'No'}
      </Typography>
    </Box>
    <Box sx={{
      padding: 2,
      backgroundColor: "background.paper",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: (theme) => `calc(100vh - ${theme.trello.heightHeader + theme.trello.heightBar}px)`, 
    }}>
      <Typography variant="h2">Content</Typography>
      <Typography variant="body1">
        This is some content.
      </Typography>
    </Box>

  </Container>
  )
}
