import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { text, author } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { message: "Quote is required" },
        { status: 400 }
      );
    }

    await PendingQuote.create({
      text: text.trim(),
      author: author?.trim() || "Anonymous",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
