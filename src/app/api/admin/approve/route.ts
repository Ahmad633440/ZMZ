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
    console.log("📨 [APPROVE] Connecting to MongoDB...");

    await connectDB();
    console.log("✅ [APPROVE] MongoDB connected");

    console.log("📨 [APPROVE] Searching PendingQuote...");
    const pending = await PendingQuote.findById(quoteId);

    if (!pending) {
      console.log("❌ [APPROVE] Quote not found in PendingQuote collection");
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      );
    }

    console.log("✅ [APPROVE] Found pending quote:", pending.text);
    console.log("📨 [APPROVE] Creating in Quote collection...");
    
    const created = await Quote.create({
      text: pending.text,
      author: pending.author
    });
    
    console.log("✅ [APPROVE] Quote created in Quote collection:", created._id);
    console.log("📨 [APPROVE] Deleting from PendingQuote...");

    const deleted = await PendingQuote.findByIdAndDelete(quoteId);
    console.log("✅ [APPROVE] Deleted from PendingQuote:", deleted._id);

    return NextResponse.json({ ok: true, quoteId: created._id });
  } catch (error) {
    console.error("❌ [APPROVE] ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approve failed" },
      { status: 500 }
    );
  }
}