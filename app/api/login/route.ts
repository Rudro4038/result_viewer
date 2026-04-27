// /api/login/route.ts
import { getUserById } from "@/lib/authentication/login";
import { generateToken } from "@/lib/authentication/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, password } = await request.json();


    // Validate input
    if (!id || !password) {
      return NextResponse.json(
        { success: false, message: "User ID and password are required." },
        { status: 400 }
      );
    }

    const user = await getUserById(id);
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Compare password 
    if (user.pass !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    // Send response with HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      role: user.role ?? null,
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}