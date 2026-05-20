import { NextResponse } from "next/server";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

const dummyResponse: ValidationResponseForTable = [
    { id: 1, attribute: "1", header: "Serial No", isTaken: true },
    {
        id: 2,
        attribute: "2020337021",
        header: "Registration No",
        isTaken: true,
    },
    {
        id: 3,
        attribute: "10",
        header: "Attendance(Out of 20)",
        isTaken: true,
    },
    { id: 4, attribute: "", header: "", isTaken: true },
    { id: 5, attribute: "", header: "", isTaken: true },
    { id: 6, attribute: "", header: "", isTaken: true },
    { id: 7, attribute: "", header: "Total (10)", isTaken: true },
    { id: 8, attribute: "4", header: "Evaluation (5)", isTaken: true },
    { id: 9, attribute: "3.5", header: "", isTaken: true },
];

const dummyFastApiResponse = {
    success: true,
    count: 2,
    data: {
        header_json_list: [
            "SL. No.",
            "Registration no.",
            "Term test (10)",
            "",
            "Attendance (18)",
        ],
        all_rows: [
            [
                "SL.No.",
                "Registrationno.",
                "Term test (10)",
                "Evaluation(5)",
                "Attendance (18)",
            ],
            ["1", "2022337001", "9", "", "18"],
            ["2", "2022337002", "8.5", "", "18"],
            ["3", "2022337005", "8", "", "17"],
            ["4", "2022337009", "8", "", "16"],
            ["5", "2022337010", "7.5", "", "16"],
            ["6", "2022337012", "7", "", "18"],
            ["7", "2022337014", "8", "", "18"],
            ["8", "2022337017", "9", "", "17"],
            ["9", "2022337020", "7.5", "", "16"],
            ["10", "2022337021", "7.5", "", "17"],
            ["11", "2022337022", "6.5", "", "18"],
            ["12", "2022337023", "9", "", "16"],
            ["13", "2022337024", "9", "", "17"],
            ["14", "2022337025", "8", "", "16"],
            ["15", "2022337026", "4", "", "17"],
            ["16", "2022337028", "4.5", "", "18"],
            ["17", "2022337029", "9.5", "", "18"],
            ["18", "2022337031", "8.5", "", "18"],
            ["19", "2022337032", "7.5", "", "16"],
            ["20", "2022337034", "9", "", "18"],
            ["21", "2022337035", "4.5", "", "17"],
            ["22", "2022337039", "8.5", "", "18"],
            ["23", "2022337041", "9.5", "", "17"],
            ["24", "2022337042", "9", "", "18"],
            ["25", "2022337043", "4.5", "", "18"],
            ["26", "2022337048", "8.5", "", "16"],
            ["27", "2022337050", "8.5", "", "18"],
            ["28", "2022337052", "9", "", "18"],
            ["29", "2022337054", "7", "", "18"],
            ["30", "2022337055", "5.5", "", "16"],
            ["31", "2021337022", "6", "", "18"],
            ["32", "2021337026", "6", "", "16"],
        ],
    },
};

const FASTAPI_URL = "http://127.0.0.1:8000/parse-pdf";

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

        // Await the JSON here
        const fastApiResponse = await res.json();
        console.log("Received response from FastAPI:", fastApiResponse);

        // process fastApiResponse as needed, then return it to the client

        // Parse FastAPI response
        const data: ValidationResponseForTable = dummyResponse;

        return NextResponse.json(data);
    } catch (err) {
        console.error("Error contacting FastAPI:", err);
        return NextResponse.json(
            { error: "Failed to connect to FastAPI" },
            { status: 500 },
        );
    }
}
