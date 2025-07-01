import { AttachEmail, Comment, Group } from "@mui/icons-material";
import { Typography, Button, CardMedia, Card, CardContent, CardActions } from "@mui/material";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react'

function Cards({ card }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card._id, data: { ...card } });
    if (card.FE_Placeholder) {
        return (
            <Card
                ref={setNodeRef}
                style={{
                    visibility: 'hidden',
                    height: 1,
                    border: '1px dashed lightgray',
                    pointerEvents: 'none' // đảm bảo không bị hover
                }}
                {...attributes}
                {...listeners}
            >
                {/* Bạn có thể render thêm text nhưng dùng visibility hidden thì không thấy */}
            </Card>
        );
    }

    const dndStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        // touchAction: "none",
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? "1px solid #2ecc71" : undefined,
        zIndex: isDragging ? 999 : 'auto',
        cursor: 'grab',
    };
    const condition = !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length;
    return (
        <Card
            ref={setNodeRef} style={dndStyle} {...attributes} {...listeners}
            sx={{
                overflow: "unset", boxShadow: "0 1px 1px rgba(0,0,0,0.2)", width: "100%",
                // display: card.FE_Placeholder ? "none" : "block",
                visibility: card.FE_Placeholder ? "hidden" : "visible",
            }} id={card?.id}>
            {card?.cover && (
                <CardMedia
                    sx={{ height: 140 }}
                    image={card?.cover}
                    title="green iguana"
                />
            )}
            <CardContent sx={{ '&:last-child': { paddingBottom: "12px" } }}>
                <Typography >
                    {card?.title}
                </Typography>
            </CardContent>
            {
                condition &&
                <CardActions>
                    {
                        !!card?.memberIds?.length &&
                        <Button size="small" startIcon={<Group />}>{card?.memberIds?.length ?? 0}</Button>
                    }
                    {
                        !!card?.comments?.length &&
                        <Button size="small" startIcon={<Comment />}>{card?.comments?.length ?? 0}</Button>
                    }
                    {
                        !!card?.attachments?.length &&
                        <Button size="small" startIcon={<AttachEmail />}>{card?.attachments?.length ?? 0}</Button>
                    }
                </CardActions>
            }

        </Card>
    )
}

export default Cards
