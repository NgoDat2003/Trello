import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Container } from "@mui/material";
import AppBar from "~/components/AppBar";
import BoardBar from "~/components/AppBar/BoardBar/BoardBar";
export default function Boards() {
  return (
    <Container maxWidth={false} disableGutters sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar />
      <Box
        sx={{
          padding: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#3498db"
              : "#34495e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: (theme) =>
            `calc(100vh - ${theme.trello.heightHeader + theme.trello.heightBar
            }px)`,
        }}
      >
        <Typography variant="h2">Content</Typography>
        <Typography variant="body1">This is some content.</Typography>
      </Box>
    </Container>
  );
}
