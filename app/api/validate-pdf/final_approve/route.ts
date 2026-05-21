import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import TemporaryValidation from "@/models/TemporaryValidation";
import FinalTableData from "@/models/FinalTableData";

export async function POST(request: Request) {
    try {
        const { uuid, fileName } = await request.json();
        console.log("Received UUID in final_approve route:", uuid);
        console.log("Received filename in final_approve route:", fileName);

        if (!uuid) {
            return NextResponse.json(
                { error: "Missing uuid" },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const tempValidation = await TemporaryValidation.findOne({ uuid });

        if (!tempValidation || !tempValidation.tableData) {
            return NextResponse.json(
                { error: "Document or tableData not found" },
                { status: 404 },
            );
        }

        const newFinalData = new FinalTableData({
            fileName: fileName,
            tableData: tempValidation.tableData,
        });

        await newFinalData.save();

        // Optional: Delete the temporary document
        await TemporaryValidation.deleteOne({ uuid });

        return NextResponse.json({
            message: "Data published successfully",
        });
    } catch (err) {
        console.error("Error in final_approve route:", err);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 },
        );
    }
}
