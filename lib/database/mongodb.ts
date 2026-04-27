import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri);
    globalForMongo._mongoClientPromise = client.connect();
  }

  return globalForMongo._mongoClientPromise;
}