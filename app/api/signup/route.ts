// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import UserCredential from "@/models/UserCredentialModel";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const { id, name, password } = await request.json();

        if (!id || !name || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required.",
                },
                { status: 400 },
            );
        }

        const existingUser = await UserCredential.findOne({ id });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User with this registration ID already exists.",
                },
                { status: 409 },
            );
        }

        const newUser = new UserCredential({
            id,
            name,
            pass: password,
            role: "student", // Default role
        });

        await newUser.save();

        return NextResponse.json({
            success: true,
            message: "User created successfully.",
        });
    } catch (error) {
        console.error("Signup API route exception:", error);

        return NextResponse.json(
            { success: false, message: "An internal server error occurred." },
            { status: 500 },
        );
    }
}
