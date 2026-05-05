"use client";

import { Box, Container, Typography } from "@mui/material";
import Profile from "@/components/Profile";
import Notice from "@/components/Notice";
import Publish from "@/components/Publish";
import Result from "@/components/Result";

export default function AdminDashboardPage() {
    const mockAdminId = "admin-001";
    const mockAdminRole = "Admin";

    const mockAdminNotice =
        "Admin Notice: System maintenance is scheduled for tonight at 2 AM.";

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    <b>{(mockAdminRole)} Dashboard</b>
                </Typography>

                {/* Profile Component */}
                <Profile id={mockAdminId} role={mockAdminRole} />

                {/* Notice Component */}
                <Notice text={mockAdminNotice} />

                {/* Publish Component */}
                <Publish />

                {/* Result Component */}
                <Result />
            </Box>
        </Container>
    );
}