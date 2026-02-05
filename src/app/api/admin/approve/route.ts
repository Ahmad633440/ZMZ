import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";
import Quote from "@/models/Quote";

export async function POST(req: Request) {
  try {
    const { quoteId } = await req.json();
    console.log("✅ Approving:", quoteId);

    await connectDB();

    const doc = await PendingQuote.findById(quoteId);

    if (!doc) {
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      );
    }

    await Quote.create({
      text: doc.text,
      author: doc.author
    });

    await PendingQuote.findByIdAndDelete(quoteId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Approve error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approve failed" },
      { status: 500 }
    );
  }
}