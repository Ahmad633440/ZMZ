import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";
import Quote from "@/models/Quote";

export async function POST(req: Request) {
  try {
    const { quoteId } = await req.json();
    console.log("✅ Approving:", quoteId);

    await connectDB();

    const pending = await PendingQuote.findById(quoteId);
    if (!pending) {
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      );
    }

    await Quote.create({
      text: pending.text,
      author: pending.author
    });
    console.log("✅ Moved to Quote collection");

    await PendingQuote.findByIdAndDelete(quoteId);
    console.log("✅ Deleted from PendingQuote");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Approve error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approve failed" },
      { status: 500 }
    );
  }
}