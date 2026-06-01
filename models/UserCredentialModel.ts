// src/models/UserCredentialModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { UserCredential } from "@/types/UserCredential";

// Combine your existing TypeScript interface with Mongoose's Document
export interface IUserCredentialDoc extends UserCredential, Document {}

const UserCredentialSchema = new Schema<IUserCredentialDoc>(
    {
        id: { type: String, required: true, unique: true },
        pass: { type: String, required: true },
        role: { type: String, required: true },
        name: { type: String, required: true },
        // Add other fields from your UserCredential type here, for example:
        // email: { type: String }
    },
    {
        collection: "id_pass", // Explicitly maps this model to your existing collection name
    },
);

// 1. Get a reference to the active connection database, or use the root context
const baseConnection = mongoose.connection;

// 2. Switch context to "user_credentials" database instance
const userDbConnection = baseConnection.useDb("user_credentials", {
    useCache: true, // Caches the connection instance so Next.js doesn't recreate it on hot reloads
});

const UserCredentialModel: Model<IUserCredentialDoc> =
    userDbConnection.models.UserCredential ||
    userDbConnection.model<IUserCredentialDoc>(
        "UserCredential",
        UserCredentialSchema,
    );

export default UserCredentialModel;
