// app/api/test/route.ts
import { getUserById } from "@/lib/authentication/login";
import { UserCredential } from "@/lib/types/user";

export async function GET() {
  try {
    const user: UserCredential | null = await getUserById("2022337005");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = `User: ${user.name} ${Date.now()}`;

    return new Response(JSON.stringify({ message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    return new Response(JSON.stringify({ error: "Error fetching user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
