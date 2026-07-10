import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { ROUTES } from "../../../app/router/routes";

import loginIllustration from "../../../assets/images/login-illustration.png";

/**
 * Login screen, themed to match the Zook admin (black + orange).
 * Form state is local (useState); the network call + auth state are handled
 * by the useLogin mutation. On success we return the user to wherever they
 * were headed before being bounced to /login.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.productCatalog;

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate(
      { email, password },
      { onSuccess: () => navigate(from, { replace: true }) }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0e12] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-orange-600 font-black text-3xl tracking-widest">ZOOK</span>
          <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
            ADMIN
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-black rounded-2xl border border-white/10 p-7 shadow-xl"
        >
          <h1 className="text-white font-bold text-lg mb-1">Sign in</h1>
          <p className="text-gray-400 text-sm mb-6">Access the admin console</p>

          <label className="block text-gray-300 text-xs font-semibold mb-1.5">
            Email
          </label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2.5 rounded-lg bg-[#1e1f26] text-white text-sm border border-white/10 outline-none focus:border-orange-500 transition"
            placeholder="admin@zook.com"
            required
          />

          <label className="block text-gray-300 text-xs font-semibold mb-1.5">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 px-3 py-2.5 rounded-lg bg-[#1e1f26] text-white text-sm border border-white/10 outline-none focus:border-orange-500 transition"
            placeholder="••••••••"
            required
          />

       {login.isError && (
         <p className="text-red-400 text-xs mb-4">
            {Array.isArray(login.error?.response?.data?.message)
               ? login.error.response.data.message[0]
               : login.error?.response?.data?.message
               || login.error?.message
               || "Login failed"}
         </p>
       )}

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white text-sm font-semibold transition"
          >
            {login.isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
