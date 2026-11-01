"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { APPLICATION_POSITIONS } from "@/data/jobs";
import { ALL_BRANCHES } from "@/data/branches";
import {
  X,
  Send,
  CheckCircle2,
  Phone,
  Sparkles,
  MapPin,
  FileUp,
  FileText,
  Trash2,
} from "lucide-react";

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPositionSlug?: string;
}


import { QuickApplyConfig } from "@/types/quick-apply";
import { Branch } from "@/types/branch";

export default function QuickApplyModal({
  isOpen,
  onClose,
  defaultPositionSlug,
}: QuickApplyModalProps) {
  const [config, setConfig] = useState<QuickApplyConfig>({
    formTitle: "Ứng Tuyển Lẩu Bò Trăm Rưởi",
    formSubtitle: "Đào tạo nghề miễn phí có lương • Phỏng vấn đi làm ngay",
    hrName: "Nguyễn Trung Kiên (Kiên HR)",
    hrPhone: "0981256712",
    zaloUrl: "https://zalo.me/0981256712",
    successTitle: "Nộp Hồ Sơ Thành Công!",
    successMessage: "Thông tin của bạn đã được chuyển thẳng tới Bộ phận Tuyển dụng (HR). Anh Kiên sẽ gọi điện hoặc nhắn tin Zalo cho bạn trong ít phút!",
    successNote: "Vui lòng để ý chuông điện thoại từ số 0981256712 để không bỏ lỡ lịch phỏng vấn nhé.",
    bannerHeadline: "Liên hệ với chúng tôi để nhận thông tin tuyển dụng",
    bannerSub: "Hỗ Trợ Ứng Viên 24/7",
    allowCvUpload: true,
  });
  const [branchesList, setBranchesList] = useState<Branch[]>(ALL_BRANCHES);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    phoneZalo: "",
    appliedRegion: "",
    positionId: "",
    positionTitle: "",
  });

  const [cvFile, setCvFile] = useState<{
    name: string;
    size: number;
    type: string;
    base64: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        positionId: "",
        positionTitle: "",
      }));

      // Fetch dynamic config
      fetch("/api/quick-apply-config")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.config) setConfig(data.config);
        })
        .catch(() => {});

      // Fetch dynamic branches
      fetch("/api/branches")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.branches && data.branches.length > 0) {
            setBranchesList(data.branches);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = APPLICATION_POSITIONS.find((p) => p.id === e.target.value);
    setFormData((prev) => ({
      ...prev,
      positionId: e.target.value,
      positionTitle: selected ? selected.title : e.target.value,
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Dung lượng file CV tối đa là 10MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCvFile({
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        base64: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!formData.positionId) {
      setErrorMsg("Vui lòng chọn vị trí muốn ứng tuyển");
      setLoading(false);
      return;
    }

    const regionToSend = formData.appliedRegion.trim();

    if (!regionToSend) {
      setErrorMsg("Vui lòng chọn khu vực ứng tuyển phù hợp");
      setLoading(false);
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      age: formData.age.trim(),
      phoneZalo: formData.phoneZalo.trim(),
      appliedRegion: regionToSend,
      positionId: formData.positionId,
      positionTitle: formData.positionTitle,
      cvFileName: cvFile ? cvFile.name : undefined,
      cvBase64: cvFile ? cvFile.base64 : undefined,
      cvFileSize: cvFile ? cvFile.size : undefined,
      cvFileType: cvFile ? cvFile.type : undefined,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormData({
      fullName: "",
      age: "",
      phoneZalo: "",
      appliedRegion: "",
      positionId: "",
      positionTitle: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#8B1818] via-[#6B1414] to-[#4A0D0D] text-white p-5 sm:p-6 relative shrink-0 flex items-center gap-3.5 pr-14">
          <Image
            src="/logo.png"
            alt="Lẩu Bò Trăm Rưởi"
            width={48}
            height={48}
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-sm"
          />
          <div>
            <h3 className="text-xl sm:text-[22px] font-bold">{config.formTitle}</h3>
            <p className="text-xs sm:text-sm text-red-100 mt-1">
              {config.formSubtitle}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {config.successTitle}
              </h4>
              <p className="text-sm text-gray-600 mb-6">
                {config.successMessage}
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-xs text-left mb-6">
                💡 <b>Lưu ý:</b> {config.successNote}
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-brand-800 hover:bg-brand-900 text-white font-semibold rounded-xl transition cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* 1. Vị trí muốn ứng tuyển */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Vị trí muốn ứng tuyển <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.positionId}
                  onChange={handlePositionChange}
                  className={`w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white cursor-pointer ${
                    !formData.positionId ? "text-gray-400 font-normal" : "text-gray-900 font-medium"
                  }`}
                  required
                >
                  <option value="" disabled hidden className="text-gray-400">
                    Hãy chọn vị trí phù hợp
                  </option>
                  {APPLICATION_POSITIONS.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Họ tên & Tuổi */}
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
                    min={16}
                    max={60}
                    placeholder="VD: 20"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* 3. Số điện thoại */}
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

              {/* 4. Khu vực ứng tuyển */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Khu vực ứng tuyển <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.appliedRegion}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        appliedRegion: e.target.value,
                      }))
                    }
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white cursor-pointer ${
                      !formData.appliedRegion ? "text-gray-400 font-normal" : "text-gray-900 font-medium"
                    }`}
                    required
                  >
                    <option value="" disabled hidden className="text-gray-400">
                      Hãy chọn chi nhánh gần bạn nhất
                    </option>
                    {branchesList.map((b) => {
                      const branchText = `CN ${b.cnNumber} - ${b.district}: ${b.address}`;
                      return (
                        <option key={b.id} value={branchText}>
                          {branchText}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* 5. CV (nếu bật tính năng đính kèm) */}
              {config.allowCvUpload && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-gray-700">
                      CV đính kèm <span className="text-gray-400 font-normal">(không bắt buộc)</span>
                    </label>
                    <span className="text-[11px] text-gray-400">PDF, Word, Ảnh JPG/PNG ≤ 10MB</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                  />

                  {cvFile ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium text-emerald-900 truncate">
                          {cvFile.name}
                        </span>
                        <span className="text-emerald-700 text-[11px] shrink-0">
                          ({formatFileSize(cvFile.size)})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition shrink-0 cursor-pointer"
                        title="Xóa file CV"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3.5 border border-dashed border-gray-300 hover:border-brand-500 hover:bg-brand-50/20 rounded-xl text-xs text-gray-600 hover:text-brand-900 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileUp className="w-4 h-4 text-brand-700" />
                      <span>Bấm vào đây để tải lên CV hoặc ảnh hồ sơ của bạn</span>
                    </button>
                  )}
                </div>
              )}


              {/* 6. Nút Gửi Đơn Ứng Tuyển Ngay */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
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

              <p className="text-[11px] text-gray-500 text-center pt-1">
                🔒 Cam kết không thu bất kỳ khoản phí nào khi phỏng vấn hoặc nhận việc.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
