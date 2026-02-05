import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Quote from "@/models/Quote";

export async function GET() {
  try {
    console.log("📨 GET /api/quotes");
    
    await connectDB();
    console.log("✅ Connected to MongoDB");

    const quotes = await Quote.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${quotes.length} quotes`);

    return NextResponse.json({ quotes }, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Fetch failed" },
      { status: 500 }
    );
  }
}