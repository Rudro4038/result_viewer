"use client";

import { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { User } from "@/types/user";

import Profile from "@/components/Profile";
import Notice from "@/components/Notice";
import Results from "@/components/Results";
import { UploadedFileList } from "@/types/UploadedFileList";

export default function StudentDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileList>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const mockUserNotice =
        "Welcome to your student dashboard. Check your uploaded results below.";

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const userRes = await fetch("/api/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (!userRes.ok) {
                    throw new Error("Unauthorized");
                }

                const userData = await userRes.json();
                setUser(userData);

                const filesRes = await fetch(
                    "/api/get-uploaded-file/get-header-list",
                );

                if (!filesRes.ok) {
                    throw new Error("Failed to fetch uploaded files");
                }

                const filesData = await filesRes.json();
                setUploadedFiles(filesData.data || []);
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error ? error.message : String(error);
                setError("Failed to load dashboard data: " + errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

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
                <Typography>
                    {error || "Access denied. Please login again."}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Profile name={user.name} id={user.id} role={user.role} />
                <Notice text={mockUserNotice} />
                <Results results={uploadedFiles} />
            </Box>
        </Container>
    );
}
