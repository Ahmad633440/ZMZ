import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      default: "Anonymous",
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Quote ||
  mongoose.model("Quote", QuoteSchema);
