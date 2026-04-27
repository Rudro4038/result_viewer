import { connectToDatabase } from "@/lib/database/mongodb";

interface UserCredential {
  id: string;
  pass: string;
}

export async function getPassById(userId: string): Promise<string | null> {
  const client = await connectToDatabase();
  const db = client.db("user_credentials");       // database name
  const collection = db.collection<UserCredential>("id_pass"); // typed collection

  const user = await collection.findOne({ id: userId });
  return user ? user.pass : null;
}

// Example usage
getPassById("2022337001").then(pass => {
  console.log("Password:", pass);
});
