import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { ROUTES } from "../../../app/router/routes";
import { Link } from "react-router-dom";
import LoginLaptopImage from "../../../assets/images/LoginLaptopImage.png";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
} from "react-icons/fi";


/**
 * Login screen, themed to match the Zook admin (black + orange).
 * Form state is local (useState); the network call + auth state are handled
 * by the useLogin mutation. On success we return the user to wherever they
 * were headed before being bounced to /login.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();
  const navigate = useNavigate();
  const from = ROUTES.overview;

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate(
  { email, password },
  {
    onSuccess: (data) => {
      console.log("Login Success:", data);
      console.log("Redirecting to:", from);
      navigate(from, { replace: true });
    },
  }
);
  };

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center overflow-hidden p-3">
      <div className="w-full max-w-[1650px] bg-white rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.12)] overflow-hidden">
        <div className="grid lg:grid-cols-[1.6fr_0.8fr] h-full">
          {/* LEFT SIDE */}
<div className="hidden lg:block overflow-hidden">
  <img
    src={LoginLaptopImage}
    alt="Zook Admin"
    className="w-full h-full object-fill"
    draggable={false}
  />
</div>
    <div className="relative flex items-center justify-center bg-white px-10 py-8">

  <div className="relative w-full max-w-[420px] flex flex-col justify-center">

    {/* Decorative dots */}
    

    <form onSubmit={handleSubmit} className="w-full mt-16">
          <h1 className="text-5xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-500 text-base mt-4 mb-12 leading-7">
          
          </p>

          <label className="block mb-2 text-sm font-semibold text-gray-700">
  Email
</label>

<div className="relative">
  <FiMail
    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
    size={18}
  />

  <input
    type="email"
    autoComplete="username"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    className="w-full h-12 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 shadow-sm transition-all duration-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
    required
  />
</div>

          <label className="block text-sm font-semibold text-gray-800 mt-6 mb-2">
  Password
</label>

<div className="relative">
  <FiLock
    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
    size={18}
  />

  <input
    type={showPassword ? "text" : "password"}
    autoComplete="current-password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
    className="w-full h-12 rounded-2xl border border-gray-200 bg-white pl-12 pr-12 shadow-sm transition-all duration-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400"
  >
    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
  </button>
</div>
    <div className="flex items-center justify-between mt-6 mb-2">
  <label className="flex items-center gap-2 text-sm text-gray-600">
    <input
      type="checkbox"
      className="w-5 h-5 accent-orange-500 rounded"/>
    Remember me
  </label>

  <button
    type="button"
    className="text-sm font-medium text-orange-500 hover:text-orange-600"
  >
    Forgot password?
  </button>
</div>

       {login.isError && (
         <p className="text-red-500 text-xs mb-4">
            {Array.isArray(login.error?.response?.data?.message)
               ? login.error.response.data.message[0]
               : login.error?.response?.data?.message
               || login.error?.message
               || "Login failed"}
         </p>
       )}

          <button type="submit"
            disabled={login.isPending}
            className="w-full mt-6 h-12 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-orange-600 hover:to-orange-700 text-white text-base font-semibold shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2">
            <FiLogIn size={18} />
              {login.isPending ? "Signing in..." : "Sign In"}
          </button>
          <div className="mt-10 flex items-center">
  <div className="flex-1 h-px bg-gray-200"></div>
  <div className="flex-1 h-px bg-gray-200"></div>
</div>
<div className="mt-6 text-center text-xs text-gray-500 whitespace-nowrap">
  By logging in, you accept our{" "}
  <Link
    to="/terms"
    className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
  >
    Terms &amp; Conditions
  </Link>
  {" and "}
  <Link
    to="/privacy"
    className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
  >
    Privacy Policy
  </Link>
  .
</div>


        </form>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}
