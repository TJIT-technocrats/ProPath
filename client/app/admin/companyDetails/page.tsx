"use client";
import React, { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

interface CompanyFormData {
  company_name: string;
  type: string;
  salary: string;
  status: string;
  location: string;
  last_date: string;
  interview_date: string;
  cgpa_required: string;
  experience: string;
  about_company: string;
  eligible_branches: string;
  backlogs: string;
  job_description: string;
  requirements: string;
  selection_process: string;
}

const CompanyDetails: React.FC = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    company_name: "",
    type: "",
    salary: "",
    status: "",
    location: "",
    last_date: "",
    interview_date: "",
    cgpa_required: "",
    experience: "",
    about_company: "",
    eligible_branches: "",
    backlogs: "",
    job_description: "",
    requirements: "",
    selection_process: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      company_name: formData.company_name,
      type: formData.type,
      salary: formData.salary,
      status: formData.status,
      location: formData.location,
      last_date: formData.last_date,
      interview_date: formData.interview_date,
      cgpa_required: formData.cgpa_required,
      experience: formData.experience,
      about_company: formData.about_company,
      eligible_branches: formData.eligible_branches
        .split(",")
        .map((item) => item.trim()),
      backlogs: formData.backlogs,
      job_description: formData.job_description
        .split(",")
        .map((item) => item.trim()),
      requirements: formData.requirements.split(",").map((item) => item.trim()),
      selection_process: formData.selection_process
        .split(",")
        .map((item) => item.trim()),
    };

    const { data, error } = await supabase
      .from("company_details")
      .insert([payload]);

    if (error) {
      console.error(error);
      setMessage("Error adding company details.");
    } else {
      setMessage("Company details added successfully!");
      // Reset form
      setFormData({
        company_name: "",
        type: "",
        salary: "",
        status: "",
        location: "",
        last_date: "",
        interview_date: "",
        cgpa_required: "",
        experience: "",
        about_company: "",
        eligible_branches: "",
        backlogs: "",
        job_description: "",
        requirements: "",
        selection_process: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 w-full max-w-5xl border border-white/20 transition-all duration-300 hover:shadow-purple-500/20">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10 tracking-tight">
          Add Company Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/90 mb-1 text-sm">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              >
                <option value="">Select Type</option>
                <option value="Internship">Internship</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">
                Salary / Stipend
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">
                Last Date
              </label>
              <input
                type="date"
                name="last_date"
                value={formData.last_date}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">
                Interview Date
              </label>
              <input
                type="date"
                name="interview_date"
                value={formData.interview_date}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">
                CGPA Required
              </label>
              <input
                type="text"
                name="cgpa_required"
                value={formData.cgpa_required}
                onChange={handleChange}
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-1 text-sm">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full rounded-xl p-3 bg-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/90 mb-1 text-sm">
              About Company
            </label>
            <textarea
              name="about_company"
              value={formData.about_company}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl p-3 bg-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1 text-sm">
              Eligible Branches (comma-separated)
            </label>
            <input
              type="text"
              name="eligible_branches"
              value={formData.eligible_branches}
              onChange={handleChange}
              className="w-full rounded-xl p-3 bg-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1 text-sm">Backlogs</label>
            <input
              type="text"
              name="backlogs"
              value={formData.backlogs}
              onChange={handleChange}
              className="w-full rounded-xl p-3 bg-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1 text-sm">
              Job Description (comma-separated bullet points)
            </label>
            <textarea
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl p-3 bg-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1 text-sm">
              Requirements (comma-separated bullet points)
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl p-3 bg-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1 text-sm">
              Selection Process (comma-separated steps)
            </label>
            <textarea
              name="selection_process"
              value={formData.selection_process}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl p-3 bg-white/10 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && <p className="text-center text-white mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;
