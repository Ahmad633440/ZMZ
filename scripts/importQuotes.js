import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Quote from "./src/models/Quote.js";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env.local");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);

const quotesPath = path.join(process.cwd(), "src/data/quotes.json");
const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));

const formattedQuotes = quotes.map(q => ({
  text: q.text,
  author: q.author
}));

await Quote.insertMany(formattedQuotes);

console.log(` ${formattedQuotes.length} quotes imported successfully`);
await mongoose.disconnect();
process.exit(0);