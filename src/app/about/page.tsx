"use client";

import { Loader2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center border border-white/20 rounded-2xl p-8">

        {/* Name */}
        <h1 className="text-3xl font-bold mb-2">
          Ahmad
        </h1>

        {/* Contact Info */}
        <div className="text-sm text-white/70 space-y-1 mb-6">
          <p>
            Discord: <span className="text-white">0_heihachi_mishima</span>
          </p>
          <p>
            Email: <span className="text-white">a09147046@gmail.com</span>
          </p>
        </div>

        {/* Purpose */}
        <p className="text-white/80 leading-relaxed mb-8">
          This project is a learning experiment.
          <br />
          It exists for no reason other than overthinking,
          learning, joblessness, and boredom.
        </p>

        {/* Divider */}
        <div className="border-t border-white/20 my-6" />

        {/* More Details Section */}
        <h2 className="text-lg font-semibold mb-3">
          More details
        </h2>

        <div className="flex flex-col items-center justify-center text-white/50">
          <Loader2 className="w-6 h-6 animate-spin mb-2" />
          <p className="text-sm">
            Loading personal details…
            
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
