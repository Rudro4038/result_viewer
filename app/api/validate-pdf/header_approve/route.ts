import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import TemporaryValidation, {
    ITemporaryValidation,
} from "@/models/TemporaryValidation";

interface Header {
    id: number;
    header: string;
    isTaken: boolean;
    primary_key?: boolean;
}

interface Cell {
    id: number;
    value: string;
}

export async function POST(request: Request) {
    try {
        const {
            uuid,
            updated_header_list,
        }: { uuid: string; updated_header_list: Header[] } =
            await request.json();

        if (!uuid || !updated_header_list) {
            return NextResponse.json(
                { error: "Missing uuid or updated_header_list" },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const tempValidation: ITemporaryValidation | null =
            await TemporaryValidation.findOne({ uuid });

        if (!tempValidation) {
            return NextResponse.json(
                { error: "Document not found" },
                { status: 404 },
            );
        }

        const rawPdfData = tempValidation.rawPdfData;

        if (!Array.isArray(rawPdfData)) {
            return NextResponse.json(
                { error: "Invalid rawPdfData format" },
                { status: 400 },
            );
        }

        // 1. Filter and Process Headers
        const validHeaders = updated_header_list.filter(
            (h: Header) => h.isTaken,
        );

        // 2. Construct the `columns` Array
        const columns = validHeaders.map((h) => {
            const key = `col_${h.id}`;
            return { key, header: h.header };
        });

        // 3. Identify the Primary Key
        let primary_key_id: number | null = null;
        for (const row of rawPdfData) {
            for (const cell of row) {
                if (cell.value && /337/.test(cell.value)) {
                    primary_key_id = cell.id;
                    break;
                }
            }
            if (primary_key_id) {
                break;
            }
        }

        const primary_key = primary_key_id ? `col_${primary_key_id}` : "";

        // 4. Construct the `rows` Array
        const idToKeyMap = new Map(
            validHeaders.map((h) => [h.id, `col_${h.id}`]),
        );

        const rows = rawPdfData.map((row: Cell[], rowIndex) => {
            const rowObject: { [key: string]: string | number } = {
                row_id: `row_${rowIndex}`,
            };

            row.forEach((cell: Cell) => {
                const key = idToKeyMap.get(cell.id);
                // This check ensures that key is a string, not undefined
                if (key) {
                    rowObject[key] = cell.value;
                }
            });

            return rowObject;
        });

        // 4. Final Assembly and Response
        const tableData = {
            primary_key,
            columns,
            rows,
        };

        tempValidation.tableData = tableData;
        await tempValidation.save();

        return NextResponse.json(tableData);
    } catch (err) {
        console.error("Error in header_approve route:", err);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 },
        );
    }
}
