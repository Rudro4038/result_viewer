"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from "@mui/material";
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

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userId) {
            alert("Please enter a User ID.");
            return;
        }

        try {
            const response = await fetch(`/api/login/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();
            console.log("Login result:", result);
            // Here you can handle the login result, e.g., redirect on success
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    animation: `${fadeIn} 0.5s ease-out`,
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="User ID"
                        name="userId"
                        autoComplete="username"
                        autoFocus
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                transition: "all 0.3s ease-in-out",

                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },

                                "&.Mui-focused": {
                                    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                                },

                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                transition: "all 0.3s ease-in-out",

                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },

                                "&.Mui-focused": {
                                    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                                },

                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Link
                        href="#"
                        variant="body2"
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                                color: "primary.dark",
                            },
                        }}
                    >
                        Forgot Password?
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

