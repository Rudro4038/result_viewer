"use client";

import { Box, Container, Typography } from "@mui/material";
import Profile from "@/components/Profile";
import Notice from "@/components/Notice";
import Result from "@/components/Result";

export default function UserDashboardPage() {
    const mockUserId = "user-12345";
    const mockNotice = "Welcome to your dashboard. All systems are running smoothly.";

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Dashboard
                </Typography>

                {/* Profile Component */}
                <Profile id={mockUserId} />

                {/* Notice Component */}
                <Notice text={mockNotice} />

                {/* Result Component */}
                <Result />
            </Box>
        </Container>
    );
}