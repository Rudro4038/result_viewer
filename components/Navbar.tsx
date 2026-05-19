"use client";

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar({ role }: { role: string }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();

        // Logout logic
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            const result = await response.json();

            if (result.success) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AppBar
            position="static"
            elevation={1}
            className="mb-2 rounded-xl bg-white text-black"
        >
            <Toolbar className="flex justify-between">
                <Typography variant="h6" component="h1" className="font-bold">
                    {role} Dashboard
                </Typography>

                <Box>
                    <IconButton
                        onClick={handleOpen}
                        className="transition-transform duration-200 hover:scale-110"
                    >
                        <Avatar alt="Profile" src="" className="h-10 w-10" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
