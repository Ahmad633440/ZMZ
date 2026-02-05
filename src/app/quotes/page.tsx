"use client";

import { BackgroundBeams } from "@/app/components/ui/background-beams";
import { useState, useEffect } from "react";

interface Quote {
  _id: string;
  text: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function BackgroundBeamsDemo() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      setQuotes(data.quotes || []);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading quotes...</p>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No quotes available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background — cannot block clicks */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* Quote Card */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col justify-between border border-white/20 rounded-2xl p-8 min-h-[270px] bg-black">
        {/* Quote Text */}
        <p className="text-2xl sm:text-3xl font-semibold leading-relaxed text-center">
          "{quotes[index].text}"
        </p>

        {/* Author */}
        <p className="text-right text-lg sm:text-xl opacity-70 mt-6">
          — {quotes[index].author}
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex gap-4 mt-10">
        <button
          onClick={prevQuote}
          className="px-6 py-2 rounded-xl border border-white hover:bg-white hover:text-black transition"
        >
          Previous
        </button>

        <button
          onClick={nextQuote}
          className="px-6 py-2 rounded-xl border border-white hover:bg-white hover:text-black transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
