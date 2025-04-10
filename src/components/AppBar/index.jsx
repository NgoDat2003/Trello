import {
  Badge,
  Box,
  Button,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import AppsIcon from "@mui/icons-material/Apps";
import WorkspaceMenu from "./Menus/WorkSpace";
import RecentMenu from "./Menus/Recent";
import StarredMenu from "./Menus/Starred";
import TemplateMenu from "./Menus/Templace";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";

export default function AppBar() {
  const { mode, setMode } = useColorScheme();
  const [user, setUser] = useState(true);
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Box
      px={2}
      sx={{
        height: (theme) => theme.trello.heightBar,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "primary.main" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SvgIcon sx={{ color: "primary.main" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2m-8.8 15.2a1.2 1.2 0 0 1-1.2 1.2H5.8c-.66 0-1.2-.54-1.2-1.2V5.8a1.2 1.2 0 0 1 1.2-1.2h3.7c.66 0 1.2.54 1.2 1.2zm8.7-5c0 .66-.54 1.2-1.2 1.2h-3.7c-.66 0-1.2-.54-1.2-1.2V5.8c0-.66.54-1.2 1.2-1.2h3.7c.66 0 1.2.54 1.2 1.2z"
              />
            </svg>
          </SvgIcon>
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            Trello
          </Typography>
          <WorkspaceMenu />
          <RecentMenu />
          <StarredMenu />
          <TemplateMenu />
          <Button variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color:"primary.main"}}/>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={toggleTheme}>
          Toggle Theme
        </Button>
        <Badge badgeContent={4} color="error">
          <NotificationsNoneIcon sx={{ color: "primary.main" }} />
        </Badge>
        <HelpOutlineIcon sx={{ color: "primary.main" }} />
        {user ? (
          <Box
            component="img"
            src="https://placehold.co/600x400"
            alt="User Avatar"
            sx={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              objectFit: "cover",
            }}
          />
        ) : (
          <>
            <Button variant="contained" color="primary">
              Login
            </Button>
            <Button variant="contained" color="secondary">
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
