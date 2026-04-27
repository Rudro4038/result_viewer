import { getPassById } from "@/lib/authentication/login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { password } = await request.json();

        if (!id || !password) {
            return NextResponse.json(
                { success: false, message: "User ID and password are required." },
                { status: 400 }
            );
        }

        const storedPassword = await getPassById(id);
        console.log(id, password, storedPassword);

        if (storedPassword && storedPassword === password) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid credentials." },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json(
            { success: false, message: "An internal server error occurred." },
            { status: 500 }
        );
    }
}

