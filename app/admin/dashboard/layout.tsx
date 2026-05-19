import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar role="Admin" />
            <div>{children}</div>
            <Footer />
        </>
    );
}
