"use client";

import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const messages = [
    "PDF is being processed...",
    "Removing extra info...",
    "Just a few more seconds...",
];

export default function LoadingSpinner() {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex(
                (prevIndex) => (prevIndex + 1) % messages.length,
            );
        }, 5000); // Change message every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {messages[currentMessageIndex]}
            </Typography>
        </Box>
    );
}
