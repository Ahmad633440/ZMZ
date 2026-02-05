"use client";
import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import { useState, useEffect } from "react";

const COOLDOWN_SECONDS = 120;

export default function AuroraBackgroundDemo() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const [message, setMessage] = useState("");

  // Store expiry timestamp instead of seconds
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  // Derived countdown
  const [remaining, setRemaining] = useState(0);

  // ✅ Restore cooldown timestamp on every load
  useEffect(() => {
    const saved = localStorage.getItem("cooldownUntil");

    if (saved) {
      const expiry = Number(saved);

      if (expiry > Date.now()) {
        setCooldownUntil(expiry);
      } else {
        localStorage.removeItem("cooldownUntil");
      }
    }
  }, []);

  // ✅ Timer always recalculates from expiry timestamp
  useEffect(() => {
    if (!cooldownUntil) return;

    const interval = setInterval(() => {
      const secondsLeft = Math.ceil(
        (cooldownUntil - Date.now()) / 1000
      );

      if (secondsLeft <= 0) {
        setCooldownUntil(null);
        setRemaining(0);
        localStorage.removeItem("cooldownUntil");
        clearInterval(interval);
      } else {
        setRemaining(secondsLeft);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [cooldownUntil]);

  //  Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quote.trim()) {
      setMessage("Write a quote first. Don’t waste the button.");
      return;
    }

    // Block if still cooling down
    if (cooldownUntil && cooldownUntil > Date.now()) return;

    try {
      await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: quote.trim(),
          author: author.trim() || "Anonymous",
        }),
      });

      setMessage("Thanks! Your quote is submitted for review.");

      setQuote("");
      setAuthor("");

      //  Start cooldown (timestamp-based)
      const expiry = Date.now() + COOLDOWN_SECONDS * 1000;

      localStorage.setItem("cooldownUntil", expiry.toString());
      setCooldownUntil(expiry);
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
    }
  };

  const isCoolingDown = cooldownUntil && cooldownUntil > Date.now();

  return (
    // <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
    <AuroraBackground>

   
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 mt-16 text-white">
        Submit a Quote 
      </h1>

      <p className="text-center opacity-70 max-w-md mb-10 text-gray-300">
        Drop your demotivational quote here.
        If it’s good, I’ll add it manually.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-5 border border-white/20 rounded-2xl p-8"
      >
        {/* Quote */}
        <div className="flex flex-col gap-2">
          <label className="opacity-70 text-white">Your Quote</label>
          <input
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            maxLength={300}
            disabled={!!isCoolingDown}
            placeholder="Enter your demotivational masterpiece..."
            className="p-3 rounded-xl bg-black border border-white/30 text-white disabled:opacity-40"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-2">
          <label className="opacity-70 text-white">Author (optional)</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={!!isCoolingDown}
            placeholder="Your name"
            className="p-3 rounded-xl bg-black border border-white/30 text-white disabled:opacity-40"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!!isCoolingDown}
          className="py-3 rounded-xl bg-white text-black font-semibold hover:opacity-80 transition disabled:opacity-40"
        >
          {isCoolingDown ? `Wait ${remaining}s` : "Submit Quote"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-2 opacity-80">
            {message}
          </p>
        )}
      </form>

      <p className="mt-8 text-sm opacity-50 text-center max-w-sm text-gray-300">
        Submissions are reviewed manually. Spam will be ignored.
      </p>
    {/* </div> */}
     </AuroraBackground>
  );
};


