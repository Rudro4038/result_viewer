export interface TableData {
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
