import connectDB from "@/lib/mongodb";
import PendingQuote from "@/models/PendingQuote";
import Quote from "@/models/Quote";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  await connectDB();

  const doc = await PendingQuote.findById(id);

  if (!doc)
    return NextResponse.json({ ok: false });

  await Quote.create({
    text: doc.text,
    author: doc.author
  });

  await PendingQuote.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
