import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  await connectDB();

  await PendingQuote.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
