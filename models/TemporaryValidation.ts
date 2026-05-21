import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";

// Interface for the document
export interface ITemporaryValidation extends Document {
    uuid: string;
    rawPdfData: mongoose.Schema.Types.Mixed;
    tableData: mongoose.Schema.Types.Mixed;
    header_json_list: ValidationResponseForTable;
    createdAt: Date;
}

// Mongoose Schema Definition
const TemporaryValidationSchema: Schema = new Schema({
    uuid: {
        type: String,
        default: uuidv4,
    },
    rawPdfData: {
        type: Schema.Types.Mixed,
        required: true,
    },
    tableData: {
        type: Schema.Types.Mixed,
        required: true,
    },
    header_json_list: {
        type: [Schema.Types.Mixed],
        required: true,
    },
    createdAt: {
        type: Date,
        // This creates a TTL index, automatically deleting documents after 30 minutes (1800 seconds)
        expires: 1800,
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

const TemporaryValidation: Model<ITemporaryValidation> =
    userDbConnection.models.TemporaryValidation ||
    userDbConnection.model<ITemporaryValidation>(
        "TemporaryValidation",
        TemporaryValidationSchema,
        "temporary_upload_pdf",
    );

export default TemporaryValidation;
