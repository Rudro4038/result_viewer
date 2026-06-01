"use client";

import { Paper, Typography, List, Divider } from "@mui/material";
import { UploadedFileList } from "@/types/UploadedFileList";
import UploadViewerAndControllerHeader from "./UploadViewerAndControllerHeader";

interface UploadedHeadersProps {
    files: UploadedFileList;
    onDelete: (fileId: string) => void;
}

export default function UploadedHeaders({
    files,
    onDelete,
}: UploadedHeadersProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 3,
                borderRadius: 2,
                minHeight: 150,
                backgroundColor: "transparent",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Uploaded Files
            </Typography>
            {files.length > 0 ? (
                <List>
                    {files.map((file, index) => (
                        <div key={file.id}>
                            <UploadViewerAndControllerHeader
                                file={file}
                                onDelete={onDelete}
                            />
                            {index < files.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>
            ) : (
                <Typography sx={{ textAlign: "center", mt: 2 }}>
                    No files have been uploaded yet.
                </Typography>
            )}
        </Paper>
    );
}
