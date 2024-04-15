import { MongoClient, ServerApiVersion } from "mongodb";

require('dotenv').config(); // Load environment variables
const uri = process.env.MONGODB_URI || '';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export function getClient() {
  return client;
}
