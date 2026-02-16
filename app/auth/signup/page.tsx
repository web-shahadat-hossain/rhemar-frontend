"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/services/api";

interface SignupFormData {
  name: string;
  emailOrPhone: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    emailOrPhone: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // ===== Validation =====
    if (!formData.name.trim()) {
      setError("Full name is required");
      setIsLoading(false);
      return;
    }

    if (!formData.emailOrPhone.trim()) {
      setError("Email or phone number is required");
      setIsLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const data = await api("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.emailOrPhone.includes("@")
            ? formData.emailOrPhone
            : "",
          phone: formData.phone,
          password: formData.password,
        }),
      });

      // ✅ Save JWT in cookie
      document.cookie = `rhemar_token=${data.token}; path=/; max-age=604800`;

      // ✅ Save user
      localStorage.setItem("rhemar_user", JSON.stringify(data.user));

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: "google-" + Date.now(),
        name: "Google User",
        email: "google.user@gmail.com",
        role: "user",
      };
      localStorage.setItem("rhemar_user", JSON.stringify(googleUser));
      router.push("/");
    }, 1000);
  };

  return (
    <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#fdfdfd] via-white to-[#fafafa]">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/5">
          {/* Visual Side */}
          <div className="hidden lg:block relative overflow-hidden group order-2">
            <img
              src="/login.jpg"
              alt="Maison Rhemar Signature"
              className="w-full h-full object-cover transition-premium duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="absolute inset-0 p-20 flex flex-col justify-between text-white">
              <div className="space-y-4">
                <span className="text-gold font-bold text-[11px] uppercase tracking-[0.6em]">
                  The Maison Sanctuary
                </span>
                <h2 className="text-6xl font-heading leading-tight italic font-light tracking-tight">
                  Create <br /> Your Legacy
                </h2>
              </div>
              <div className="space-y-8">
                <p className="font-serif-luxury text-2xl italic text-white/60 leading-relaxed max-w-sm">
                  "Join the artisans of refined elegance and unlock a world of
                  bespoke tailoring."
                </p>
                <div className="flex items-center gap-4 text-gold/60">
                  <ShieldCheck size={20} strokeWidth={1} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                    Signature Secure Protocol
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12 md:p-24 flex flex-col justify-center bg-[#fafafa] order-1">
            <div className="max-w-md mx-auto w-full space-y-10">
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-6xl font-heading font-medium tracking-tight">
                  Create Legacy
                </h1>
                <p className="text-gray-400 font-serif-luxury italic text-xl">
                  Join the atelier for a refined experience.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 animate-fade-up">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <p className="text-xs font-bold text-red-600 uppercase tracking-widest">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-4 animate-fade-up">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
                    {success}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <UserIcon
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <input
                    required
                    type="text"
                    placeholder="FULL NAME"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pl-16 text-[10px] font-bold tracking-[0.2em] outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="relative group">
                  <Mail
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <input
                    required
                    type="text"
                    placeholder="EMAIL OR PHONE"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pl-16 text-[10px] font-bold tracking-[0.2em] outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
                    value={formData.emailOrPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, emailOrPhone: e.target.value })
                    }
                  />
                </div>

                <div className="relative group">
                  <Phone
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="PHONE NUMBER"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pl-16 text-[10px] font-bold tracking-[0.2em] outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="relative group">
                  <Lock
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="PASSWORD"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pl-16 pr-16 text-[10px] font-bold tracking-[0.2em] outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative group">
                  <Lock
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="CONFIRM PASSWORD"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pl-16 text-[10px] font-bold tracking-[0.2em] outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] transition-premium flex items-center justify-center gap-4 group ${
                    isLoading
                      ? "bg-gray-100 text-gray-400"
                      : "bg-black text-white hover:bg-gold hover:text-black shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      CREATE ACCOUNT{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.5em] font-bold">
                  <span className="bg-[#fafafa] px-6 text-gray-300">OR</span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignUp}
                className="w-full bg-white border border-gray-100 py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-gray-50 hover:border-gold/20 transition-all flex items-center justify-center gap-4"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              <div className="text-center pt-6">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Already an artisan?
                  <Link
                    href="/auth/login"
                    className="ml-3 text-gold hover:text-black border-b border-gold/20 transition-all"
                  >
                    SIGN IN
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
