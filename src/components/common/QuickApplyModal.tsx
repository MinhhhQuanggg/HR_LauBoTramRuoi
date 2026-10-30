"use client";

import { useState } from "react";
import { JOBS_DATA } from "@/data/jobs";
import { ALL_BRANCHES } from "@/data/branches";
import { X, Send, CheckCircle2, Phone, Sparkles } from "lucide-react";

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPositionSlug?: string;
}

export default function QuickApplyModal({
  isOpen,
  onClose,
  defaultPositionSlug,
}: QuickApplyModalProps) {
  const defaultJob = defaultPositionSlug
    ? JOBS_DATA.find((j) => j.slug === defaultPositionSlug)
    : JOBS_DATA[0];

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    phoneZalo: "",
    address: "",
    positionId: defaultJob ? defaultJob.id : JOBS_DATA[0].id,
    positionTitle: defaultJob ? defaultJob.title : JOBS_DATA[0].title,
    preferredBranch: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedJob = JOBS_DATA.find((j) => j.id === e.target.value);
    setFormData((prev) => ({
      ...prev,
      positionId: e.target.value,
      positionTitle: selectedJob ? selectedJob.title : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gửi đơn không thành công");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || "Đã xảy ra sự cố kết nối");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-700 text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
              Tuyển Dụng Nhanh - 30 Giây
            </span>
          </div>
          <h3 className="text-[22px] font-bold">Ứng Tuyển Lẩu Bò Trăm Rưỡi</h3>
          <p className="text-sm text-red-100 mt-1">
            Đào tạo nghề miễn phí có lương • Phỏng vấn đi làm ngay
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Nộp Hồ Sơ Thành Công!
              </h4>
              <p className="text-sm text-gray-600 mb-6">
                Thông tin của bạn đã được chuyển thẳng tới Bộ phận Tuyển dụng (HR).
                Anh Kiên sẽ gọi điện hoặc nhắn tin Zalo cho bạn trong ít phút!
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-xs text-left mb-6">
                💡 <b>Lưu ý:</b> Vui lòng để ý chuông điện thoại từ số{" "}
                <span className="font-semibold text-emerald-900">0981256712</span>{" "}
                để không bỏ lỡ lịch phỏng vấn nhé.
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-brand-800 hover:bg-brand-900 text-white font-semibold rounded-xl transition"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Vị trí */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Vị trí muốn ứng tuyển <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.positionId}
                  onChange={handlePositionChange}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none bg-gray-50/50"
                  required
                >
                  {JOBS_DATA.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} ({job.salaryDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Họ tên & Tuổi */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn An"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tuổi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={18}
                    max={55}
                    placeholder="VD: 20"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* SĐT Zalo */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Số điện thoại Zalo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0981256712 (để HR gọi phỏng vấn)"
                    value={formData.phoneZalo}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneZalo: e.target.value })
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Khu vực sống / Chi nhánh */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Khu vực bạn đang ở <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Gò Vấp, Thủ Đức..."
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tiệm mong muốn làm
                  </label>
                  <select
                    value={formData.preferredBranch}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredBranch: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white"
                  >
                    <option value="">Gần nhà nhất (HR tự xếp)</option>
                    {ALL_BRANCHES.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.district} - {b.name.replace("Lẩu Bò Trăm Rưỡi - ", "")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 bg-brand-800 hover:bg-brand-900 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi Đơn Ứng Tuyển Ngay</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-500 text-center">
                🔒 Cam kết không thu bất kỳ khoản phí nào khi phỏng vấn hoặc nhận việc.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
