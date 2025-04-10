import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Container } from "@mui/material";
import AppBar from "~/components/AppBar";
export default function Boards() {
  return (
    <Container maxWidth={false} disableGutters sx={{ height: "100vh" }}>
      <AppBar />
      <Box
        sx={{
          height: (theme) => theme.trello.heightBar,
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button variant="contained">Button</Button>
        <Typography variant="body1">Current mode: </Typography>
        <Typography variant="body1">Prefers dark mode: </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: (theme) =>
            `calc(100vh - ${
              theme.trello.heightHeader + theme.trello.heightBar
            }px)`,
        }}
      >
        <Typography variant="h2">Content</Typography>
        <Typography variant="body1">This is some content.</Typography>
      </Box>
    </Container>
  );
}
