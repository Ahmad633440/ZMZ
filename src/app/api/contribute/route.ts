import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";

export async function POST(req: Request) {
  try {
    console.log("📨 POST /api/contribute received");

    const body = await req.json();
    console.log("📦 Body parsed:", body);

    if (!body.text || !body.text.trim()) {
      console.log("❌ Validation failed: text empty");
      return NextResponse.json(
        { error: "Quote text is required" },
        { status: 400 }
      );
    }

    console.log("🔗 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected");

    const quoteData = {
      text: body.text.trim(),
      author: body.author?.trim() || "Anonymous",
    };

    console.log("💾 Saving:", quoteData);
    const quote = await PendingQuote.create(quoteData);
    console.log("✅ Saved to DB:", quote._id);

    return NextResponse.json({ ok: true, quote }, { status: 201 });
  } catch (error) {
    console.error("❌ Route error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}


