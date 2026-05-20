import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/database/mongoose";

export const runtime = "nodejs";

export async function GET() {
    try {
        await connectToDatabase();

        // Check Mongoose connection state
        const isConnected = mongoose.connection.readyState === 1;

        if (isConnected) {
            return NextResponse.json({
                ok: true,
                message: "MongoDB connection successful via Mongoose",
            });
        } else {
            return NextResponse.json(
                {
                    ok: false,
                    message: "Mongoose is not connected.",
                },
                { status: 500 },
            );
        }
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Unknown MongoDB connection error";

        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
