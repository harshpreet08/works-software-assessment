import { MongoClient } from "mongodb";

require('dotenv').config();
const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export function getClient() {
  return client;
}

export default connectToMongoDB;
