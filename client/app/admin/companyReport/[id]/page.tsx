"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const CompanyReportPage: React.FC = () => {
  const params = useParams();
  const id = params.id; // this is your company id from the URL

  const [minMarks, setMinMarks] = useState(0);
  const [reportData, setReportData] = useState<
    {
      user_id: string;
      full_name: string;
      total_marks_obtained: number;
      total_marks_available: number;
    }[]
  >([]);

  useEffect(() => {
    if (!id) return;

    const fetchReport = async () => {
      // 1. Get all aptitudes for this company
      const { data: aptitudes } = await supabase
        .from("aptitudes")
        .select("id")
        .eq("company_id", id);

      const aptitudeIds = aptitudes?.map((a) => a.id) || [];

      if (aptitudeIds.length === 0) {
        setReportData([]);
        return;
      }

      // 2. Total marks available for these aptitudes
      const { data: questions } = await supabase
        .from("aptitude_questions")
        .select("marks, aptitude_id")
        .in("aptitude_id", aptitudeIds);

      const totalMarksAvailable =
        questions?.reduce((sum, q) => sum + q.marks, 0) || 0;

      // 3. Get all responses for these aptitudes
      const { data: responses } = await supabase
        .from("aptitude_responses")
        .select("user_id, marks_obtained")
        .in("aptitude_id", aptitudeIds);

      // 4. Group by user and sum marks_obtained
      const marksByUser: Record<string, number> = {};
      responses?.forEach((r) => {
        marksByUser[r.user_id] =
          (marksByUser[r.user_id] || 0) + (r.marks_obtained || 0);
      });

      // 5. Filter users by minMarks
      const filteredUserIds = Object.keys(marksByUser).filter(
        (uid) => marksByUser[uid] >= minMarks
      );

      // 6. Get user details
      let users: any[] = [];
      if (filteredUserIds.length > 0) {
        const { data: userData } = await supabase
          .from("users")
          .select("id, full_name")
          .in("id", filteredUserIds);

        users = userData || [];
      }

      // 7. Combine into report
      const combined = users.map((u) => ({
        user_id: u.id,
        full_name: u.full_name,
        total_marks_obtained: marksByUser[u.id] || 0,
        total_marks_available: totalMarksAvailable,
      }));

      setReportData(combined);
    };

    fetchReport();
  }, [id, minMarks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
        <h1 className="text-3xl font-bold mb-6">Company Report</h1>

        <div className="mb-6 flex items-center space-x-4">
          <label htmlFor="minMarks" className="font-semibold">
            Minimum Marks:
          </label>
          <input
            id="minMarks"
            type="number"
            value={minMarks}
            onChange={(e) => setMinMarks(Number(e.target.value))}
            className="px-4 py-2 rounded-lg text-black"
            placeholder="Enter minimum marks"
          />
        </div>

        <table className="min-w-full text-white">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">Student</th>
              <th className="py-2 px-4">Marks Obtained</th>
              <th className="py-2 px-4">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-white/70">
                  No students found for this filter
                </td>
              </tr>
            ) : (
              reportData.map((r) => (
                <tr
                  key={r.user_id}
                  className="border-b border-white/20 hover:bg-white/10 transition"
                >
                  <td className="py-2 px-4">{r.full_name}</td>
                  <td className="py-2 px-4">{r.total_marks_obtained}</td>
                  <td className="py-2 px-4">{r.total_marks_available}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyReportPage;
