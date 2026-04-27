"use client";

import { Paper, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface NoticeProps {
    text: string;
}

export default function Notice({ text }: NoticeProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 2,
                animation: `${fadeIn} 0.7s ease-in`,
            }}
        >
            <Typography variant="body1">{text}</Typography>
        </Paper>
    );
}