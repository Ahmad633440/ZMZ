"use client";

import Link from "next/link";
import { SparklesCore } from "../app/components/ui/sparkles";

export default function SparklesPreview() {
  return (
    <div className="min-h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl">
        
        {/* Title */}
        <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
          Zero Motivation Zone
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-lg md:text-xl text-white/70">
          Where ambition comes to die peacefully.
        </p>

        {/* Disclaimer */}
        <p className="mt-3 text-sm md:text-base text-white/50">
          ⚠️ Demotivation for laughs only.  
          If you take this seriously… that’s on you.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          
          <Link
            href="/quotes"
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-80 transition"
          >
            Explore Quotes →
          </Link>

          <Link
            href="/contribution"
            className="px-6 py-3 rounded-2xl border border-white/40 text-white font-semibold hover:bg-white hover:text-black transition"
          >
            Contribute ✍️
          </Link>

        </div>
      </div>
    </div>
  );
}
