import { NextResponse } from "next/server";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded." },
            { status: 400 },
        );
    }

    // In a real application, you would process the PDF here.
    // For this example, we'll return a dummy response.

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

    return NextResponse.json(dummyResponse);
}
