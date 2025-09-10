"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "pass123";

const Auth: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 transition-all duration-300 hover:shadow-purple-500/20">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-tight">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange(setUsername)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p className="text-red-300 text-sm text-center animate-pulse">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/30 active:scale-[0.98] transition-all duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
