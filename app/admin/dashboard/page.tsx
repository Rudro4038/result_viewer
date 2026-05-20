"use client";

import { useEffect, useState } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import { User } from "@/types/user";

import Profile from "@/components/Profile";
import Notice from "@/components/Notice";
import Result from "@/components/Result";
import PdfValidator from "@/components/PdfValidator";

export default function AdminDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const mockAdminNotice =
        "Admin Notice: System maintenance is scheduled for tonight at 2 AM.";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/me", {
                    method: "GET",
                    credentials: "include", // important for cookies
                });

                if (!res.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await res.json();
                setUser(data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to load user session");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Loading state (prevents flash of admin UI)
    if (loading) {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    // Error / unauthorized state
    if (error || !user) {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box>Access denied. Please login again.</Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Profile (securely derived from session) */}
                <Profile name={user.name} id={user.id} role={user.role} />

                {/* Admin-only content safeguard */}
                {user.role === "admin" && (
                    <>
                        <Notice text={mockAdminNotice} />
                        <PdfValidator />
                    </>
                )}
                <Result />
            </Box>
        </Container>
    );
}
