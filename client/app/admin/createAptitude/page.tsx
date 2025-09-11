"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

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
  description: string;
  date: string;
  time_limit: number;
  questions: QuizQuestion[];
}

const CreateAptitude: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionId, setQuestionId] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [quizData, setQuizData] = useState<Quiz | null>(null);

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

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (isSubmitting) return;
  //   setIsSubmitting(true);
  //   setErrorMessage("");

  //   const validationError = validateQuestions();
  //   if (validationError) {
  //     setErrorMessage(validationError);
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   const form = e.currentTarget as HTMLFormElement;
  //   const titleInput = form.elements.namedItem("title") as HTMLInputElement;
  //   const descriptionInput = form.elements.namedItem(
  //     "description"
  //   ) as HTMLTextAreaElement;
  //   const dateInput = form.elements.namedItem("date") as HTMLInputElement;
  //   const durationInput = form.elements.namedItem(
  //     "duration"
  //   ) as HTMLInputElement;

  //   const title = titleInput.value.trim();
  //   const description = descriptionInput.value.trim();
  //   const date = dateInput.value;
  //   const duration = parseInt(durationInput.value);

  //   if (!title) {
  //     setErrorMessage("Quiz title is required.");
  //     setIsSubmitting(false);
  //     return;
  //   }
  //   if (!date) {
  //     setErrorMessage("Quiz date is required.");
  //     setIsSubmitting(false);
  //     return;
  //   }
  //   if (isNaN(duration) || duration <= 0) {
  //     setErrorMessage("Valid time limit (in minutes) is required.");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     const newQuiz: Quiz = {
  //       title,
  //       description,
  //       date,
  //       time_limit: duration,
  //       questions: questions.map((q) => ({
  //         question_text: q.question_text.trim(),
  //         question_type: q.question_type,
  //         marks: parseInt(q.marks),
  //         options:
  //           q.question_type === "objective"
  //             ? q.options.map((opt, idx) => ({
  //                 option_text: opt.trim(),
  //                 is_correct: idx === q.correctOption,
  //               }))
  //             : [],
  //       })),
  //     };

  //     const existingQuizzes = JSON.parse(
  //       localStorage.getItem("quizzes") || "[]"
  //     );
  //     localStorage.setItem(
  //       "quizzes",
  //       JSON.stringify([...existingQuizzes, newQuiz])
  //     );
  //     setQuizData(newQuiz);

  //     alert("Quiz created successfully!");
  //     form.reset();
  //     setQuestions([]);
  //     setQuestionId(1);
  //   } catch (error) {
  //     console.error("Quiz creation error:", error);
  //     setErrorMessage("Failed to create quiz. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const validationError = validateQuestions();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    // const descriptionInput = form.elements.namedItem(
    //   "description"
    // ) as HTMLTextAreaElement;
    const dateInput = form.elements.namedItem("date") as HTMLInputElement;
    const durationInput = form.elements.namedItem(
      "duration"
    ) as HTMLInputElement;

    const title = titleInput.value.trim();
    // const description = descriptionInput.value.trim();
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
      // 1️⃣ Insert quiz into `aptitudes`
      const { data: quizData, error: quizError } = await supabase
        .from("aptitudes")
        .insert([
          {
            title,
            date,
            time_limit: duration,
          },
        ])
        .select()
        .single();

      if (quizError) throw quizError;
      const quizId = quizData.id;

      // 2️⃣ Insert each question
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

        // 3️⃣ Insert options for objective questions
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
    } catch (error) {
      console.error("Quiz creation error:", error);
      setErrorMessage("Failed to create quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-4xl border border-white/20 transition-all duration-300 hover:shadow-purple-500/20">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-tight">
          Create New Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-500/20 text-red-200 rounded-lg text-center animate-pulse">
              {errorMessage}
            </div>
          )}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
              placeholder="e.g. Google"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Time Limit (minutes)
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
                placeholder="e.g. 30"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Questions
            </h3>
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white/5 p-4 rounded-xl mb-4 border border-white/10"
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Question {idx + 1}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 mb-3"
                  placeholder="Enter the question"
                  value={q.question_text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(q.id, "question_text", e.target.value)
                  }
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Type
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
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
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Marks
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
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
                    <label className="block text-sm font-medium text-white/80 mb-2">
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
                          className="h-4 w-4 text-pink-400 focus:ring-pink-400"
                          required={q.question_type === "objective"}
                        />
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
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
                  className="mt-3 bg-red-500/80 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 text-sm font-medium"
                  onClick={() => removeQuestion(q.id)}
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-all duration-200 text-sm font-medium"
              onClick={addQuestion}
            >
              + Add Question
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/30 active:scale-[0.98] transition-all duration-200 disabled:bg-gray-500/50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAptitude;
