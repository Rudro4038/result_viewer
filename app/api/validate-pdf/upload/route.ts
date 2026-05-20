import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import TemporaryValidation from "@/models/TemporaryValidation";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

const FASTAPI_URL = "http://127.0.0.1:8000/parse-pdf";

const dummyData = {
    success: true,
    count: 2,
    data: {
        header_json_list: [
            {
                id: 1,
                header: "SL1. No.",
                attribute: "1",
                isTaken: true,
            },
            {
                id: 2,
                header: "Registration no.",
                attribute: "2022337001",
                isTaken: true,
            },
            {
                id: 3,
                header: "Term test (10)",
                attribute: "9",
                isTaken: true,
            },
            {
                id: 4,
                header: "",
                attribute: "",
                isTaken: true,
            },
            {
                id: 5,
                header: "Attendance (18)",
                attribute: "18",
                isTaken: true,
            },
        ],
        raw_data: [
            [
                {
                    id: 1,
                    value: "1",
                },
                {
                    id: 2,
                    value: "2022337001",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "2",
                },
                {
                    id: 2,
                    value: "2022337002",
                },
                {
                    id: 3,
                    value: "8.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "3",
                },
                {
                    id: 2,
                    value: "2022337005",
                },
                {
                    id: 3,
                    value: "8",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "4",
                },
                {
                    id: 2,
                    value: "2022337009",
                },
                {
                    id: 3,
                    value: "8",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "5",
                },
                {
                    id: 2,
                    value: "2022337010",
                },
                {
                    id: 3,
                    value: "7.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "6",
                },
                {
                    id: 2,
                    value: "2022337012",
                },
                {
                    id: 3,
                    value: "7",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "7",
                },
                {
                    id: 2,
                    value: "2022337014",
                },
                {
                    id: 3,
                    value: "8",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "8",
                },
                {
                    id: 2,
                    value: "2022337017",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "9",
                },
                {
                    id: 2,
                    value: "2022337020",
                },
                {
                    id: 3,
                    value: "7.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "10",
                },
                {
                    id: 2,
                    value: "2022337021",
                },
                {
                    id: 3,
                    value: "7.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "11",
                },
                {
                    id: 2,
                    value: "2022337022",
                },
                {
                    id: 3,
                    value: "6.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "12",
                },
                {
                    id: 2,
                    value: "2022337023",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "13",
                },
                {
                    id: 2,
                    value: "2022337024",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "14",
                },
                {
                    id: 2,
                    value: "2022337025",
                },
                {
                    id: 3,
                    value: "8",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "15",
                },
                {
                    id: 2,
                    value: "2022337026",
                },
                {
                    id: 3,
                    value: "4",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "16",
                },
                {
                    id: 2,
                    value: "2022337028",
                },
                {
                    id: 3,
                    value: "4.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "17",
                },
                {
                    id: 2,
                    value: "2022337029",
                },
                {
                    id: 3,
                    value: "9.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "18",
                },
                {
                    id: 2,
                    value: "2022337031",
                },
                {
                    id: 3,
                    value: "8.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "19",
                },
                {
                    id: 2,
                    value: "2022337032",
                },
                {
                    id: 3,
                    value: "7.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "20",
                },
                {
                    id: 2,
                    value: "2022337034",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "21",
                },
                {
                    id: 2,
                    value: "2022337035",
                },
                {
                    id: 3,
                    value: "4.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "22",
                },
                {
                    id: 2,
                    value: "2022337039",
                },
                {
                    id: 3,
                    value: "8.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "23",
                },
                {
                    id: 2,
                    value: "2022337041",
                },
                {
                    id: 3,
                    value: "9.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "17",
                },
            ],
            [
                {
                    id: 1,
                    value: "24",
                },
                {
                    id: 2,
                    value: "2022337042",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "25",
                },
                {
                    id: 2,
                    value: "2022337043",
                },
                {
                    id: 3,
                    value: "4.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "26",
                },
                {
                    id: 2,
                    value: "2022337048",
                },
                {
                    id: 3,
                    value: "8.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "27",
                },
                {
                    id: 2,
                    value: "2022337050",
                },
                {
                    id: 3,
                    value: "8.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "28",
                },
                {
                    id: 2,
                    value: "2022337052",
                },
                {
                    id: 3,
                    value: "9",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "29",
                },
                {
                    id: 2,
                    value: "2022337054",
                },
                {
                    id: 3,
                    value: "7",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "30",
                },
                {
                    id: 2,
                    value: "2022337055",
                },
                {
                    id: 3,
                    value: "5.5",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
            [
                {
                    id: 1,
                    value: "31",
                },
                {
                    id: 2,
                    value: "2021337022",
                },
                {
                    id: 3,
                    value: "6",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "18",
                },
            ],
            [
                {
                    id: 1,
                    value: "32",
                },
                {
                    id: 2,
                    value: "2021337026",
                },
                {
                    id: 3,
                    value: "6",
                },
                {
                    id: 4,
                    value: "",
                },
                {
                    id: 5,
                    value: "16",
                },
            ],
        ],
    },
};

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
