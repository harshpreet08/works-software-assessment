import { MongoClient, ServerApiVersion } from "mongodb";

require('dotenv').config();
const uri = process.env.MONGODB_URI || '';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToMongoDB() {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export function getClient() {
  return client;
}
