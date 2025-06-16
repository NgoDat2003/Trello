import { AddToDrive, BoltOutlined, Dashboard, FilterList, LibraryAdd, PersonAdd, VpnLock } from '@mui/icons-material'
import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip, Typography } from '@mui/material'
import React from 'react'
const MenuStyle = {
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    paddingX: "5px",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "primary",
        color: "white",
        "& .MuiChip-icon": {
            color: "white"
        }
    },
    "& .MuiChip-icon": {
        color: "white"
    }
}
function BoardBar() {
    return (
        <Box
            sx={{
                height: (theme) => theme.trello.heightBar,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid white",
                justifyContent: "space-between",
                paddingX: 2,
                gap: 2,
                overflowX: "auto",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? "#3498db"
                        : "#34495e",

            }}
        >
            <Box px={2} sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                <Chip label="Clickable" icon={<Dashboard />} clickable sx={MenuStyle} />
                <Chip label="Public/Private Workspace" icon={<VpnLock />} clickable sx={MenuStyle} />
                <Chip label="Add to Google Drive" icon={<AddToDrive />} clickable sx={MenuStyle} />
                <Chip label="Automation" icon={<BoltOutlined />} clickable sx={MenuStyle} />
                <Chip label="Filters" icon={<FilterList />} clickable sx={MenuStyle} />
            </Box>
            <Box px={2} sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                <Button variant="outlined" sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                        borderColor: "white",
                    }
                }} startIcon={<PersonAdd />}>Invite</Button>
                <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32,border:"none" },gap:"10px" }}>
                    <Tooltip title="User 1">
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Tooltip>
                    <Tooltip title="User 2">
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </Tooltip>
                    <Tooltip title="User 3">
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </Tooltip>
                    <Tooltip title="User 4">
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    </Tooltip>
                    <Tooltip title="User 5">
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar
