import theme from "~/theme";
import { Box } from "@mui/material";
import Cards from "./Card/Cards";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';



import React, { useEffect, useState } from 'react'
const heghtHeaderColumn = "50px"
const heightFooterColumn = "50px"
function ListCard({ column }) {
    return (
        <SortableContext
            items={column?.cards?.map(c => c._id)}
            strategy={verticalListSortingStrategy}
        > <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto", gap: 2, overflowX: "hidden",
                maxHeight: `calc(${theme.trello.heightContent} - ${theme.spacing(5)} - ${heghtHeaderColumn} - ${heightFooterColumn})`,
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ced0da',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#bfc2cf',
                },
                p: "0 5px",
                m: "0 5px",
            }}>
                {column?.cards?.map((card, index) => (
                    <Cards key={index} card={card} />
                ))}
            </Box></SortableContext>

    )
}

export default ListCard
