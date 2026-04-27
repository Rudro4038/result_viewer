import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const databaseName = process.env.MONGODB_DB;

    if (!databaseName) {
      return NextResponse.json(
        { ok: false, message: "MONGODB_DB is not set" },
        { status: 500 },
      );
    }

    await client.db(databaseName).command({ ping: 1 });

    return NextResponse.json({ ok: true, message: "MongoDB connection successful"});
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown MongoDB connection error";

    return NextResponse.json(
      { ok: false, message },
      { status: 500 },
    );
  }
}