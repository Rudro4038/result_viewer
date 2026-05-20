"use client";

import { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import RenderTable from "./RenderTable";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

export default function PdfValidator() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [validationResult, setValidationResult] =
        useState<ValidationResponseForTable | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setValidationResult(null);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    useEffect(() => {
        console.log(validationResult);
    }, [validationResult]);

    const handleValidate = async () => {
        if (!file) {
            alert("Please upload a PDF file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/validate-pdf/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data: ValidationResponseForTable = await response.json();
                setValidationResult(data);
            } else {
                console.error("Validation failed");
            }
        } catch (error) {
            console.error("An error occurred during validation:", error);
        }
    };

    const handleReset = () => {
        setFile(null);
        setFileName("");
        setValidationResult(null);
    };

    return (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            {/* TITLE */}
            {fileName && (
                <Typography variant="h5" sx={{ mb: 3 }}>
                    {fileName}
                </Typography>
            )}

            {/* UPLOAD ZONE (DROPZONE STYLE) */}
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
                    width: "100%",
                    position: "relative",
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

            {/* ACTION BUTTONS */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                {file && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleValidate}
                    >
                        Validate PDF
                    </Button>
                )}

                {file && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                )}
            </Box>

            {/* RESULT TABLE */}
            <RenderTable
                validationResult={validationResult}
                setValidationResult={setValidationResult}
            />
        </Paper>
    );
}
