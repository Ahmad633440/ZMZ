"use client";

import React, { useState, useEffect } from "react";

const COOLDOWN_SECONDS = 120;

export default function AuroraBackgroundDemo() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);

  // Restore cooldown
  useEffect(() => {
    const saved = localStorage.getItem("cooldownUntil");

    if (!saved) return;

    const expiry = Number(saved);

    if (expiry > Date.now()) {
      setCooldownUntil(expiry);
    } else {
      localStorage.removeItem("cooldownUntil");
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!cooldownUntil) return;

    const interval = setInterval(() => {
      const left = Math.ceil((cooldownUntil - Date.now()) / 1000);

      if (left <= 0) {
        clearInterval(interval);
        setCooldownUntil(null);
        setRemaining(0);
        localStorage.removeItem("cooldownUntil");
      } else {
        setRemaining(left);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const isCoolingDown = !!(
    cooldownUntil && cooldownUntil > Date.now()
  );

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quote.trim()) {
      setMessage("Write a quote first.");
      return;
    }

    if (isCoolingDown) return;

    try {
      console.log("📨 Submitting quote...");
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: quote.trim(),
          author: author.trim() || "Anonymous",
        }),
      });

      console.log("📦 Response status:", res.status);
      const data = await res.json();
      console.log("📦 Response data:", data);

      if (!res.ok) {
        setMessage(`Error: ${data.error || "Server rejected submission."}`);
        return;
      }

      setMessage("✅ Submitted. Awaiting approval.");

      setQuote("");
      setAuthor("");

      const expiry = Date.now() + COOLDOWN_SECONDS * 1000;

      localStorage.setItem("cooldownUntil", expiry.toString());
      setCooldownUntil(expiry);

    } catch (err) {
      console.error("❌ Network error:", err);
      setMessage("Network error. Check console.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center px-4 pt-32 pb-20">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 text-white">
        Submit a Quote
      </h1>

      <p className="text-center opacity-70 max-w-md mb-10 text-gray-300">
        Drop your demotivational quote here.
        If it's good, it gets approved.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-5 border border-white/20 rounded-2xl p-8"
      >
        {/* Quote */}
        <div className="flex flex-col gap-2">
          <label className="opacity-70 text-white">
            Quote
          </label>

          <input
            value={quote}
            onChange={(e) =>
              setQuote(e.target.value)
            }
            maxLength={300}
            disabled={isCoolingDown}
            placeholder="Enter your demotivational masterpiece..."
            className="p-3 rounded-xl bg-black border border-white/30 text-white outline-none"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-2">
          <label className="opacity-70 text-white">
            Author (optional)
          </label>

          <input
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            disabled={isCoolingDown}
            placeholder="Your name"
            className="p-3 rounded-xl bg-black border border-white/30 text-white outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isCoolingDown}
          className="py-3 rounded-xl bg-white text-black font-semibold hover:opacity-80 transition disabled:opacity-40"
        >
          {isCoolingDown
            ? `Wait ${remaining}s`
            : "Submit Quote"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-2 text-gray-300">
            {message}
          </p>
        )}
      </form>

      <p className="mt-8 text-sm opacity-50 text-center max-w-sm text-gray-300">
        Submissions are reviewed manually.
      </p>
    </div>
  );
}
