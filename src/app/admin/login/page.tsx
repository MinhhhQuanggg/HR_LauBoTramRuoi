"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Tài khoản hoặc mật khẩu không chính xác!");
      }
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B1E1E] via-[#6B1414] to-[#2a0505] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden backdrop-blur-xl">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center justify-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Hệ Thống Quản Trị Tuyển Dụng Nội Bộ</span>
        </div>

        <div className="p-8 sm:p-10">
          {/* Logo Brand */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-brand-100 bg-brand-50 mb-3 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo Lẩu Bò Trăm Rưỡi"
                width={80}
                height={80}
                priority
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              LẨU BÒ TRĂM RƯỠI
            </h1>
            <p className="text-sm font-semibold text-brand-800 mt-1">
              Quản Trị Bài Tuyển Dụng & Ứng Viên
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Tài Khoản / Email Quản Trị
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  placeholder="Nhập email quản trị viên..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-brand-700 focus:border-brand-700 outline-none transition bg-gray-50/50 hover:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Mật Khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-brand-700 focus:border-brand-700 outline-none transition bg-gray-50/50 hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#A92424] hover:from-[#751919] hover:to-[#8E1E1E] text-white font-bold text-base shadow-lg shadow-red-950/20 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Đăng Nhập Quản Trị</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-brand-900 font-medium transition"
            >
              ← Quay lại trang chủ tuyển dụng Lẩu Bò Trăm Rưỡi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
