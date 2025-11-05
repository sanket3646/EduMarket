"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up with email & password
        const { data, error } = await supabase.auth.signUp(
          { email, password,
          
            options: {
              emailRedirectTo: `${window.location.origin}/auth/confirm`,
            },
          }
        );
        if (error) throw error;
        setMessage(
          "Sign up successful! Check your email and confirm before signing in."
        );
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        if (!data.user?.email_confirmed_at) {
          setMessage(
            "Please confirm your email before logging in. Check your inbox."
          );
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleAuth}
        className="p-6 border rounded-lg shadow-md w-80 flex flex-col gap-3 bg-white"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition font-medium"
        >
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-sm text-center mt-2 cursor-pointer text-indigo-600 hover:underline"
           onClick={() => {
             setIsSignUp(!isSignUp);
             setError("");
             setMessage("");
           }}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <FaGoogle /> Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <FaGithub /> GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
