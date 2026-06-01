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

        if (decodedToken?.role !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        if (!fileId) {
            return NextResponse.json(
                { success: false, error: "Uploaded File ID is required" },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const fileData = await FinalTableData.findById(fileId).lean();

        if (!fileData) {
            return NextResponse.json(
                { success: false, error: "File not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, data: fileData.tableData });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        console.error(
            `Failed to fetch file data for id ${(await context.params).fileId}:`,
            errorMessage,
        );
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
