// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import { getUserCredentialById } from "@/lib/authentication/login";
import { generateToken } from "@/lib/authentication/jwt";

export async function POST(request: NextRequest) {
    try {
        // 1. Establish or verify the active global Mongoose connection instance
        await connectToDatabase();

        const { id, password } = await request.json();
        console.log("Login attempt for user ID:", id, password);
        // Validate input
        if (!id || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID and password are required.",
                },
                { status: 400 },
            );
        }

        // 2. Fetch the user profile (already optimized with Mongoose .lean() query)
        const user = await getUserCredentialById(id);
        console.log("Fetched User Profile:", user);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 },
            );
        }

        // 3. Compare the plaintext password with the user record's `pass` field
        if (user.pass !== password) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials." },
                { status: 401 },
            );
        }

        // 4. Generate the JWT authentication payload
        const token = generateToken({
            id: user.id,
            role: user.role,
            name: user.name,
        });

        // 5. Construct response and serialize the HTTP-only cookie
        const response = NextResponse.json({
            success: true,
            role: user.role ?? null,
        });

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    } catch (error) {
        console.error("Login API route exception:", error);

        return NextResponse.json(
            { success: false, message: "An internal server error occurred." },
            { status: 500 },
        );
    }
}
