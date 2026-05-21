import mongoose, { Schema, Document, Model } from "mongoose";
import { fileURLToPath } from "url";

// Interface for the document
export interface IFinalTableData extends Document {
    tableData: mongoose.Schema.Types.Mixed;
    createdAt: Date;
}

// Mongoose Schema Definition
const FinalTableDataSchema: Schema = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    tableData: {
        type: Schema.Types.Mixed,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// To prevent model recompilation on hot reloads in Next.js
// 1. Get a reference to the active connection database, or use the root context
const baseConnection = mongoose.connection;

// 2. Switch context to "user_credentials" database instance
const userDbConnection = baseConnection.useDb("user_credentials", {
    useCache: true, // Caches the connection instance so Next.js doesn't recreate it on hot reloads
});

// To prevent model recompilation on hot reloads in Next.js
const FinalTableData: Model<IFinalTableData> =
    userDbConnection.models.FinalTableData ||
    userDbConnection.model<IFinalTableData>(
        "FinalTableData",
        FinalTableDataSchema,
        "final_table_data",
    );

export default FinalTableData;
