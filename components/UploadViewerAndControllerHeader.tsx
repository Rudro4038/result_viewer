"use client";

import { useState } from "react";
import {
    Typography,
    ListItem,
    ListItemText,
    IconButton,
    Collapse,
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import { ExpandLess, ExpandMore, Delete } from "@mui/icons-material";
import { UploadedFileListItem } from "@/types/UploadedFileList";
import TotalPdfViewer from "./TotalPdfViewer";
import { TableData } from "@/types/TableData";

const UploadViewerAndControllerHeader = ({
    file,
    onDelete,
}: {
    file: UploadedFileListItem;
    onDelete: (fileId: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleToggle = async () => {
        const nextOpen = !open;
        setOpen(nextOpen);

        if (nextOpen && !tableData) {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/get-uploaded-file/total-table/${file.id}`,
                );
                if (response.ok) {
                    const data = await response.json();
                    setTableData(data.data);
                } else {
                    console.error("Failed to fetch table data");
                }
            } catch (error) {
                console.error("Error fetching table data:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = (confirmed: boolean) => {
        setConfirmOpen(false);
        if (confirmed) {
            onDelete(file.id);
        }
    };

    return (
        <>
            <ListItem>
                <ListItemText
                    primary={file.fileName}
                    secondary={`Uploaded on: ${new Date(
                        file.createdAt,
                    ).toLocaleString()}`}
                    onClick={handleToggle}
                    sx={{ cursor: "pointer" }}
                />
                <IconButton onClick={handleToggle}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={handleDeleteClick}
                >
                    <Delete />
                </IconButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0, padding: 0 }}>
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : tableData ? (
                        <TotalPdfViewer tableData={tableData} />
                    ) : (
                        <Typography sx={{ color: "text.secondary" }}>
                            No table data available for this file.
                        </Typography>
                    )}
                </Box>
            </Collapse>
            <Dialog
                open={confirmOpen}
                onClose={() => handleConfirmClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this file? This action
                        cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirmClose(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleConfirmClose(true)}
                        autoFocus
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UploadViewerAndControllerHeader;
