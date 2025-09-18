"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Company {
  id: string;
  company_name: string;
  attempted_count: number;
  status: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);

    const { data: companyData, error: companyError } = await supabase
      .from("company_details")
      .select("id, company_name, status, created_at")
      .order("created_at", { ascending: false }); // newest first

    if (companyError) {
      console.error(companyError);
      setLoading(false);
      return;
    }

    const { data: responseData, error: responseError } = await supabase
      .from("aptitude_responses")
      .select("company_id, user_id");

    if (responseError) {
      console.error(responseError);
      setLoading(false);
      return;
    }

    const attemptsByCompany: Record<string, Set<string>> = {};
    responseData?.forEach((row) => {
      if (!attemptsByCompany[row.company_id]) {
        attemptsByCompany[row.company_id] = new Set();
      }
      attemptsByCompany[row.company_id].add(row.user_id);
    });

    const enrichedCompanies =
      companyData?.map((c) => ({
        id: c.id,
        company_name: c.company_name,
        status: c.status,
        created_at: c.created_at,
        attempted_count: attemptsByCompany[c.id]?.size || 0,
      })) || [];

    setCompanies(enrichedCompanies);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // const toggleStatus = async (id: string, currentStatus: string) => {
  //   const newStatus = currentStatus === "open" ? "close" : "open";
  //   const { error } = await supabase
  //     .from("company_details")
  //     .update({ status: newStatus })
  //     .eq("id", id);

  //   if (error) {
  //     console.error(error);
  //   } else {
  //     // Update UI locally without refetch
  //     setCompanies((prev) =>
  //       prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
  //     );
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 w-full max-w-6xl border border-white/20 transition-all duration-300 hover:shadow-purple-500/20">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10 tracking-tight">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
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
            href="/admin/companyDetails"
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
        <div className="bg-white/10 p-6 rounded-xl overflow-x-auto">
          <h2 className="text-2xl text-white mb-4 font-bold">
            Companies & Student Attempts
          </h2>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <table className="min-w-full text-white">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Company</th>
                  <th className="py-2 px-4">Students Attempted</th>
                  {/* <th className="py-2 px-4">Status</th> */}
                  <th className="py-2 px-4">View Report</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-white/20 hover:bg-white/10 transition"
                  >
                    <td className="py-2 px-4">{c.id}</td>
                    <td className="py-2 px-4">{c.company_name}</td>
                    <td className="py-2 px-4">{c.attempted_count}</td>
                    {/* <td className="py-2 px-4">
                      <button
                        onClick={() => toggleStatus(c.id, c.status)}
                        className={`px-3 py-1 rounded-full font-semibold ${
                          c.status === "open"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {c.status === "open" ? "Open" : "Close"}
                      </button>
                    </td> */}
                    {/* <td className="py-2 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(c.id, "open")}
                          className={`px-3 py-1 rounded-full font-semibold border transition-colors duration-200
        ${
          c.status === "open"
            ? "bg-green-500 border-green-500 text-white"
            : "border-green-500 text-green-500 hover:bg-green-100"
        }`}
                        >
                          Open
                        </button>

                        <button
                          onClick={() => toggleStatus(c.id, "close")}
                          className={`px-3 py-1 rounded-full font-semibold border transition-colors duration-200
        ${
          c.status === "close"
            ? "bg-red-500 border-red-500 text-white"
            : "border-red-500 text-red-500 hover:bg-red-100"
        }`}
                        >
                          Close
                        </button>
                      </div>
                    </td>
*/}
                    <td className="py-2 px-4">
                      <Link
                        href={`/admin/companyReport/${c.id}`}
                        className="text-blue-300 underline"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
