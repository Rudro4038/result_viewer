// /lib/authentication/login.ts
import { connectToDatabase } from "@/lib/database/mongodb";

interface UserCredential {
  id: string;
  pass: string;
  role: string;
}

export async function getUserById(
  userId: string
): Promise<UserCredential | null> {
  const client = await connectToDatabase();
  const db = client.db("user_credentials");
  const collection = db.collection<UserCredential>("id_pass");

  const user = await collection.findOne({ id: userId });

  return user || null;
}
