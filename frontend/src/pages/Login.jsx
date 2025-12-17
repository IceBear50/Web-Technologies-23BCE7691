import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-tr from-blue-100 to-violet-100 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 rounded-2xl glass-panel">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-slate-200 bg-transparent focus:outline-none focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
            />
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-slate-200 bg-transparent focus:outline-none focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
            />
            <button className="btn-primary w-full py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 mt-2">
              Continue
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            <span>Don't have an account? </span>
            <a href="/signup" className="text-[#FF3AC4] hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}