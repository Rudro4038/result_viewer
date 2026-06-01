// app/api/uploaded-files/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
// Replace this import path with the actual location of your validation model
import FinalTableData from "@/models/FinalTableData";
import { UploadedFileList } from "@/types/UploadedFileList";

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch files: sort by _id descending (-1) so the last document is first (Stack)
        // .select() ensures we don't fetch massive 'tableData' objects over the network
        const files = await FinalTableData.find<UploadedFileList>({})
            .sort({ createdAt: -1 }) // Sort by creation date to get the most recent first
            .select("fileName _id createdAt")
            .lean();
        console.log("Fetched files from DB:", files);
        // Map to a clean structure safely converting MongoDB ObjectIds to strings
        const formattedFiles: UploadedFileList = files.map((file) => ({
            id: file._id.toString(),
            fileName: file.fileName,
            createdAt: file.createdAt,
        }));
        console.log("Formatted files for response:", formattedFiles);

        return NextResponse.json({ success: true, data: formattedFiles });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        console.error("Failed to fetch uploaded files stack:", errorMessage);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
