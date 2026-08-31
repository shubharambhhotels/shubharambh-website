"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-ivory flex items-center justify-center px-4 z-[9999]">
      <div className="w-full max-w-xs">

        {/* Logo */}
        <div className="text-center mb-8 ">
          <h1 className="font-playfair text-3xl text-charcoal">Shubharambh</h1>
          <p className="font-hind text-[11px] tracking-[0.2em] uppercase text-text-muted mt-1">
            Hotel & Banquet · Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-light p-8">
          <h2 className="font-playfair text-2xl text-charcoal mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors"
                placeholder="admin@shubharambh.com"
              />
            </div>

            <div>
              <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-hind text-sm text-red-500 bg-red-50 border border-red-100 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-60 text-center"
            >
              {loading ? "Signing in..." : (
                <span className="flex items-center justify-center gap-2 w-full">
                  <LogIn size={15} />
                  Sign In
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="font-hind text-xs text-text-muted text-center mt-4">
          Shubharambh Hotel & Banquet Hall · Pithoragarh
        </p>
      </div>
    </div>
  );
}