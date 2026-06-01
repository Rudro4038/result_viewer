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

type FormMode = "login" | "signup";

export default function LoginPage() {
    const [mode, setMode] = useState<FormMode>("login");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
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

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        if (result.role === "admin") {
            router.push("/admin/dashboard");
        } else {
            router.push("/student/dashboard");
        }
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }

        const response = await fetch(`/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userId,
                name,
                password,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Sign up failed");
        }

        // Switch to login mode after successful signup
        setMode("login");
        setError(""); // Clear previous errors
        // Optionally show a success message
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (mode === "login") {
            if (!userId || !password) {
                setError("Please enter both User ID and Password.");
                return;
            }
        } else {
            if (!name || !userId || !password || !confirmPassword) {
                setError("Please fill in all fields.");
                return;
            }
        }

        setLoading(true);

        try {
            if (mode === "login") {
                await handleLogin();
            } else {
                await handleSignUp();
            }
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred.";
            console.error(`${mode} failed:`, err);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
        setError("");
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
                    {mode === "login" ? "Login" : "Sign Up"}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    {mode === "signup" && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Registration ID"
                        autoFocus={mode === "login"}
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {mode === "signup" && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : mode === "login" ? (
                            "Sign In"
                        ) : (
                            "Sign Up"
                        )}
                    </Button>

                    <Link
                        href="#"
                        variant="body2"
                        onClick={toggleMode}
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                textDecoration: "underline",
                                color: "primary.dark",
                            },
                        }}
                    ></Link>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        {mode === "login" ? (
                            <>
                                <Typography variant="body2" align="left">
                                    Don&apos;t have an account?
                                </Typography>
                                <Link href="/signup" underline="hover">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Typography variant="body2" align="left">
                                    Already have an account?
                                </Typography>
                                <Link href="/login" underline="hover">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
