"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/services/api";
import Cookies from "js-cookie";

interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.emailOrPhone,
          password: formData.password,
        }),
      });
      console.log(data);
      Cookies.set("token", data.token);
      Cookies.set("userRole", data.user.role);

      localStorage.setItem("rhemar_user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log(formData);
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "rhemar_user",
        JSON.stringify({
          id: "google-" + Date.now(),
          name: "Google User",
          email: "google.user@gmail.com",
          role: "user",
        }),
      );
      router.push("/");
    }, 1000);
  };

  return (
    <div className="bg-[#fdfdfd] text-[#1a1a1a] py-20">
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#fdfdfd] via-white to-[#fafafa]">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/5">
          {/* Visual Side */}
          <div className="hidden lg:block relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=100&w=1200"
              alt="Maison Rhemar"
              className="w-full h-full object-cover transition-premium duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="absolute inset-0 p-20 flex flex-col justify-between text-white">
              <div className="space-y-4">
                <span className="text-gold font-bold text-[11px] uppercase tracking-[0.6em]">
                  The Maison Sanctuary
                </span>
                <h2 className="text-6xl font-heading leading-tight italic font-light tracking-tight">
                  Welcome <br /> to Elegance
                </h2>
              </div>
              <div className="space-y-8">
                <p className="font-serif-luxury text-2xl italic text-white/60 leading-relaxed max-w-sm">
                  "Access your signature archive and exclusive collections."
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
          <div className="p-12 md:p-24 flex flex-col justify-center bg-[#fafafa]">
            <div className="max-w-md mx-auto w-full space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-6xl font-heading font-medium tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-gray-400 font-serif-luxury italic text-xl">
                  Sign in to access your signature archive.
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

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[9px] font-bold text-gray-400 hover:text-gold uppercase tracking-[0.3em] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] transition-premium flex items-center justify-center gap-4 group ${
                    isLoading
                      ? "bg-gray-100 text-gray-400"
                      : "bg-black text-white shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      SIGN IN
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
                onClick={handleGoogleSignIn}
                className="w-full bg-white border border-gray-100 py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-gray-50 hover:border-gold/20 transition-all flex items-center justify-center gap-4"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>

              <div className="text-center pt-8">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                  New to the Maison?
                  <Link
                    href="/auth/signup"
                    className="ml-3 text-gold hover:text-black border-b border-gold/20 transition-all"
                  >
                    REGISTER HERE
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
