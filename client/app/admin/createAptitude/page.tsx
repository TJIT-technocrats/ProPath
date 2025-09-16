"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams, useRouter } from "next/navigation";

type QuestionType = "objective" | "subjective";

interface Question {
  id: number;
  question_text: string;
  question_type: QuestionType;
  marks: string;
  options: string[];
  correctOption: number | null;
}

interface QuizOption {
  option_text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  question_text: string;
  question_type: QuestionType;
  marks: number;
  options: QuizOption[];
}

interface Quiz {
  title: string;
  description?: string;
  date: string;
  time_limit: number;
  questions: QuizQuestion[];
}

const CreateAptitude: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionId, setQuestionId] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [manualCompanyId, setManualCompanyId] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const companyIdFromUrl = searchParams.get("companyId");
  const companyId = companyIdFromUrl || manualCompanyId;

  useEffect(() => {
    if (!companyIdFromUrl) {
      setErrorMessage("No companyId found in URL. Please enter it manually.");
    }
  }, [companyIdFromUrl]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questionId,
        question_text: "",
        question_type: "objective",
        marks: "",
        options: ["", "", "", ""],
        correctOption: null,
      },
    ]);
    setQuestionId((prev) => prev + 1);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleChange = (id: number, field: keyof Question, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (
    id: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const handleCorrectOptionChange = (id: number, optionIndex: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, correctOption: optionIndex } : q
      )
    );
  };

  const validateQuestions = (): string => {
    if (questions.length === 0) return "At least one question is required.";
    for (const q of questions) {
      if (!q.question_text.trim()) return "All questions must have text.";
      if (!q.marks || isNaN(parseInt(q.marks)) || parseInt(q.marks) <= 0) {
        return "All questions must have valid marks (positive number).";
      }
      if (q.question_type === "objective") {
        if (q.options.some((opt) => !opt.trim())) {
          return "All options for objective questions must be filled.";
        }
        if (q.correctOption === null) {
          return "A correct option must be selected for each objective question.";
        }
      }
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    if (!companyId) {
      setErrorMessage("Company ID is required.");
      setIsSubmitting(false);
      return;
    }

    const validationError = validateQuestions();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const dateInput = form.elements.namedItem("date") as HTMLInputElement;
    const durationInput = form.elements.namedItem(
      "duration"
    ) as HTMLInputElement;

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const duration = parseInt(durationInput.value);

    if (!title) {
      setErrorMessage("Quiz title is required.");
      setIsSubmitting(false);
      return;
    }
    if (!date) {
      setErrorMessage("Quiz date is required.");
      setIsSubmitting(false);
      return;
    }
    if (isNaN(duration) || duration <= 0) {
      setErrorMessage("Valid time limit (in minutes) is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: quizData, error: quizError } = await supabase
        .from("aptitudes")
        .insert([
          {
            title,
            date,
            time_limit: duration,
            company_id: companyId,
          },
        ])
        .select()
        .single();

      if (quizError) throw quizError;
      const quizId = quizData.id;

      for (const q of questions) {
        const { data: questionData, error: questionError } = await supabase
          .from("aptitude_questions")
          .insert([
            {
              aptitude_id: quizId,
              question_text: q.question_text.trim(),
              question_type: q.question_type,
              marks: parseInt(q.marks),
            },
          ])
          .select()
          .single();

        if (questionError) throw questionError;
        const questionId = questionData.id;

        if (q.question_type === "objective") {
          const optionsPayload = q.options.map((opt, idx) => ({
            question_id: questionId,
            option_text: opt.trim(),
            is_correct: idx === q.correctOption,
          }));

          const { error: optionsError } = await supabase
            .from("aptitude_options")
            .insert(optionsPayload);

          if (optionsError) throw optionsError;
        }
      }

      alert("Quiz created successfully in Supabase!");
      form.reset();
      setQuestions([]);
      setQuestionId(1);
      setManualCompanyId("");
    } catch (error) {
      console.error("Quiz creation error:", error);
      setErrorMessage("Failed to create quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-6">
      <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-5xl border border-white/30">
        <h2 className="text-4xl font-extrabold text-center text-gray-100 mb-8">
          Create New Aptitude Quiz
        </h2>

        {/* ✅ Company ID visibly shown */}
        <div className="text-center mb-6">
          {companyId ? (
            <p className="text-lg font-semibold text-yellow-200">
              📌 Company ID: <span className="font-bold">{companyId}</span>
            </p>
          ) : (
            <p className="text-red-300 font-medium">
              ⚠️ No Company ID found. Please enter it below.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-600/30 text-red-100 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          {/* Company ID input */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Enter / Confirm Company ID
            </label>
            <input
              type="text"
              value={companyId}
              onChange={(e) => setManualCompanyId(e.target.value)}
              placeholder="Enter Company ID"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Title, Date, Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Quiz Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border border-gray-300"
              placeholder="e.g. Google Aptitude Test"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                name="duration"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border border-gray-300"
                placeholder="e.g. 30"
                min="1"
                required
              />
            </div>
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              Questions
            </h3>
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white/10 p-4 rounded-xl mb-4 border border-white/20"
              >
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Question {idx + 1}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border border-gray-300 mb-3"
                  placeholder="Enter the question"
                  value={q.question_text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(q.id, "question_text", e.target.value)
                  }
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Type
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border border-gray-300"
                      value={q.question_type}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleChange(
                          q.id,
                          "question_type",
                          e.target.value as QuestionType
                        )
                      }
                    >
                      <option value="objective">Objective</option>
                      <option value="subjective">Subjective</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Marks
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border border-gray-300"
                      placeholder="e.g. 2"
                      value={q.marks}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(q.id, "marks", e.target.value)
                      }
                      min="1"
                      required
                    />
                  </div>
                </div>

                {q.question_type === "objective" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Options
                    </label>
                    {q.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className="flex items-center gap-2 mb-2"
                      >
                        <input
                          type="radio"
                          name={`correct-option-${q.id}`}
                          checked={q.correctOption === optIdx}
                          onChange={() =>
                            handleCorrectOptionChange(q.id, optIdx)
                          }
                          className="h-4 w-4 text-pink-500"
                          required={q.question_type === "objective"}
                        />
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-xl bg-gray-50 text-gray-900 border border-gray-300"
                          placeholder={`Option ${optIdx + 1}`}
                          value={option}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleOptionChange(q.id, optIdx, e.target.value)
                          }
                          required
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  onClick={() => removeQuestion(q.id)}
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
              onClick={addQuestion}
            >
              + Add Question
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Proceed to Add Aptitude Questions"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-900 font-semibold text-lg shadow hover:bg-gray-300 transition"
            >
              ⬅ Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAptitude;
