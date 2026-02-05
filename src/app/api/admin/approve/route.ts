import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";
import Quote from "@/models/Quote";

export async function POST(req: Request) {
  try {
    console.log("📨 [APPROVE] Request received");
    
    const body = await req.json();
    const quoteId = body.quoteId || body.id;
    
    console.log("📨 [APPROVE] Quote ID:", quoteId);

    await connectDB();
    console.log("✅ [APPROVE] MongoDB connected");

    const pending = await PendingQuote.findById(quoteId);

    if (!pending) {
      console.log("❌ [APPROVE] Quote not found");
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      );
    }

    console.log("✅ [APPROVE] Found pending quote:", pending.text);

    // Create in Quote collection
    const newQuote = new Quote({
      text: pending.text,
      author: pending.author
    });

    await newQuote.save();
    console.log("✅ [APPROVE] Saved to Quote collection:", newQuote._id);

    // Delete from PendingQuote
    await PendingQuote.findByIdAndDelete(quoteId);
    console.log("✅ [APPROVE] Deleted from PendingQuote");

    return NextResponse.json({ ok: true, quoteId: newQuote._id });
  } catch (error) {
    console.error("❌ [APPROVE] ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approve failed" },
      { status: 500 }
    );
  }
}