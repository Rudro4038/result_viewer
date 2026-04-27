// app/api/test/route.ts
import { getPassById } from "@/lib/authentication/login";

export async function GET() {
  try {
    const pass = await getPassById("2022337005");
    const message = `Password: ${pass} ${Date.now()}`;

    return new Response(
      JSON.stringify({ message }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching password:", error);

    return new Response(
      JSON.stringify({ error: "Error fetching password" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
``