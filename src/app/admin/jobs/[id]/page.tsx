"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  Copy,
  Check,
  Video,
  ImageIcon,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { JobItem, ConcisePoint } from "@/types/job";

const POPULAR_ICONS = ["🔹", "🌙", "👤", "✨", "💰", "🛵", "🔥", "🍲", "⭐", "📍"];

export default function JobDetailPageAdmin() {
  const params = useParams();
  const router = useRouter();
  const jobId = (params?.id as string) || "";

  const [job, setJob] = useState<JobItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [badgesInput, setBadgesInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<"video" | "images">("images");

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchJob = async () => {
    if (!jobId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`);
      const data = await res.json();
      if (data.success && data.job) {
        setJob(data.job);
      } else {
        showToast(data.error || "Không tìm thấy thông tin vị trí", "error");
      }
    } catch {
      showToast("Lỗi khi tải thông tin vị trí", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  // Toggle active status
  const handleToggleActive = async () => {
    if (!job) return;
    const newStatus = !job.isActive;
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setJob({ ...job, isActive: newStatus });
        showToast(`Đã ${newStatus ? "bật hiển thị" : "ẩn"} vị trí "${job.title}"!`, "success");
      } else {
        showToast(data.error || "Không thể cập nhật trạng thái", "error");
      }
    } catch {
      showToast("Lỗi kết nối", "error");
    }
  };

  // Copy shareable link
  const handleCopyLink = () => {
    if (!job) return;
    const url = `${window.location.origin}/viec-lam/${job.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    showToast("Đã sao chép liên kết tuyển dụng!", "success");
  };

  // Open Edit Form
  const handleOpenEdit = () => {
    if (!job) return;
    const images = job.images && job.images.length > 0 ? [...job.images] : [];
    const concisePost = job.concisePost || {
      headline: `🔥 TUYỂN DỤNG ${job.title.toUpperCase()} 🔥`,
      intro: "Chào mừng bạn gia nhập gia đình Lẩu Bò Trăm Rưởi!",
      points: [
        { icon: "🔹", label: "Khởi đầu nhẹ nhàng:", content: "Làm quen môi trường, hướng dẫn tận tình." },
        { icon: "🌙", label: "Ca làm việc:", content: "14h00 – 24h00 mỗi ngày" },
        { icon: "👤", label: "Độ tuổi:", content: "18 – 30 tuổi" },
        { icon: "💰", label: "Khởi điểm:", content: job.salaryDisplay },
      ],
      zalo: job.contactZalo || "0981256712",
    };

    const currentBadges = job.badges && job.badges.length > 0
      ? job.badges.join(", ")
      : job.badge || "18–30 tuổi, Chưa có tay nghề";

    setBadgesInput(currentBadges);
    setEditingJob({
      ...job,
      images,
      videoUrl: job.videoUrl || "",
      videoPoster: job.videoPoster || (images.length > 0 ? images[0] : ""),
      concisePost,
    });
    setIsModalOpen(true);
  };

  // Add a new bullet point
  const handleAddPoint = () => {
    if (!editingJob || !editingJob.concisePost) return;
    const updatedPoints = [
      ...editingJob.concisePost.points,
      { icon: "🔹", label: "Nội dung mới:", content: "Mô tả chi tiết quyền lợi hoặc công việc..." },
    ];
    setEditingJob({
      ...editingJob,
      concisePost: {
        ...editingJob.concisePost,
        points: updatedPoints,
      },
    });
  };

  // Remove a bullet point
  const handleRemovePoint = (index: number) => {
    if (!editingJob || !editingJob.concisePost) return;
    const updatedPoints = [...editingJob.concisePost.points];
    updatedPoints.splice(index, 1);
    setEditingJob({
      ...editingJob,
      concisePost: {
        ...editingJob.concisePost,
        points: updatedPoints,
      },
    });
  };

  // Update a bullet point
  const handleUpdatePoint = (index: number, field: keyof ConcisePoint, value: string) => {
    if (!editingJob || !editingJob.concisePost) return;
    const updatedPoints = [...editingJob.concisePost.points];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    setEditingJob({
      ...editingJob,
      concisePost: {
        ...editingJob.concisePost,
        points: updatedPoints,
      },
    });
  };

  // Save Job
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.title) return;

    // Parse badges
    const parsedBadges = badgesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const jobToSave: JobItem = {
      ...editingJob,
      badges: parsedBadges,
      badge: parsedBadges.join(", "),
      contactZalo: editingJob.concisePost?.zalo || editingJob.contactZalo || "0981256712",
    };

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/jobs/${jobToSave.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobToSave),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Đã lưu thay đổi cho "${jobToSave.title}"!`, "success");
        setIsModalOpen(false);
        setJob(jobToSave);
      } else {
        showToast(data.error || "Không thể lưu dữ liệu", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Lỗi lưu dữ liệu", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // File Upload Helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file || !editingJob) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      showToast(`Đang tải ${targetField === "video" ? "video" : "ảnh"} lên...`, "success");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (targetField === "video") {
          setEditingJob({ ...editingJob, videoUrl: data.url });
          showToast("Đã tải video lên thành công!", "success");
        } else {
          const currentImages = editingJob.images || [];
          setEditingJob({ ...editingJob, images: [...currentImages, data.url] });
          showToast("Đã thêm ảnh mới thành công!", "success");
        }
      } else {
        showToast(data.error || "Tải tệp lên thất bại", "error");
      }
    } catch {
      showToast("Lỗi khi kết nối tải tệp", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-500">Đang tải thông tin vị trí...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 max-w-md w-full text-center shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy vị trí tuyển dụng</h2>
          <p className="text-sm text-gray-500 mb-6">Mã vị trí "{jobId}" không tồn tại hoặc đã bị xóa.</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 text-white font-bold text-sm shadow hover:bg-brand-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Quản Trị</span>
          </Link>
        </div>
      </div>
    );
  }

  // Display badges
  const displayBadges =
    job.badges && job.badges.length > 0
      ? job.badges
      : job.badge
      ? job.badge.split(",").map((s) => s.trim())
      : ["18–30 tuổi", "Chưa có tay nghề"];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-bottom duration-200 ${
            toastMessage.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toastMessage.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 -ml-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay Lại Danh Sách</span>
            </Link>
            <div className="h-5 w-px bg-gray-200 hidden sm:block" />
            <span className="text-xs font-mono font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/60 hidden sm:inline">
              ID: {job.id}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle Status */}
            <button
              onClick={handleToggleActive}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                job.isActive
                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${job.isActive ? "bg-emerald-600 animate-pulse" : "bg-gray-400"}`} />
              <span>{job.isActive ? "Đang Bật Tuyển" : "Đang Ẩn"}</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition flex items-center gap-1.5"
              title="Sao chép link ứng tuyển"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? "Đã chép" : "Chép link"}</span>
            </button>

            {/* View Live */}
            <Link
              href={`/viec-lam/${job.slug}`}
              target="_blank"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition flex items-center gap-1.5"
              title="Xem trang thực tế"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Xem Ngoài Web</span>
            </Link>

            {/* Edit Button */}
            <button
              onClick={handleOpenEdit}
              className="px-4 py-1.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chỉnh Sửa</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Khớp 1:1 với bố cục trang Client */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CỘT TRÁI (70%): NỘI DUNG TUYỂN DỤNG THỰC TẾ TRÊN CLIENT */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/80">
              {/* Badges, Tiêu đề, Lương */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {displayBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-100"
                    >
                      {badge}
                    </span>
                  ))}
                  {job.isUrgent && (
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-extrabold bg-red-100 text-red-700 border border-red-200">
                      🔥 Tuyển gấp
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  {job.title}
                </h1>

                <div className="mt-3 flex items-center text-lg sm:text-xl font-bold text-brand-900">
                  <span>💰 {job.salaryDisplay}</span>
                </div>
              </div>

              {/* Nội dung bài đăng thực tế (Intro + Points + Zalo) */}
              <div className="space-y-6">
                {/* Đoạn giới thiệu */}
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                  {job.concisePost?.intro || "Chưa có đoạn giới thiệu."}
                </p>

                {/* Danh sách các gạch đầu dòng */}
                <div className="space-y-4 pt-1">
                  {job.concisePost?.points && job.concisePost.points.length > 0 ? (
                    job.concisePost.points.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 text-base sm:text-lg text-gray-800 leading-relaxed"
                      >
                        <span className="text-2xl shrink-0 mt-0.5 select-none">{point.icon}</span>
                        <div>
                          {point.label && (
                            <span className="font-bold text-gray-950 mr-1.5">{point.label}</span>
                          )}
                          <span>{point.content}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">Chưa có các gạch đầu dòng chi tiết.</p>
                  )}

                  {/* Dòng liên hệ Zalo */}
                  <div className="flex items-center gap-3.5 text-base sm:text-lg pt-4 border-t border-gray-100">
                    <span className="text-2xl shrink-0 select-none">📲</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-gray-950">Zl:</span>
                      <a
                        href={`https://zalo.me/${(job.concisePost?.zalo || job.contactZalo || "0981256712").replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-black text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-2"
                      >
                        <span>{job.concisePost?.zalo || job.contactZalo || "0981256712"}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                          Nhắn Zalo Phỏng Vấn
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút chỉnh sửa nhanh */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Trang hiển thị này giống hệt những gì ứng viên xem trên website.
                </span>
                <button
                  onClick={handleOpenEdit}
                  className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-brand-900 text-xs font-bold transition flex items-center gap-1.5 border border-amber-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa Nội Dung Này</span>
                </button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (30%): MEDIA THỰC TẾ (VIDEO & HÌNH ẢNH) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box Video */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-600" />
                  <span>Video Công Việc</span>
                </span>
                <button
                  onClick={handleOpenEdit}
                  className="text-xs font-bold text-brand-900 hover:underline"
                >
                  Đổi video
                </button>
              </div>

              {job.videoUrl ? (
                <div className="rounded-2xl overflow-hidden aspect-[9/16] bg-black border border-gray-200 shadow-inner">
                  <video
                    src={job.videoUrl}
                    poster={job.videoPoster || (job.images && job.images[0])}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 aspect-[9/16] flex flex-col items-center justify-center p-6 text-center text-gray-400">
                  <Video className="w-10 h-10 mb-2 text-gray-300" />
                  <p className="text-xs font-semibold">Chưa có video</p>
                  <button
                    onClick={handleOpenEdit}
                    className="mt-2 text-xs font-bold text-brand-900 underline"
                  >
                    + Tải video lên
                  </button>
                </div>
              )}
            </div>

            {/* Box Hình Ảnh */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Hình Ảnh Thực Tế ({job.images?.length || 0})</span>
                </span>
                <button
                  onClick={handleOpenEdit}
                  className="text-xs font-bold text-brand-900 hover:underline"
                >
                  Quản lý ảnh
                </button>
              </div>

              {job.images && job.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {job.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 border border-gray-200"
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-gray-400">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-xs">Chưa có hình ảnh</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL CHỈNH SỬA VỊ TRÍ - TINH GỌN KHỚP 100% VỚI CLIENT */}
      {/* ========================================================================= */}
      {isModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-brand-900 to-[#701313] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-white">Chỉnh Sửa Vị Trí: {editingJob.title}</h3>
                  <p className="text-xs text-white/70">Cập nhật đúng nội dung xuất hiện trên trang tuyển dụng</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveJob} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Phần 1: Tiêu đề, Lương & Badges */}
              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/80 space-y-3">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <span>1. Tiêu Đề, Mức Lương & Thẻ Tag</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Tên Vị Trí *</label>
                    <input
                      type="text"
                      required
                      value={editingJob.title}
                      onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                      placeholder="VD: Học việc bếp"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Mức Lương Hiển Thị *</label>
                    <input
                      type="text"
                      required
                      value={editingJob.salaryDisplay}
                      onChange={(e) => setEditingJob({ ...editingJob, salaryDisplay: e.target.value })}
                      placeholder="VD: 7,5 - 10 triệu/tháng"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-brand-900 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Thẻ Badges (phân cách bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={badgesInput}
                    onChange={(e) => setBadgesInput(e.target.value)}
                    placeholder="VD: 18–30 tuổi, Chưa có tay nghề, Đào tạo từ số 0"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Các thẻ này xuất hiện phía trên tiêu đề công việc.</p>
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                    <input
                      type="checkbox"
                      checked={editingJob.isUrgent}
                      onChange={(e) => setEditingJob({ ...editingJob, isUrgent: e.target.checked })}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>🔥 Tuyển gấp</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                    <input
                      type="checkbox"
                      checked={editingJob.isActive}
                      onChange={(e) => setEditingJob({ ...editingJob, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Đang bật hiển thị trên Website</span>
                  </label>
                </div>
              </div>

              {/* Phần 2: Nội dung bài đăng (Intro + Bullet Points + Zalo) */}
              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <span>2. Nội Dung Bài Tuyển Dụng (Đoạn Văn & Các Điểm Nhấn)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="px-3 py-1 rounded-lg bg-brand-900 text-white font-bold text-xs flex items-center gap-1 hover:bg-brand-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Gạch Đầu Dòng</span>
                  </button>
                </div>

                {/* Intro */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Đoạn Văn Mở Đầu (Intro)</label>
                  <textarea
                    rows={3}
                    value={editingJob.concisePost?.intro || ""}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        concisePost: {
                          ...(editingJob.concisePost || { headline: "", points: [], zalo: "" }),
                          intro: e.target.value,
                        },
                      })
                    }
                    placeholder="VD: Bạn muốn học nghề bếp bài bản nhưng ngại đóng học phí? Đừng lo..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs leading-relaxed"
                  />
                </div>

                {/* Points List */}
                <div className="space-y-3">
                  <label className="font-bold text-gray-700 block">Các Gạch Đầu Dòng Chi Tiết:</label>
                  {editingJob.concisePost?.points?.map((pt, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {/* Icon selector */}
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-500">Icon:</span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {POPULAR_ICONS.slice(0, 6).map((icon) => (
                              <button
                                key={icon}
                                type="button"
                                onClick={() => handleUpdatePoint(idx, "icon", icon)}
                                className={`w-6 h-6 rounded-md text-sm flex items-center justify-center transition ${
                                  pt.icon === icon ? "bg-amber-100 ring-2 ring-brand-900" : "hover:bg-gray-100"
                                }`}
                              >
                                {icon}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemovePoint(idx)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                          title="Xóa dòng này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-1">
                          <input
                            type="text"
                            value={pt.label || ""}
                            onChange={(e) => handleUpdatePoint(idx, "label", e.target.value)}
                            placeholder="Tiêu đề (VD: Ca làm việc:)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 font-bold text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={pt.content}
                            onChange={(e) => handleUpdatePoint(idx, "content", e.target.value)}
                            placeholder="Nội dung (VD: 14h00 – 24h00 mỗi ngày)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zalo */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Số Zalo Liên Hệ Phỏng Vấn</label>
                  <input
                    type="text"
                    value={editingJob.concisePost?.zalo || editingJob.contactZalo || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingJob({
                        ...editingJob,
                        contactZalo: val,
                        concisePost: {
                          ...(editingJob.concisePost || { headline: "", intro: "", points: [] }),
                          zalo: val,
                        },
                      });
                    }}
                    placeholder="VD: 0981256712"
                    className="w-full sm:w-1/2 px-3 py-2 rounded-xl border border-gray-300 font-mono font-bold text-xs text-blue-600"
                  />
                </div>
              </div>

              {/* Phần 3: Media (Video & Hình Ảnh) */}
              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h4 className="font-bold text-gray-900 text-sm">3. Tư Liệu Thực Tế (Video & Hình Ảnh)</h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("images")}
                      className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                        activeMediaTab === "images" ? "bg-brand-900 text-white" : "bg-white text-gray-600 border"
                      }`}
                    >
                      Hình ảnh ({editingJob.images?.length || 0})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("video")}
                      className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                        activeMediaTab === "video" ? "bg-brand-900 text-white" : "bg-white text-gray-600 border"
                      }`}
                    >
                      Video
                    </button>
                  </div>
                </div>

                {activeMediaTab === "images" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {editingJob.images?.map((img, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-white">
                          <Image src={img} alt="" fill className="object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const newImgs = [...(editingJob.images || [])];
                              newImgs.splice(idx, 1);
                              setEditingJob({ ...editingJob, images: newImgs });
                            }}
                            className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600 text-white opacity-80 hover:opacity-100 shadow"
                            title="Xóa ảnh này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold shadow-sm">
                        <Upload className="w-3.5 h-3.5 text-blue-600" />
                        <span>Tải ảnh mới từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "image")}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {activeMediaTab === "video" && (
                  <div className="space-y-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Đường dẫn Video URL</label>
                      <input
                        type="text"
                        value={editingJob.videoUrl || ""}
                        onChange={(e) => setEditingJob({ ...editingJob, videoUrl: e.target.value })}
                        placeholder="https://...mp4"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-50">
                        <Upload className="w-3.5 h-3.5 text-red-600" />
                        <span>Tải video từ máy tính</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "video")}
                        />
                      </label>
                      {editingJob.videoUrl && (
                        <button
                          type="button"
                          onClick={() => setEditingJob({ ...editingJob, videoUrl: "" })}
                          className="text-red-500 hover:underline font-bold"
                        >
                          Xóa video
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-gray-700"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold shadow-md transition disabled:opacity-50"
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
