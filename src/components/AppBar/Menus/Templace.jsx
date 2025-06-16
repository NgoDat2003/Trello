import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function TemplateMenu() {
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
        style={{ color: "primary.main" }}
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
         sx={{
          color: "white"
        }}
      >
        Template
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Template 1</MenuItem>
        <MenuItem onClick={handleClose}>Template 2</MenuItem>
        <MenuItem onClick={handleClose}>Template 3</MenuItem>
      </Menu>
    </>
  );
}