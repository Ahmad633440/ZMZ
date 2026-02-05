import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_CONNECTION_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGODB_CONNECTION_URI is missing in .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
