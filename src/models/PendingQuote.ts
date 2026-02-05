import mongoose from "mongoose";

const PendingSchema = new mongoose.Schema(
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

export default mongoose.models.PendingQuote ||
  mongoose.model("PendingQuote", PendingSchema);
