"use client";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Panel
      </h1>

      <p className="text-center text-white/60 mb-10">
        Pending quotes waiting for approval.
      </p>

      {/* Pending quotes will render here */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Placeholder */}
        <div className="border border-white/20 rounded-xl p-5">
          <p className="mb-2">"Example pending quote"</p>
          <p className="text-sm text-white/50 mb-4">— Anonymous</p>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-green-500 text-black">
              Approve
            </button>
            <button className="px-4 py-2 rounded-xl bg-red-500 text-black">
              Reject
            </button>

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
      </div>
    </div>
  );
};

export default AdminPage;
