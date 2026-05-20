import { Paper, Typography } from "@mui/material";

const TotalPdfViewer = () => (
    <Paper sx={{ p: 2, mt: 3, backgroundColor: "success.light" }}>
        <Typography color="white">
            PDF has been processed and is ready for final review.
        </Typography>
    </Paper>
);

export default TotalPdfViewer;
