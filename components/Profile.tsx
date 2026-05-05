"use client";

import { Avatar, Box, Paper, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

interface ProfileProps {
    id: string;
    role: string;
}

export default function Profile({ id, role }: ProfileProps) {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 2,
                animation: `${fadeIn} 0.5s ease-out`,
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
            }}
        >
            <Avatar sx={{ bgcolor: "primary.main" }}>
                {id.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    <b>Registration:</b> 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Role: {role}
                </Typography>
            </Box>
        </Paper>
    );
}