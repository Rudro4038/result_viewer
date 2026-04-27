"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Collapse,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default function Publish() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
                animation: `${fadeIn} 0.9s ease-in`,
            }}
        >
            <Button
                variant="contained"
                onClick={handleToggle}
                fullWidth
                sx={{ mb: open ? 2 : 0 }}
            >
                {open ? "Close Publisher" : "Open Publisher"}
            </Button>
            <Collapse in={open}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Typography variant="h6">Publish Content</Typography>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Button variant="outlined" color="primary">
                        Publish Now
                    </Button>
                </Box>
            </Collapse>
        </Paper>
    );
}