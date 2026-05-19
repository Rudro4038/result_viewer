"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

interface ValidationResponse {
    attribute: string[];
    headers: string[];
}

export default function PdfValidator() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [validationResult, setValidationResult] =
        useState<ValidationResponse | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setValidationResult(null); // Reset previous results
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleValidate = async () => {
        if (!file) {
            alert("Please upload a PDF file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/validate-pdf", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data: ValidationResponse = await response.json();
                setValidationResult(data);
            } else {
                console.error("Validation failed");
            }
        } catch (error) {
            console.error("An error occurred during validation:", error);
        }
    };

    const renderTable = () => {
        if (!validationResult) return null;

        const { attribute, headers } = validationResult;
        const displayHeaders = headers.slice(0, attribute.length);

        return (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Attribute</TableCell>
                            <TableCell>Header</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attribute.map((attr, index) => (
                            <TableRow key={index}>
                                <TableCell>{attr}</TableCell>
                                <TableCell>{displayHeaders[index]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            {fileName && (
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {fileName}
                </Typography>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="contained" component="label">
                    Upload PDF
                    <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </Button>
                {file && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleValidate}
                    >
                        Validate
                    </Button>
                )}
            </Box>
            {renderTable()}
        </Paper>
    );
}
