import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";

export async function POST(req: Request) {
  try {
    const { quoteId } = await req.json();
    console.log("✅ Rejecting:", quoteId);

    await connectDB();
    await PendingQuote.findByIdAndDelete(quoteId);
    console.log("✅ Deleted from PendingQuote");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Reject error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reject failed" },
      { status: 500 }
    );
  }
}