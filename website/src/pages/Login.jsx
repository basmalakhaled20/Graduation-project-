import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); // أي كلمة مرور هتدخل
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900/95 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gray-800/25 backdrop-blur-2xl border border-gray-500/30 rounded-3xl p-10 shadow-2xl space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-700/25 text-white placeholder:text-gray-300 border border-gray-400/40 focus:ring-2 focus:ring-indigo-500 outline-none backdrop-blur-md shadow-inner"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-700/25 text-white placeholder:text-gray-300 border border-gray-400/40 focus:ring-2 focus:ring-indigo-500 outline-none backdrop-blur-md shadow-inner"
            required
          />
<button
  type="submit"
  className="w-full bg-indigo-500 text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg backdrop-blur-md hover:bg-indigo-600"
>
  Login
</button>
        </form>

        <p className="text-center text-gray-300 mt-3 text-sm">
          Don't have an account? <span className="text-indigo-400 cursor-pointer hover:underline">Sign Up</span>
        </p>
      </div>
    </div>
  );
}