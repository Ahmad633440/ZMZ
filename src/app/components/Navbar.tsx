"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoLockClosedOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon, X } from "lucide-react";

const AdminAccessButton = ({ playSound }: { playSound: () => void }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    setShowModal(true);
    setError("");
  };

  const handleSubmit = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PAGE_PASSWORD) {
      localStorage.setItem("admin_access", "granted");
      router.push("/admin");
      setShowModal(false);
      setPassword("");
    } else {
      setError("Wrong password. Motivation denied.");
      playSound();
      setPassword("");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="px-4 h-7 rounded-xl bg-white border border-black text-black hover:bg-gray-100 transition flex items-center gap-1 text-sm"
      >
        Admin <IoLockClosedOutline size={16} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-black border border-white/20 rounded-2xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Admin Access</h2>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-xl bg-black border border-white/30 text-white focus:outline-none focus:border-white text-sm"
            />

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-80 transition text-sm"
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
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/quotes", label: "Quotes" },
    { href: "/contribution", label: "Contribute" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className={cn("fixed top-10 inset-x-0 z-50 px-4", className)}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex max-w-2xl mx-auto justify-center">
        <Menu setActive={setActive}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-70 transition"
            >
              {link.label}
            </Link>
          ))}
          <AdminAccessButton playSound={playSound} />
        </Menu>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-black border border-white/20 rounded-2xl p-4">
        <Link href="/" className="text-white font-bold text-sm">
          DemoZone
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white"
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <MenuIcon size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-black border border-white/20 rounded-2xl p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white hover:opacity-70 transition py-2 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/20 pt-3 mt-3">
            <AdminAccessButton playSound={playSound} />
          </div>
        </div>
      )}
    </div>
  );
}
