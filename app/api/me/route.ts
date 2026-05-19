import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { verifyToken } from "@/lib/authentication/jwt";

export async function GET() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token");

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token.value);

    if (
        !decoded ||
        typeof decoded !== "object" ||
        !decoded.id ||
        !decoded.role
    ) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Declare a variable with type User
    const user: User = {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name,
    };
    return NextResponse.json(user);
}
