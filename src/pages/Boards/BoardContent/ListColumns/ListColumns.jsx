import { Box, Button } from "@mui/material";

import React, { useState } from 'react'
import Column from "./Column/Column";
import { NoteAdd } from "@mui/icons-material";
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

function ListColumns({ columns }) {
    return (
        <SortableContext
            items={columns?.map(column => column._id)}
            strategy={horizontalListSortingStrategy}
        >
            <Box sx={{
                backgroundColor: "inherit",
                width: "100%",
                overflowY: "auto",
                overflowX: "auto",
                display: "flex",
                gap: 2,
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 2,
                height: "100%",
            }}>
                {columns?.map((column, index) => (
                    <Column key={index} column={column} />
                ))}
                <Box
                    sx={{
                        minWidth: 200,
                        maxWidth: 200,
                        backgroundColor: "#ffffff3d",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "6px",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <Button startIcon={<NoteAdd />} sx={{ color: "white", fontSize: 18, width: "100%" }}>Add new column</Button>
                </Box>
            </Box>
        </SortableContext>
    )
}

export default ListColumns
