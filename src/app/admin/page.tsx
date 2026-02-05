"use client";

import { useState, useEffect } from "react";

const AdminPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingQuotes();
  }, []);

  const fetchPendingQuotes = async () => {
    try {
      const res = await fetch("/api/admin/pending-quotes");
      const data = await res.json();
      setQuotes(data.quotes || []);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await fetch(`/api/admin/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId: id }),
      });
      fetchPendingQuotes();
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`/api/admin/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId: id }),
      });
      fetchPendingQuotes();
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Panel
      </h1>

      <p className="text-center text-white/60 mb-10">
        Pending quotes waiting for approval.
      </p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : quotes.length === 0 ? (
        <p className="text-center text-white/50">No pending quotes.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {quotes.map((quote: any) => (
            <div key={quote._id} className="border border-white/20 rounded-xl p-5">
              <p className="mb-2">"{quote.text}"</p>
              <p className="text-sm text-white/50 mb-4">— {quote.author}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(quote._id)}
                  className="px-4 py-2 rounded-xl bg-green-600 text-black font-semibold hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(quote._id)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-black font-semibold hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            localStorage.removeItem("admin_access");
            window.location.href = "/";
          }}
          className="px-4 py-2 rounded-xl border border-white/40 text-white hover:bg-white hover:text-black transition"
        >
          Logout Admin
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
