import { useState } from "react";
import {
    Typography,
    ListItemButton,
    ListItemText,
    Box,
    Collapse,
    CircularProgress,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { UploadedFileListItem } from "@/types/UploadedFileList";
import TotalPdfViewer from "@/components/TotalPdfViewer";
import { TableData } from "@/types/TableData";

export const ResultItem = ({ file }: { file: UploadedFileListItem }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableData | null>(null);

    const handleClick = async () => {
        const nextOpen = !open;
        setOpen(nextOpen);

        if (nextOpen && !tableData) {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/get-uploaded-file/${file.id}`,
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

    return (
        <Box>
            <ListItemButton onClick={handleClick}>
                <ListItemText
                    primary={file.fileName}
                    secondary={`Uploaded on: ${new Date(
                        file.createdAt,
                    ).toLocaleString()}`}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
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
        </Box>
    );
};
