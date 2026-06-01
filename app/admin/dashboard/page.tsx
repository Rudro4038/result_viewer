"use client";

import { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { User } from "@/types/user";

import Profile from "@/components/Profile";
import Notice from "@/components/Notice";
import Results from "@/components/Results";
import PdfValidator from "@/components/PdfValidator";
import { UploadedFileList } from "@/types/UploadedFileList";

export default function AdminDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileList>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const mockAdminNotice =
        "Admin Notice: System maintenance is scheduled for tonight at 2 AM.";

    useEffect(() => {
        console.log(uploadedFiles);
    }, [uploadedFiles]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch user session
                const userRes = await fetch("/api/me", {
                    method: "GET",
                    credentials: "include",
                });
                if (!userRes.ok) {
                    throw new Error("Unauthorized");
                }
                const userData = await userRes.json();
                setUser(userData);

                // Fetch uploaded files
                const filesRes = await fetch(
                    "/api/get-uploaded-file/get-header-list",
                );
                if (filesRes.ok) {
                    const filesData = await filesRes.json();
                    setUploadedFiles(filesData.data);
                } else {
                    console.error("Failed to fetch uploaded files");
                }
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error ? error.message : String(error);
                setError("Failed to load initial data" + errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Loading state
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

                {user.role === "admin" && (
                    <>
                        <Notice text={mockAdminNotice} />
                        <PdfValidator />
                    </>
                )}
                <Results results={uploadedFiles} />
            </Box>
        </Container>
    );
}
