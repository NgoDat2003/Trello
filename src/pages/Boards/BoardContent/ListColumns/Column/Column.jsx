import { DragHandle, MoreHoriz } from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Button } from "@mui/material";
import React, { useState } from 'react'
import ListCard from "./ListCard/ListCard"
import { sortCardsByOrder } from "~/ultis/sorts";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const heightFooterColumn = "50px"
function Column({ column }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    column.cards = sortCardsByOrder(column.cards, column.cardOrderIds, "_id");


    const { attributes, listeners, setNodeRef, transform, transition,isDragging } = useSortable({ id: column._id, data: { ...column } });

    const dndStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        // touchAction: "none",
        height: "100%",
        opacity: isDragging ? 0.5 : undefined,
    };


    return (
        <div ref={setNodeRef} style={dndStyle} {...attributes} 
        >
            <Box sx={{
                minWidth: 300, maxWidth: 300, backgroundColor: theme => theme.palette.mode === "light" ? "#bebccf" : "#333643", display: "flex", flexDirection: "column", borderRadius: 2
            }}
                {...listeners}
            >
                <Box
                    sx={{
                        padding: "8px 16px", display: "flex", alignItems: "center",
                        justifyContent: "space-between", height: "fit-content",
                    }}>
                    <Typography variant="h6" color="white">
                        {column?.title || "Untitled Column"}
                    </Typography>
                    <Tooltip title="More options">
                        <IconButton onClick={handleOpenMenu}>
                            <MoreHoriz sx={{ color: "white" }} />
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <AddCardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Add card" />
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Remove list" />
                        </MenuItem>
                    </Menu>
                </Box>
                <ListCard column={column} />

                <Box sx={{ padding: 2, display: "flex", alignItems: "center", justifyContent: "space-between", height: heightFooterColumn }} >
                    <Button startIcon={<AddCardIcon />} >
                        Add New Card
                    </Button>
                    <Tooltip title="Drag to move">
                        <DragHandle sx={{ color: "white", cursor: "pointer" }} />
                    </Tooltip>
                </Box>
            </Box>
        </div>
    )
}

export default Column
