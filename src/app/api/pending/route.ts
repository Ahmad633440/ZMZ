// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import PendingQuote from "@/models/PendingQuote";

// export async function GET() {
//   await connectDB();

//   const quotes = await PendingQuote.find().sort({ createdAt: -1 });

//   return NextResponse.json(quotes);
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";

export async function GET(req: Request) {
  try {
    await connectDB();
    const quotes = await PendingQuote.find().sort({ createdAt: -1 });
    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}