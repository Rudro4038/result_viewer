// app/api/get-uploaded-file/[fileId]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import FinalTableData from "@/models/FinalTableData";
import { verifyToken } from "@/lib/authentication/jwt";
import { cookies } from "next/headers";

interface Params {
    fileId: string;
}

export async function GET(
    request: Request,
    context: { params: Promise<Params> },
) {
    try {
        const { fileId } = await context.params;
        const cookieStore = cookies();
        const token = (await cookieStore).get("auth_token");

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            );
        }
        const decodedToken = verifyToken(token.value);
        // console.log("here", fileId, decoded);

        if (!fileId) {
            return NextResponse.json(
                { success: false, error: "Uploaded File ID is required" },
                { status: 400 },
            );
        }

        await connectToDatabase();

        // Fetch the file data by token.id
        // const fileData = await FinalTableData.findById(fileId).lean();
        const fileData = await FinalTableData.findOne(
            {
                _id: fileId,
                "tableData.rows.col_2": decodedToken?.id,
            },
            {
                "tableData.rows.$": 1,
                "tableData.columns": 1,
                fileName: 1,
            },
        ).lean();
        console.log(`Fetched file data for id ${fileId}:`, fileData);

        if (!fileData) {
            return NextResponse.json(
                { success: false, error: "File not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, data: fileData.tableData });
    } catch (error: unknown) {
        console.error(
            `Failed to fetch file data for id ${(await context.params).fileId}:`,
            error,
        );
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
