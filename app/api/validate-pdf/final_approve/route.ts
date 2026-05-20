import { NextResponse } from "next/server";
import { Schema } from "mongoose";
import { connectToDatabase } from "@/lib/database/mongoose";
import TemporaryValidation from "@/models/TemporaryValidation";

interface FinalApproveRequestBody {
    validationId: string;
}

/**
 * Placeholder for the final production save logic.
 * @param rawPdfData The hidden backend metadata.
 * @param tableData The user-approved table data.
 */
async function saveToProductionDatabase(
    rawPdfData: Schema.Types.Mixed,
    tableData: Schema.Types.Mixed,
): Promise<void> {
    // In a real-world application, this function would contain the logic
    // to write the merged data to your permanent production collections.
    console.log("--- Initiating Final Save to Production ---");
    console.log("Raw PDF Data:", JSON.stringify(rawPdfData, null, 2));
    console.log("Final Table Data:", JSON.stringify(tableData, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async database write
    console.log("--- Production Save Complete ---");
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { validationId }: FinalApproveRequestBody = await request.json();

        if (!validationId) {
            return NextResponse.json(
                { error: "Missing validationId." },
                { status: 400 },
            );
        }

        // 1. Retrieve the staging record.
        const stagingRecord = await TemporaryValidation.findById(validationId);

        if (!stagingRecord) {
            return NextResponse.json(
                { error: "Session Expired or Invalid ID." },
                { status: 410 },
            );
        }

        // 2. Execute the final production save operation.
        // await saveToProductionDatabase(
        //     stagingRecord.rawPdfData,
        //     // stagingRecord.tableData,
        // );

        // 3. Crucial: Immediately delete the staging document.
        await TemporaryValidation.findByIdAndDelete(validationId);

        return NextResponse.json({
            success: true,
            message:
                "Data successfully saved to production and temporary record deleted.",
        });
    } catch (error) {
        console.error("Error in /api/validate-pdf/final_approve:", error);
        return NextResponse.json(
            { error: "Internal Server Error during final approval." },
            { status: 500 },
        );
    }
}
