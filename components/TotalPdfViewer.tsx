import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

interface TableData {
    primary_key: string;
    columns: {
        key: string;
        header: string;
    }[];
    rows: {
        row_id: string;
        [key: string]: string;
    }[];
}

interface TotalPdfViewerProps {
    tableData: TableData;
}

const TotalPdfViewer = ({ tableData }: TotalPdfViewerProps) => {
    if (!tableData || !tableData.columns || !tableData.rows) {
        return (
            <Paper sx={{ p: 2, mt: 3, backgroundColor: "warning.light" }}>
                <Typography color="white">No table data to display.</Typography>
            </Paper>
        );
    }

    const { columns, rows } = tableData;

    return (
        <Paper sx={{ p: 2, mt: 3 }} variant="outlined">
            <Typography variant="h6" gutterBottom>
                Final Review
            </Typography>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {column.header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.row_id}
                                hover
                                role="checkbox"
                                tabIndex={-1}
                            >
                                {columns.map((column) => {
                                    const value = row[column.key];
                                    return (
                                        <TableCell key={column.key}>
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TotalPdfViewer;
