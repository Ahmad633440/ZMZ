"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoLockClosedOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";



const AdminAccessButton = ({ playSound }: { playSound: () => void }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    playSound();
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PAGE_PASSWORD) {
      localStorage.setItem("admin_access", "granted");
      router.push("/admin");
    } else {
      setError("Wrong password. Motivation denied.");
      setPassword("");
    }
  };

  return (
    <>
      {/* Admin Button */}
      <button
        onClick={handleClick}
        className="px-4 h-7 rounded-xl bg-white border border-black text-black hover:bg-gray-100 transition flex items-center gap-1"
      >
        Admin <IoLockClosedOutline />
      </button>

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black border border-white/20 rounded-2xl p-6 w-full max-w-sm text-center">

            <h2 className="text-xl font-semibold mb-4">
              Admin Access
            </h2>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-xl bg-black border border-white/30 text-white focus:outline-none focus:border-white"
            />

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-80 transition"
              >
                Enter
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AdminAccessButton;

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
    
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const playSound = () => {
  if ((window as any)._playing) return;

  (window as any)._playing = true;

  const audio = new Audio("/sounds/faaaa.mp3");
  audio.volume = 0.21;
  audio.play();

  audio.onended = () => {
    (window as any)._playing = false;
  };
};


  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
       
        <Link href="/">Home</Link>
        <Link href="/quotes">Quotes</Link>
        <Link href="/contribution">Contribute</Link>
        {/* <button  onClick={playSound} className="text-red-600">Mystery</button> */}
        <Link href="/about">About</Link>
        {/* <Link  
      href="/admin" onClick={playSound}
      className="px-4 h-7  rounded-xl border bg-white border-black text-black hover:bg-gray-100 transition flex items-center gap-1">
      Admin <IoLockClosedOutline />
    </Link> */}
    <AdminAccessButton playSound={playSound} />
        
      </Menu>
    </div>
  );
}
