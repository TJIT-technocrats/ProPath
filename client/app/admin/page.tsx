import Link from "next/link";
import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 w-full max-w-3xl border border-white/20 transition-all duration-300 hover:shadow-purple-500/20">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10 tracking-tight">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/admin/createAptitude"
            className="cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg hover:scale-[1.02] hover:shadow-pink-500/30 active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-center">
              Create Aptitude Questions
            </h2>
            <p className="mt-2 text-sm text-white/80 text-center">
              Add or manage aptitude questions
            </p>
          </Link>
          <Link
            href="/admin"
            className="cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:scale-[1.02] hover:shadow-purple-500/30 active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-center">
              Add Company Details
            </h2>
            <p className="mt-2 text-sm text-white/80 text-center">
              Add or update company information
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
