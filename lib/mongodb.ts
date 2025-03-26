import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
// Compare this snippet from app/api/users/register.ts:
