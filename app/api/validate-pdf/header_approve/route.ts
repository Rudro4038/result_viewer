import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import TemporaryValidation from "@/models/TemporaryValidation";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

interface HeaderApproveRequestBody {
    validationId: string;
    updatedRows: ValidationResponseForTable;
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { validationId, updatedRows }: HeaderApproveRequestBody =
            await request.json();

        if (!validationId || !updatedRows) {
            return NextResponse.json(
                { error: "Missing validationId or updatedRows." },
                { status: 400 },
            );
        }

        // Find the document and update the tableData field atomically.
        const result = await TemporaryValidation.findByIdAndUpdate(
            validationId,
            { $set: { tableData: updatedRows } },
            { new: true }, // Return the updated document
        );

        if (!result) {
            return NextResponse.json(
                { error: "Session Expired or Invalid ID." },
                { status: 410 }, // 410 Gone is appropriate here
            );
        }

        return NextResponse.json({
            success: true,
            message: "Table data updated.",
        });
    } catch (error) {
        console.error("Error in /api/validate-pdf/header_approve:", error);
        return NextResponse.json(
            { error: "Internal Server Error during header approval." },
            { status: 500 },
        );
    }
}
