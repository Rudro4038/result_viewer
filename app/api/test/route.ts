// app/api/test/route.ts
import { getUserCredentialById } from "@/lib/authentication/login";
import { UserCredential } from "@/types/UserCredential";

export async function GET() {
    try {
        const user: UserCredential | null =
            await getUserCredentialById("2022337001");

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const message = `User: ${user.id}}`;
        console.log(user);

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
