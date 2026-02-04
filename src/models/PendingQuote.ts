import mongoose, { Schema } from "mongoose";

const PendingQuoteSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

export default mongoose.models.PendingQuote ||
  mongoose.model("PendingQuote", PendingQuoteSchema);
