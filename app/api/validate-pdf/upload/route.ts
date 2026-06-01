import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import TemporaryValidation from "@/models/TemporaryValidation";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

const FASTAPI_URL =
    process.env.FASTAPI_URL || "http://127.0.0.1:8000/parse-pdf";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded." },
            { status: 400 },
        );
    }

    try {
        // Prepare FormData for FastAPI
        const backendFormData = new FormData();
        backendFormData.append("file", file);

        // Send request to FastAPI
        const res = await fetch(FASTAPI_URL, {
            method: "POST",
            body: backendFormData,
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: "FastAPI server error" },
                { status: res.status },
            );
        }

        // const fastApiResponse = await res.json();
        const fastApiResponse = await res.json();

        // Connect to DB and store data
        await connectToDatabase();

        const newValidation = new TemporaryValidation({
            rawPdfData: fastApiResponse.data.raw_data,
            header_json_list: fastApiResponse.data.header_json_list,
            tableData: {},
        });

        // const temp = await response.json();
        // console.log(temp);

        const savedValidation = await newValidation.save();

        const response_header_json_list: ValidationResponseForTable =
            savedValidation.header_json_list;
        console.log(response_header_json_list);

        return NextResponse.json({
            uuid: savedValidation.uuid,
            header_json_list: response_header_json_list,
        });
    } catch (err) {
        console.error("Error in upload route (here):", err);
        return NextResponse.json(
            { error: "Failed to process file" },
            { status: 500 },
        );
    }
}
