import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function WorkspaceMenu() {
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
      >
        Workspace
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Workspace 1</MenuItem>
        <MenuItem onClick={handleClose}>Workspace 2</MenuItem>
        <MenuItem onClick={handleClose}>Workspace 3</MenuItem>
      </Menu>
    </>
  );
}