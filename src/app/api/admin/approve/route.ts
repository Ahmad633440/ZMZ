import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";
import Quote from "@/models/Quote";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const quoteId = body.quoteId || body.id;
    
    console.log("✅ Approving quote ID:", quoteId);

    await connectDB();

    const pending = await PendingQuote.findById(quoteId);

    if (!pending) {
      console.log("❌ Quote not found");
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      );
    }

    console.log("📦 Moving quote:", pending.text);
    await Quote.create({
      text: pending.text,
      author: pending.author
    });
    console.log("✅ Added to Quote collection");

    await PendingQuote.findByIdAndDelete(quoteId);
    console.log("✅ Deleted from PendingQuote collection");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Approve error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approve failed" },
      { status: 500 }
    );
  }
}