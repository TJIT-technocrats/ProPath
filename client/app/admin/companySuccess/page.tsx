"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CompanySuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");

  const handleProceed = () => {
    // push with companyId if available, otherwise just go to the page
    if (companyId) {
      router.push(`/admin/createAptitude?companyId=${encodeURIComponent(companyId)}`);
    } else {
      router.push(`/admin/createAptitude`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-6">
      <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-white/30 text-center">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-6">
          ✅ Company Created Successfully!
        </h1>

        {companyId ? (
          <p className="text-lg text-yellow-200 font-medium mb-8">
            📌 Your Company ID: <span className="font-bold">{companyId}</span>
          </p>
        ) : (
          <p className="text-lg text-red-300 font-medium mb-8">
            ⚠️ No Company ID detected in the URL.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleProceed}
            disabled={!companyId}
            className={`flex-1 py-3 rounded-xl text-white font-semibold text-lg shadow-lg transition-all
              ${companyId ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-[1.02] active:scale-[0.98]" : "bg-gray-400 cursor-not-allowed"}`}
          >
            ➡ Proceed to Add Aptitude Questions
          </button>

          <button
            onClick={() => router.push("/admin")}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-900 font-semibold text-lg shadow hover:bg-gray-300 transition"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanySuccess;
