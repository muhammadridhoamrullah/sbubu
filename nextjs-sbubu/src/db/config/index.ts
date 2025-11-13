import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI!;

if (!connectionString) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let client: MongoClient;

async function GetMongoClientInstance() {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }

  return client;
}

export async function getDb() {
  const client = await GetMongoClientInstance();
  const db = client.db("sbubu");
  return db;
}
