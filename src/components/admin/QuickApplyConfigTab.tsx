"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Sparkles,
  Eye,
  RefreshCw,
  Send,
  Upload,
} from "lucide-react";
import { QuickApplyConfig } from "@/types/quick-apply";

export default function QuickApplyConfigTab() {
  const [config, setConfig] = useState<QuickApplyConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/quick-apply-config");
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error("Failed to load quick apply config:", err);
      showToast("Không thể tải cấu hình form ứng tuyển", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/quick-apply-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Đã lưu thông tin Form Ứng Tuyển Nhanh thành công!", "success");
      } else {
        showToast(data.error || "Không thể lưu cấu hình", "error");
      }
    } catch {
      showToast("Lỗi khi lưu cấu hình form", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !config) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-brand-800 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-gray-500">Đang tải cấu hình form ứng tuyển...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-white font-medium text-sm animate-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Banner Giới Thiệu */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-950 via-brand-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-amber-900/40">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-3xl shadow-inner">
            📋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-white">
                Chỉnh Sửa Thông Tin Form Ứng Tuyển Nhanh
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 uppercase tracking-wider">
                Ứng Tuyển & Zalo
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Bạn có thể tùy chỉnh tiêu đề popup nộp đơn, số điện thoại Hotline/Zalo của HR, thông điệp phản hồi sau khi nộp và nội dung banner chân trang.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchConfig}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition"
            title="Tải lại dữ liệu gốc"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2 Cột: Cột Trái Form Cấu Hình - Cột Phải Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CỘT TRÁI: FORM CHỈNH SỬA (7 CỘT) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Nhóm 1: Tiêu đề & Khẩu hiệu Form Popup */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileText className="w-4 h-4 text-brand-800" />
              <span>1. Tiêu Đề & Khẩu Hiệu Trong Popup Ứng Tuyển</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tiêu Đề Popup Form <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={config.formTitle}
                onChange={(e) => setConfig({ ...config, formTitle: e.target.value })}
                placeholder="Ứng Tuyển Lẩu Bò Trăm Rưởi"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Khẩu Hiệu / Phụ Đề
              </label>
              <input
                type="text"
                value={config.formSubtitle}
                onChange={(e) => setConfig({ ...config, formSubtitle: e.target.value })}
                placeholder="Đào tạo nghề miễn phí có lương • Phỏng vấn đi làm ngay"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={config.allowCvUpload}
                  onChange={(e) => setConfig({ ...config, allowCvUpload: e.target.checked })}
                  className="w-5 h-5 rounded text-brand-800 focus:ring-brand-700"
                />
                <div>
                  <span className="font-bold text-gray-900 text-sm">Cho phép ứng viên đính kèm file CV</span>
                  <p className="text-xs text-gray-500">Hiển thị nút tải file PDF/Word (không bắt buộc đối với ứng viên)</p>
                </div>
              </label>
            </div>
          </div>

          {/* Nhóm 2: Thông tin Hotline Tuyển Dụng & Zalo */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>2. Thông Tin Hotline & Phụ Trách Tuyển Dụng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tên Phụ Trách Tuyển Dụng (HR)
                </label>
                <input
                  type="text"
                  value={config.hrName}
                  onChange={(e) => setConfig({ ...config, hrName: e.target.value })}
                  placeholder="Nguyễn Trung Kiên (Kiên HR)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Số Điện Thoại / Zalo Hotline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={config.hrPhone}
                  onChange={(e) => setConfig({ ...config, hrPhone: e.target.value })}
                  placeholder="0981256712"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-brand-900 focus:ring-2 focus:ring-brand-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Đường Dẫn Chat Zalo Trực Tiếp
              </label>
              <input
                type="text"
                value={config.zaloUrl}
                onChange={(e) => setConfig({ ...config, zaloUrl: e.target.value })}
                placeholder="https://zalo.me/0981256712"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>
          </div>

          {/* Nhóm 3: Thông báo khi nộp hồ sơ thành công */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>3. Lời Nhắn Khi Nộp Đơn Thành Công</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tiêu Đề Thành Công
              </label>
              <input
                type="text"
                value={config.successTitle}
                onChange={(e) => setConfig({ ...config, successTitle: e.target.value })}
                placeholder="Nộp Hồ Sơ Thành Công!"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Lời Nhắn Tới Ứng Viên
              </label>
              <textarea
                rows={3}
                value={config.successMessage}
                onChange={(e) => setConfig({ ...config, successMessage: e.target.value })}
                placeholder="Thông tin của bạn đã được chuyển thẳng tới Bộ phận Tuyển dụng (HR)..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Ghi Chú Nhắc Nhở Điện Thoại
              </label>
              <input
                type="text"
                value={config.successNote}
                onChange={(e) => setConfig({ ...config, successNote: e.target.value })}
                placeholder="Vui lòng để ý chuông điện thoại từ số 0981256712 để không bỏ lỡ lịch phỏng vấn nhé."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>
          </div>

          {/* Nhóm 4: Banner Nổi Tuyển Dụng Trang Chủ */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>4. Tiêu Đề Banner Nổi Dưới Trang Chủ</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tiêu Đề Banner
              </label>
              <input
                type="text"
                value={config.bannerHeadline}
                onChange={(e) => setConfig({ ...config, bannerHeadline: e.target.value })}
                placeholder="Liên hệ với chúng tôi để nhận thông tin tuyển dụng"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Phụ Đề Nhỏ
              </label>
              <input
                type="text"
                value={config.bannerSub}
                onChange={(e) => setConfig({ ...config, bannerSub: e.target.value })}
                placeholder="Hỗ Trợ Ứng Viên 24/7"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
              />
            </div>
          </div>

          {/* Nút Submit Lưu */}
          <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Thay đổi sẽ được áp dụng ngay lập tức trên toàn hệ thống.
            </p>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-red-950 text-white font-black text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Lưu Cấu Hình Form</span>
            </button>
          </div>
        </form>

        {/* CỘT PHẢI: LIVE PREVIEW (5 CỘT) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-gradient-to-b from-gray-900 to-brand-950 text-white p-5 rounded-3xl shadow-xl border border-amber-900/30">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
                Xem Trước Giao Diện Thực Tế
              </h4>
            </div>

            {/* Mô phỏng Banner Nổi */}
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-bold text-gray-300">Banner Nổi Trang Chủ:</span>
              <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-md border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-600 text-xs shrink-0">
                    Zalo
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">
                      {config.bannerSub}
                    </span>
                    <h5 className="text-xs font-black leading-snug line-clamp-2">
                      {config.bannerHeadline}
                    </h5>
                  </div>
                </div>

                <div className="bg-brand-50 p-2 rounded-xl flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-brand-950">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>{config.hrPhone}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-800 text-white font-bold text-[11px]">
                    Nhắn Zalo
                  </span>
                </div>
              </div>
            </div>

            {/* Mô phỏng Popup Header & Form */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-300">Popup Ứng Tuyển Nhanh:</span>
              <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-200 text-xs">
                {/* Header đỏ Trăm Rưởi */}
                <div className="bg-gradient-to-r from-brand-900 to-brand-800 text-white p-3.5 flex items-center gap-3">
                  <Image src="/logo.png" alt="" width={32} height={32} className="object-contain shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm leading-snug">{config.formTitle}</h5>
                    <p className="text-[10px] text-amber-200 line-clamp-1">{config.formSubtitle}</p>
                  </div>
                </div>

                {/* Form fields mockup */}
                <div className="p-4 space-y-2.5 bg-gray-50/60">
                  <div className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-[11px]">
                    Họ và tên của bạn...
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-[11px]">
                    Số điện thoại / Zalo...
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-[11px]">
                    Chọn vị trí công việc...
                  </div>

                  {config.allowCvUpload && (
                    <div className="p-2 rounded-lg border border-dashed border-gray-300 text-center text-gray-500 text-[10px] flex items-center justify-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Đính kèm file CV (PDF / Word)</span>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-brand-800 text-white font-bold text-center text-xs shadow-sm">
                    Gửi Hồ Sơ Ứng Tuyển Ngay
                  </div>
                </div>

                {/* Footer preview note */}
                <div className="p-3 bg-amber-50/80 border-t border-amber-100 text-[10px] text-amber-900">
                  💡 <b>Hotline HR:</b> {config.hrName} • {config.hrPhone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
