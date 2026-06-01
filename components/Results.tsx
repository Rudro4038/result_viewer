"use client";

import { Paper, Typography, List, Divider } from "@mui/material";
import { ResultItem } from "@/components/ResultItem";
import { UploadedFileList } from "@/types/UploadedFileList";

export default function Results({ results }: { results: UploadedFileList }) {
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
                Previous Results
            </Typography>
            {results.length > 0 ? (
                <List>
                    {results.map((file, index) => (
                        <div key={file.id}>
                            <ResultItem file={file} />
                            {index < results.length - 1 && <Divider />}
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
