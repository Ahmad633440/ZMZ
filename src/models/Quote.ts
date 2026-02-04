import mongoose, { Schema } from "mongoose";

const QuoteSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, default: "Def" },
  },
  { timestamps: true }
);

export default mongoose.models.Quote ||
  mongoose.model("Quote", QuoteSchema);
