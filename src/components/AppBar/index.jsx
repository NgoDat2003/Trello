import {
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Close, DarkMode, LibraryAdd, WbSunny } from "@mui/icons-material";

export default function AppBar() {
  const { mode, setMode } = useColorScheme();
  const [user, setUser] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [moreAnchor, setMoreAnchor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMoreOpen = (event) => {
    setMoreAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchor(null);
  };

  return (
    <Box
      px={2}
      sx={{
        height: (theme) => theme.trello.heightBar,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "#1565c0"
            : "#2c3e50",
      }}
    >
      {/* Logo Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "white" }} />
        <Typography
          variant="h6"
          sx={{
            color: "white",
            display: { xs: "none", sm: "block" }, // Ẩn logo trên màn hình nhỏ
          }}
        >
          Trello
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <WorkspaceMenu />
          <RecentMenu />
          <StarredMenu />
          <TemplateMenu />
          <Button variant="outlined" sx={{
            color: "white",
            border: "none",
            "&:hover": {
              border: "none",

            },
          }}
            startIcon={<LibraryAdd />}>Create</Button>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" }, // Hiển thị trên màn hình nhỏ
            alignItems: "center",
          }}
        >
          <Button
            sx={{ color: "white" }}
            onClick={handleMoreOpen}
            variant="outlined"
          >
            <Typography variant="body2">Menu</Typography>
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={moreAnchor}
            open={Boolean(moreAnchor)}
            onClose={handleMoreClose}
          >
            <MenuItem >
              <WorkspaceMenu />
            </MenuItem>
            <MenuItem >
              <RecentMenu />
            </MenuItem>
            <MenuItem >
              <StarredMenu />
            </MenuItem>
            <MenuItem >
              <TemplateMenu />
            </MenuItem>

            <MenuItem >
              <Button variant="outlined" sx={{
                color: "white"
              }}
                startIcon={<LibraryAdd />}>Create</Button>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // Hiển thị trên màn hình nhỏ
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            size="small"
            sx={{
              width: 160, color: "white",
              "& label": { color: "white" },
              "& input": { color: "white" },
              "& label.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white", cursor: "pointer" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={() => setSearchValue("")}>
                  <IconButton>
                    <Close sx={{ color: searchValue ? "white" : "transparent", cursor: "pointer" }} fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Search"
          />
          <Button
            variant="contained"
            onClick={toggleTheme}
            sx={{ width: 150, border: "1px solid #white", boxShadow: "none" }}
            startIcon={mode === "light" ? <WbSunny /> : <DarkMode />}

          >
            {mode === "light" ? "Light" : "Dark"}
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" }, // Hiển thị trên màn hình nhỏ
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleMenuOpen}>
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{ width: 200 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </MenuItem>
            <MenuItem>
              <Button
                variant="contained"
                onClick={toggleTheme}
                sx={{ width: 200 }}
              >
                Toggle Theme
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Badge color="warning" variant="dot" overlap="circular">
          <NotificationsNoneIcon sx={{ color: "white" }} />
        </Badge>
        <HelpOutlineIcon sx={{ color: "white" }} />
        {user ? (
          <Box
            component="img"
            src="https://placehold.co/600x400"
            alt="User Avatar"
            sx={{
              borderRadius: "50%",
              width: 34,
              height: 34,
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
