import { connectToDatabase } from "@/lib/database/mongoose";
import { UserCredential } from "@/types/UserCredential";
import UserCredentialModel from "@/models/UserCredentialModel";

export async function getUserById(
    userId: string,
): Promise<UserCredential | null> {
    // 1. Establish/verify the global Mongoose connection
    await connectToDatabase();

    // 2. Query the collection through the Mongoose model
    // .lean() converts the Mongoose document back to a plain JavaScript object matching your type
    const user = await UserCredentialModel.findOne({ id: userId }).lean();

    return user || null;
}
