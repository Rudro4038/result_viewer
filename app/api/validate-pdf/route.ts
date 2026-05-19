import { NextResponse } from "next/server";

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

    const dummyResponse = {
        attribute: ["1", "2020337021", "10", "", "", "", "", "4", "3.5"],
        headers: [
            "Serial No",
            "Registration No",
            "Attendance(Out of 20)",
            "",
            "",
            "",
            "Total (10)",
            "Evaluation (5)",
        ],
    };

    return NextResponse.json(dummyResponse);
}
