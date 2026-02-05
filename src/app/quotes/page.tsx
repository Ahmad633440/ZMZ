"use client";
import {BackgroundBeams} from "@/app/components/ui/background-beams";
import { useState } from "react";
import quotes from "@/data/quotes.json";

export default function BackgroundBeamsDemo() {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      {/* Fixed Quote Card */}
      <div className="w-full max-w-2xl flex flex-col justify-between border border-white/20 rounded-2xl p-8 min-h-[270px]">

        {/* Quote Text */}
        <p className="text-2xl sm:text-3xl font-semibold leading-relaxed text-center">
          “{quotes[index].text}”
        </p>

        {/* Author Fixed Bottom Right */}
        <p className="text-right text-lg sm:text-xl opacity-70 mt-6">
          — {quotes[index].author}
        </p>
      </div>

      {/* Buttons Fixed Position */}
      <div className="flex gap-4 mt-10">
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
      <BackgroundBeams />
    </div>
  );
};


