"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";

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
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!userId || !password) {
            setError("Please enter both User ID and Password.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    password,
                }),
            });

            const result = await response.json();
            console.log("Login response:", result);
            console.log("Role response:", result.role);

            if (!response.ok) {
                setError(result.message || "Login failed");
                return;
            }

            // Success → redirect based on role
            if (result.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: "flex",
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
                    width: "100%",
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    {/* USER ID */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="User ID"
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
                                    boxShadow:
                                        "0 0 0 2px rgba(25, 118, 210, 0.2)",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    {/* PASSWORD */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                transition: "all 0.3s ease-in-out",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                                "&.Mui-focused": {
                                    boxShadow:
                                        "0 0 0 2px rgba(25, 118, 210, 0.2)",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    {/* BUTTON */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Sign In"
                        )}
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
