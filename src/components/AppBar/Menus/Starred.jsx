import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function StarredMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        style={{color:"primary.main"}}
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
           sx={{
          color:"white"
        }}
      >
        Starred
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Starred Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Starred Item 2</MenuItem>
        <MenuItem onClick={handleClose}>Starred Item 3</MenuItem>
      </Menu>
    </>
  );
}