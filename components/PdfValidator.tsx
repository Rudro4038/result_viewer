"use client";

import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import HeaderFinaliser from "./HeaderFinaliser";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";
import TotalPdfViewer from "@/components/TotalPdfViewer";

export default function PdfValidator() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [uuid, setUuid] = useState<string | null>(null);
    const [validationResult, setValidationResult] =
        useState<ValidationResponseForTable | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            handleReset(); // Reset state before assigning new file
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleValidate = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/validate-pdf/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setUuid(data.uuid);
                setValidationResult(data.header_json_list);
                setStep(2);
            } else {
                console.error("Validation failed");
            }
        } catch (error) {
            console.error("An error occurred during validation:", error);
        }
    };

    const handleConfirmHeader = async () => {
        if (!uuid || !validationResult) return;

        try {
            const response = await fetch("/api/validate-pdf/header_approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uuid: uuid,
                    updated_Rows: validationResult,
                }),
            });

            if (response.ok) {
                setStep(3);
            } else {
                console.error("Header confirmation failed");
            }
        } catch (error) {
            console.error(
                "An error occurred during header confirmation:",
                error,
            );
        }
    };

    const handleFinalCommit = async () => {
        if (!uuid) return;

        try {
            const response = await fetch("/api/validate-pdf/final_approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ validationId: uuid }),
            });

            if (response.ok) {
                alert("Process complete! Data saved to production.");
                handleReset();
            } else {
                console.error("Final commit failed");
            }
        } catch (error) {
            console.error("An error occurred during final commit:", error);
        }
    };

    const handleReset = () => {
        setStep(1);
        setFile(null);
        setFileName("");
        setUuid(null);
        setValidationResult(null);
    };

    const renderMainButton = () => {
        if (!file) return null;

        switch (step) {
            case 1:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleValidate}
                    >
                        Validate PDF
                    </Button>
                );
            case 2:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirmHeader}
                    >
                        Confirm Header
                    </Button>
                );
            case 3:
                return (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleFinalCommit}
                    >
                        Confirm
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            {fileName && (
                <Typography variant="h5" sx={{ mb: 3 }}>
                    {fileName}
                </Typography>
            )}

            <Box
                sx={{
                    border: "2px dashed",
                    borderColor: "primary.main",
                    borderRadius: 3,
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.2s ease",
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                    "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.08)",
                    },
                }}
                onClick={() => document.getElementById("pdf-upload")?.click()}
            >
                <input
                    id="pdf-upload"
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                <Typography variant="h6" sx={{ mb: 1 }}>
                    📄 Upload PDF File
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Drag & drop your PDF here or click to browse
                </Typography>
                {fileName && (
                    <Box
                        sx={{
                            mt: 2,
                            display: "inline-block",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            backgroundColor: "primary.main",
                            color: "white",
                            fontSize: "0.85rem",
                        }}
                    >
                        {fileName}
                    </Box>
                )}
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                {renderMainButton()}
                {file && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                )}
            </Box>

            {step === 2 && (
                <HeaderFinaliser
                    validationResult={validationResult}
                    setValidationResult={setValidationResult}
                />
            )}

            {step === 3 && <TotalPdfViewer />}
        </Paper>
    );
}
