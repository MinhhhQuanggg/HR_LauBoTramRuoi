"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Video,
  ImageIcon,
  Upload,
  X,
  Users,
  Eye,
  Building,
  RefreshCw,
  Sparkles,
  PhoneCall,
  FileText,
  MapPin,
} from "lucide-react";
import { JobItem, JobCategory, EmploymentType } from "@/types/job";
import LifeVideosTab from "@/components/admin/LifeVideosTab";
import BranchesTab from "@/components/admin/BranchesTab";
import QuickApplyConfigTab from "@/components/admin/QuickApplyConfigTab";

const CATEGORIES: JobCategory[] = [
  "Học nghề có lương",
  "Part-time, Thời vụ",
  "Full-time",
  "Trưởng, Quản lý",
];

const PRESET_GALLERY = [
  "/images/jobs/all_img_1.jpg",
  "/images/jobs/all_img_2.jpg",
  "/images/jobs/all_img_3.jpg",
  "/images/jobs/all_img_4.jpg",
  "/images/jobs/all_img_6.jpg",
  "/images/jobs/all_img_7.jpg",
  "/images/jobs/1.jpg",
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState("tuyendung.admin@gmail.com");

  // Jobs state
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobItem> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"jobs" | "life_videos" | "branches" | "quick_apply">("jobs");

  // Check auth
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  // Load jobs
  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      if (data.success && data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Create Form
  const handleOpenCreate = () => {
    const newId = `JOB-${Date.now().toString(36).toUpperCase()}`;
    setEditingJob({
      id: newId,
      slug: "",
      title: "",
      category: "Học nghề có lương",
      salaryDisplay: "7,5 - 10 triệu/tháng",
      minSalary: 7500000,
      maxSalary: 10000000,
      salaryUnit: "MONTH",
      ageRequirement: "18 – 30 tuổi",
      badges: ["18–30 tuổi", "Đào tạo từ số 0"],
      workType: "FULL_TIME",
      workTypeDisplay: "Toàn thời gian (Ca 14h00 – 24h00)",
      workHours: "14h00 – 24h00 mỗi ngày",
      experienceDisplay: "Không yêu cầu (Đào tạo từ số 0)",
      locations: ["Gò Vấp", "Thủ Đức", "Quận 10", "Quận 3"],
      contactZalo: "0981256712",
      isUrgent: true,
      isActive: true,
      images: [
        "/images/jobs/all_img_1.jpg",
        "/images/jobs/all_img_2.jpg",
        "/images/jobs/all_img_3.jpg",
        "/images/jobs/all_img_4.jpg",
      ],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      videoPoster: "/images/jobs/all_img_1.jpg",
      concisePost: {
        headline: "🔥 TUYỂN DỤNG HỌC VIỆC BẾP - BAO ĂN Ở, CÓ LƯƠNG ĐỦ 🔥",
        intro: "Học nghề bếp bài bản từ A-Z, không lo học phí, thu nhập ổn áp mỗi tháng tại Tiệm Lẩu Bò Trăm Rưỡi!",
        points: [
          { icon: "🔹", label: "Khởi đầu nhẹ nhàng:", content: "Làm quen gian bếp, sơ chế rau nấm và chuẩn bị topping." },
          { icon: "🔹", label: "Chưa có kinh nghiệm?", content: "Được các anh bếp chính kèm cặp 1:1." },
          { icon: "🌙", label: "Ca làm việc:", content: "14h00 – 24h00 mỗi ngày" },
          { icon: "👤", label: "Độ tuổi:", content: "18 – 30 tuổi" },
          { icon: "✨", label: "Khởi điểm:", content: "7,5 củ – 10 củ / tháng" },
        ],
        zalo: "0981256712",
      },
      responsibilities: [
        "Sơ chế rau nấm, thịt bò tươi và chuẩn bị quầy nguyên liệu.",
        "Xếp đĩa và hỗ trợ ra món theo quy chuẩn định lượng của chuỗi.",
        "Giữ gìn vệ sinh sạch sẽ khu vực gian bếp theo tiêu chuẩn an toàn thực phẩm.",
      ],
      requirements: [
        "Độ tuổi từ 18 – 30 tuổi, chăm chỉ, thật thà, có tinh thần cầu tiến.",
        "Không yêu cầu tay nghề trước đó, sẽ được đào tạo bài bản từ số 0.",
      ],
      benefits: [
        "Lương 7,5 - 10 triệu/tháng, đánh giá tăng lương nhanh sau tuần đầu.",
        "Bao ăn ca, cấp đồng phục miễn phí, môi trường trẻ trung thân thiện.",
      ],
    });
    setIsModalOpen(true);
  };

  // Open Edit Form
  const handleOpenEdit = (job: JobItem) => {
    // Ensure images array has 4 items
    const images = job.images && job.images.length > 0
      ? [...job.images]
      : [
          "/images/jobs/all_img_1.jpg",
          "/images/jobs/all_img_2.jpg",
          "/images/jobs/all_img_3.jpg",
          "/images/jobs/all_img_4.jpg",
        ];

    setEditingJob({
      ...job,
      images,
      videoUrl: job.videoUrl || "",
      videoPoster: job.videoPoster || (images.length > 0 ? images[0] : ""),
    });
    setIsModalOpen(true);
  };

  // Save Job
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.title) return;

    setIsSubmitting(true);
    try {
      const isUpdating = jobs.some((j) => j.id === editingJob.id);
      const url = isUpdating ? `/api/admin/jobs/${editingJob.id}` : "/api/admin/jobs";
      const method = isUpdating ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          isUpdating
            ? `Đã cập nhật bài đăng "${editingJob.title}" thành công!`
            : `Đã tạo mới bài đăng "${editingJob.title}" thành công!`,
          "success"
        );
        setIsModalOpen(false);
        fetchJobs();
      } else {
        showToast(data.error || "Không thể lưu dữ liệu", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Lỗi lưu dữ liệu", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Job
  const handleDeleteJob = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa vị trí việc làm "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã xóa "${title}" thành công!`, "success");
        fetchJobs();
      } else {
        showToast(data.error || "Không thể xóa bài đăng", "error");
      }
    } catch {
      showToast("Lỗi khi xóa bài đăng", "error");
    }
  };

  // Toggle Active
  const handleToggleActive = async (job: JobItem) => {
    const updated = { ...job, isActive: !job.isActive };
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          `Đã ${updated.isActive ? "bật" : "tắt"} hiển thị việc làm "${job.title}"`,
          "success"
        );
        fetchJobs();
      }
    } catch {
      showToast("Lỗi cập nhật trạng thái", "error");
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (file: File, targetIndex?: number, isVideo: boolean = false) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (isVideo) {
          setEditingJob((prev) =>
            prev
              ? {
                  ...prev,
                  videoUrl: data.url,
                  videoPoster: prev.videoPoster || (prev.images && prev.images[0]) || "/images/jobs/all_img_1.jpg",
                }
              : prev
          );
          showToast("Đã tải video bài đăng thành công!", "success");
        } else if (targetIndex !== undefined) {
          setEditingJob((prev) => {
            if (!prev) return prev;
            const images = [...(prev.images || [])];
            images[targetIndex] = data.url;
            return { ...prev, images };
          });
          showToast(`Đã thay đổi ảnh ${targetIndex + 1} thành công!`, "success");
        } else {
          setEditingJob((prev) => {
            if (!prev) return prev;
            const images = [...(prev.images || []), data.url];
            return { ...prev, images };
          });
          showToast("Đã thêm ảnh mới vào bài đăng thành công!", "success");
        }
      } else {
        showToast(data.error || "Tải file thất bại", "error");
      }
    } catch {
      showToast("Lỗi khi tải file", "error");
    }
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.locations && job.locations.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory =
      selectedCategory === "ALL" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-800 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-600">Đang xác thực quyền Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
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

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-brand-200 bg-brand-50 flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-gray-950 text-base sm:text-lg tracking-tight">
                  LẨU BÒ TRĂM RƯỠI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  CMS ADMIN
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Hệ thống quản trị việc làm & ứng viên</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              <span>Xem Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 text-xs text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold">{adminEmail}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              activeTab === "jobs"
                ? "bg-brand-800 text-white shadow-md shadow-brand-900/20"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Vị Trí Tuyển Dụng</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === "jobs" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("life_videos")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              activeTab === "life_videos"
                ? "bg-brand-800 text-white shadow-md shadow-brand-900/20"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Đời Sống Trăm Rưởi</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                activeTab === "life_videos"
                  ? "bg-amber-400 text-brand-950 font-extrabold"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              Mới
            </span>
          </button>

          <button
            onClick={() => setActiveTab("branches")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              activeTab === "branches"
                ? "bg-brand-800 text-white shadow-md shadow-brand-900/20"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Địa Chỉ Chi Nhánh</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                activeTab === "branches"
                  ? "bg-amber-400 text-brand-950 font-extrabold"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Hệ thống
            </span>
          </button>

          <button
            onClick={() => setActiveTab("quick_apply")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              activeTab === "quick_apply"
                ? "bg-brand-800 text-white shadow-md shadow-brand-900/20"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Form Ứng Tuyển Nhanh</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                activeTab === "quick_apply"
                  ? "bg-amber-400 text-brand-950 font-extrabold"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Cấu hình
            </span>
          </button>
        </div>

        {activeTab === "life_videos" && <LifeVideosTab />}
        {activeTab === "branches" && <BranchesTab />}
        {activeTab === "quick_apply" && <QuickApplyConfigTab />}

        {activeTab === "jobs" && (

          <>
            {/* Banner Quick Action For "Học Việc Bếp" */}
            {jobs.find((j) => j.id === "HV-BEP-01" || j.slug === "hoc-viec-bep") && (

          <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-amber-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-2xl">
                🔥
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black tracking-tight text-white">
                    Bài đăng mục tiêu: Học Việc Bếp (HV-BEP-01)
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950">
                    VIP POST
                  </span>
                </div>
                <p className="text-xs text-amber-100 mt-0.5">
                  Đã cấu hình sẵn: Lương 7,5 - 10 triệu/tháng, Độ tuổi 18 – 30 tuổi, 4 hình ảnh & 1 video chuẩn vision.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  const job = jobs.find((j) => j.id === "HV-BEP-01" || j.slug === "hoc-viec-bep");
                  if (job) handleOpenEdit(job);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh Sửa "Học Việc Bếp" Ngay</span>
              </button>
              <Link
                href="/viec-lam/hoc-viec-bep"
                target="_blank"
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem Live</span>
              </Link>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{jobs.length}</div>
              <div className="text-xs font-semibold text-gray-500">Tổng Vị Trí Việc Làm</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">
                {jobs.filter((j) => j.isActive).length}
              </div>
              <div className="text-xs font-semibold text-gray-500">Đang Bật Tuyển Dụng</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">
                {jobs.filter((j) => j.isUrgent).length}
              </div>
              <div className="text-xs font-semibold text-gray-500">Vị Trí Tuyển Gấp 🔥</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">12 Tiệm</div>
              <div className="text-xs font-semibold text-gray-500">Chi Nhánh Áp Dụng</div>
            </div>
          </div>
        </div>

        {/* Action Bar & Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200 shadow-sm mb-6 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm vị trí (ví dụ: Học việc bếp, Phục vụ, Thu ngân, Gò Vấp...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={fetchJobs}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                title="Tải lại danh sách"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenCreate}
                className="px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng Tuyển Vị Trí Mới</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === "ALL"
                  ? "bg-brand-800 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tất cả ({jobs.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-brand-800 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat} ({jobs.filter((j) => j.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {isLoadingJobs ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-brand-800 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-gray-500">Đang tải danh sách bài đăng...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-sm">Không tìm thấy bài đăng nào phù hợp với tìm kiếm.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Vị Trí Tuyển Dụng</th>
                    <th className="py-3.5 px-4">Danh Mục & Ca Làm</th>
                    <th className="py-3.5 px-4">Mức Lương</th>
                    <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                    <th className="py-3.5 px-6 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredJobs.map((job) => {
                    const isTargetJob = job.id === "HV-BEP-01" || job.slug === "hoc-viec-bep";
                    return (
                      <tr
                        key={job.id}
                        className={`hover:bg-amber-50/30 transition ${
                          isTargetJob ? "bg-amber-50/50 font-medium" : ""
                        }`}
                      >
                        {/* Title & Slug & Link to Detail */}
                        <td className="py-3.5 px-6">
                          <div className="flex items-start gap-2.5">
                            {isTargetJob && (
                              <span className="text-lg select-none" title="Vị trí trọng điểm">
                                🔥
                              </span>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/admin/jobs/${job.id}`}
                                  className="font-bold text-gray-950 text-sm hover:text-brand-900 transition flex items-center gap-1.5 group"
                                  title="Bấm để xem trang chi tiết vị trí"
                                >
                                  <span className="group-hover:underline">{job.title}</span>
                                </Link>
                                {job.isUrgent && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-200 shrink-0">
                                    Tuyển gấp
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-gray-400 font-mono mt-0.5 flex items-center gap-2">
                                <span>ID: <strong className="text-gray-600 font-semibold">{job.id}</strong></span>
                                <span>•</span>
                                <span>/viec-lam/{job.slug}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category & Shift */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-800">
                              {job.category}
                            </span>
                            <div className="text-[11px] text-gray-500 font-medium truncate max-w-[180px]">
                              {job.workHours || job.workTypeDisplay || "Toàn thời gian"}
                            </div>
                          </div>
                        </td>

                        {/* Salary */}
                        <td className="py-3.5 px-4 font-bold text-brand-900 whitespace-nowrap text-sm">
                          💰 {job.salaryDisplay}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleActive(job)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                              job.isActive
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                            title="Bấm để bật / tắt hiển thị vị trí"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${job.isActive ? "bg-emerald-600 animate-pulse" : "bg-gray-400"}`} />
                            <span>{job.isActive ? "Đang bật" : "Đã ẩn"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            {/* Chi tiết vị trí */}
                            <Link
                              href={`/admin/jobs/${job.id}`}
                              className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-brand-50 hover:text-brand-900 text-gray-700 text-xs font-bold transition flex items-center gap-1"
                              title="Xem trang chi tiết vị trí"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Chi tiết</span>
                            </Link>

                            {/* Chỉnh sửa nhanh */}
                            <button
                              onClick={() => handleOpenEdit(job)}
                              className="p-1.5 rounded-xl text-amber-700 hover:bg-amber-100 transition"
                              title="Chỉnh sửa nhanh bài đăng"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Xem trang ngoài */}
                            <Link
                              href={`/viec-lam/${job.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-xl text-gray-500 hover:text-brand-900 hover:bg-gray-100 transition"
                              title="Xem trang ngoài website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            {/* Xóa */}
                            <button
                              onClick={() => handleDeleteJob(job.id, job.title)}
                              className="p-1.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                              title="Xóa bài đăng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
      )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL EDIT / CREATE JOB */}
      {/* ========================================================================= */}
      {isModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-brand-900 to-[#701313] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">
                    {jobs.some((j) => j.id === editingJob.id)
                      ? `Chỉnh Sửa Vị Trí: ${editingJob.title}`
                      : "Tạo Bài Tuyển Dụng Mới"}
                  </h3>
                  <p className="text-xs text-amber-200">
                    ID: {editingJob.id} • Slug: {editingJob.slug || "(Tự động tạo)"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveJob} className="p-6 overflow-y-auto space-y-8 flex-1">
              {/* SECTION 1: THÔNG TIN CƠ BẢN (KHỚP 1:1 VỚI CLIENT) */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <span>📌 1. Tiêu Đề, Mức Lương & Thẻ Tag (Badges)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Tiêu đề công việc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editingJob.title || ""}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[đĐ]/g, "d")
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "");
                        setEditingJob({
                          ...editingJob,
                          title,
                          slug: editingJob.slug && editingJob.id !== "HV-BEP-01" ? editingJob.slug : slug,
                        });
                      }}
                      placeholder="Ví dụ: Học việc bếp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:ring-2 focus:ring-brand-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mức lương hiển thị <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editingJob.salaryDisplay || ""}
                      onChange={(e) => setEditingJob({ ...editingJob, salaryDisplay: e.target.value })}
                      placeholder="Ví dụ: 7,5 - 10 triệu/tháng hoặc 22.000 - 35.000 đ/h"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-black text-brand-900 focus:ring-2 focus:ring-brand-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Thẻ Badges trên đầu tiêu đề (cách nhau dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={
                        editingJob.badges && editingJob.badges.length > 0
                          ? editingJob.badges.join(", ")
                          : editingJob.badge || "18–30 tuổi, Chưa có tay nghề"
                      }
                      onChange={(e) => {
                        const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        setEditingJob({
                          ...editingJob,
                          badges: arr,
                          badge: arr.join(", "),
                        });
                      }}
                      placeholder="Ví dụ: 18–30 tuổi, Chưa có tay nghề"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Hotline / Zalo liên hệ</label>
                    <input
                      type="text"
                      value={editingJob.contactZalo || editingJob.concisePost?.zalo || "0981256712"}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingJob({
                          ...editingJob,
                          contactZalo: val,
                          concisePost: editingJob.concisePost
                            ? { ...editingJob.concisePost, zalo: val }
                            : undefined,
                        });
                      }}
                      placeholder="0981256712"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-blue-600 focus:ring-2 focus:ring-brand-700 outline-none"
                    />
                  </div>
                </div>

                {/* Urgent & Active Toggles */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingJob.isActive ?? true}
                      onChange={(e) => setEditingJob({ ...editingJob, isActive: e.target.checked })}
                      className="w-4 h-4 text-brand-700 rounded focus:ring-brand-700"
                    />
                    <span className="text-xs font-bold text-gray-800">Hiển thị bài đăng trên website</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingJob.isUrgent ?? false}
                      onChange={(e) => setEditingJob({ ...editingJob, isUrgent: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-xs font-bold text-red-700">Đánh dấu tuyển gấp (Urgent 🔥)</span>
                  </label>
                </div>
              </div>

              {/* SECTION 3: NỘI DUNG BÀI ĐĂNG (CONCISE POST) */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <span>📝 3. Nội Dung Bài Đăng (Headline, Intro & Điểm Nhấn)</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tiêu đề giật tít (Headline)</label>
                  <input
                    type="text"
                    value={editingJob.concisePost?.headline || ""}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        concisePost: {
                          ...editingJob.concisePost,
                          headline: e.target.value,
                          intro: editingJob.concisePost?.intro || "",
                          points: editingJob.concisePost?.points || [],
                          zalo: editingJob.concisePost?.zalo || "0981256712",
                        },
                      })
                    }
                    placeholder="🔥 HỌC VIỆC KHÔNG LO MẤT PHÍ – LẠI CÒN ĐƯỢC NHẬN LƯƠNG ĐỦ! 🔥"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-red-900 focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Đoạn giới thiệu mở đầu (Intro)</label>
                  <textarea
                    rows={3}
                    value={editingJob.concisePost?.intro || ""}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        concisePost: {
                          ...editingJob.concisePost,
                          headline: editingJob.concisePost?.headline || "",
                          intro: e.target.value,
                          points: editingJob.concisePost?.points || [],
                          zalo: editingJob.concisePost?.zalo || "0981256712",
                        },
                      })
                    }
                    placeholder="Bạn muốn học nghề bếp bài bản nhưng ngại đóng học phí?..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>

                {/* Points List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700">Các gạch đầu dòng điểm nhấn (Points)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const points = [...(editingJob.concisePost?.points || [])];
                        points.push({ icon: "🔹", label: "Điểm nhấn mới:", content: "" });
                        setEditingJob({
                          ...editingJob,
                          concisePost: {
                            ...editingJob.concisePost,
                            headline: editingJob.concisePost?.headline || "",
                            intro: editingJob.concisePost?.intro || "",
                            points,
                            zalo: editingJob.concisePost?.zalo || "0981256712",
                          },
                        });
                      }}
                      className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm dòng
                    </button>
                  </div>

                  {editingJob.concisePost?.points?.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                      <input
                        type="text"
                        value={pt.icon}
                        onChange={(e) => {
                          const points = [...(editingJob.concisePost?.points || [])];
                          points[idx].icon = e.target.value;
                          setEditingJob({
                            ...editingJob,
                            concisePost: { ...editingJob.concisePost!, points },
                          });
                        }}
                        className="w-10 text-center py-1.5 rounded-lg border border-gray-300 text-base"
                        title="Emoji Icon"
                      />
                      <input
                        type="text"
                        value={pt.label || ""}
                        onChange={(e) => {
                          const points = [...(editingJob.concisePost?.points || [])];
                          points[idx].label = e.target.value;
                          setEditingJob({
                            ...editingJob,
                            concisePost: { ...editingJob.concisePost!, points },
                          });
                        }}
                        placeholder="Nhãn (ví dụ: Độ tuổi:)"
                        className="w-1/3 px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={pt.content}
                        onChange={(e) => {
                          const points = [...(editingJob.concisePost?.points || [])];
                          points[idx].content = e.target.value;
                          setEditingJob({
                            ...editingJob,
                            concisePost: { ...editingJob.concisePost!, points },
                          });
                        }}
                        placeholder="Nội dung chi tiết..."
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const points = editingJob.concisePost!.points.filter((_, i) => i !== idx);
                          setEditingJob({
                            ...editingJob,
                            concisePost: { ...editingJob.concisePost!, points },
                          });
                        }}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: HÌNH ẢNH & VIDEO TRANG CHI TIẾT */}
              <div className="space-y-6 bg-amber-50/50 p-5 rounded-2xl border border-amber-200/80">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-amber-950 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-800" />
                      <span>📸 4. Quản Lý Media: Hình Ảnh & Video Trang Chi Tiết</span>
                    </h4>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Thêm, xóa, sửa ảnh thực tế và video hiển thị trực tiếp ở trang chi tiết công việc.
                    </p>
                  </div>
                </div>

                {/* 1 Video Section */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-black uppercase text-gray-800 flex items-center gap-2">
                      <Video className="w-4 h-4 text-red-600" />
                      <span>Video Vị Trí Việc Làm (MP4 / WebM / Link)</span>
                    </label>

                    <div className="flex items-center gap-2">
                      {editingJob.videoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Bạn có chắc muốn xóa video khỏi bài đăng này?")) {
                              setEditingJob({ ...editingJob, videoUrl: "", videoPoster: "" });
                              showToast("Đã xóa video khỏi bài đăng!", "success");
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition flex items-center gap-1 border border-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa video</span>
                        </button>
                      )}

                      <label className="cursor-pointer text-xs font-bold text-brand-800 hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải file video lên</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], undefined, true);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingJob.videoUrl || ""}
                        onChange={(e) => setEditingJob({ ...editingJob, videoUrl: e.target.value })}
                        placeholder="Link file video (ví dụ: /uploads/video.mp4 hoặc https://...)"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-brand-700 outline-none"
                      />
                      <input
                        type="text"
                        value={editingJob.videoPoster || ""}
                        onChange={(e) => setEditingJob({ ...editingJob, videoPoster: e.target.value })}
                        placeholder="URL ảnh bìa video (Poster) - Để trống sẽ dùng ảnh đầu tiên"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-brand-700 outline-none"
                      />
                    </div>

                    {/* Live Video Preview */}
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-inner flex items-center justify-center">
                      {editingJob.videoUrl ? (
                        <video
                          controls
                          playsInline
                          poster={editingJob.videoPoster}
                          className="w-full h-full object-cover"
                          key={editingJob.videoUrl}
                        >
                          <source src={editingJob.videoUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <span className="text-xs text-gray-400">Không có video (chỉ hiển thị hình ảnh)</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Danh Sách Hình Ảnh Thực Tế Tiệm */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-black uppercase text-gray-800 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      <span>Hình Ảnh Thực Tế Vị Trí ({(editingJob.images || []).length} ảnh)</span>
                    </label>

                    <div className="flex items-center gap-2">
                      {/* Nút upload thêm ảnh từ máy tính */}
                      <label className="cursor-pointer text-xs font-bold text-white bg-brand-800 hover:bg-brand-900 px-3 py-1.5 rounded-xl shadow-sm transition flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh mới từ máy tính</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], undefined, false);
                            }
                          }}
                        />
                      </label>

                      {/* Nút thêm ô ảnh để nhập URL / chọn mẫu */}
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingJob.images || [];
                          const nextPreset = PRESET_GALLERY[current.length % PRESET_GALLERY.length] || "/images/jobs/all_img_1.jpg";
                          setEditingJob({
                            ...editingJob,
                            images: [...current, nextPreset],
                          });
                          showToast("Đã thêm 1 ô ảnh mới!", "success");
                        }}
                        className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm ảnh từ thư viện</span>
                      </button>
                    </div>
                  </div>

                  {(!editingJob.images || editingJob.images.length === 0) ? (
                    <div className="p-8 bg-white rounded-2xl border border-dashed border-gray-300 text-center space-y-2">
                      <p className="text-xs text-gray-500">Chưa có hình ảnh nào cho bài đăng này.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingJob({
                            ...editingJob,
                            images: PRESET_GALLERY.slice(0, 4),
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200"
                      >
                        + Tự động thêm 4 ảnh mẫu mặc định
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {editingJob.images.map((currentImg, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm space-y-2.5 relative group">
                          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                            <span>Ảnh {idx + 1}</span>

                            <div className="flex items-center gap-1">
                              {/* Nút xóa ảnh */}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editingJob.images!.filter((_, i) => i !== idx);
                                  setEditingJob({ ...editingJob, images: updated });
                                  showToast(`Đã xóa ảnh ${idx + 1}!`, "success");
                                }}
                                className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                                title="Xóa ảnh này khỏi bài đăng"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Nút đổi ảnh */}
                              <label className="cursor-pointer text-brand-800 hover:text-brand-900 font-bold flex items-center gap-0.5 p-1 rounded-md hover:bg-brand-50" title="Tải ảnh khác đè lên">
                                <Upload className="w-3 h-3" />
                                <span className="text-[11px]">Đổi</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleFileUpload(e.target.files[0], idx, false);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          {/* Preview box */}
                          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
                            {currentImg ? (
                              <Image
                                src={currentImg}
                                alt={`Ảnh ${idx + 1}`}
                                fill
                                unoptimized={currentImg.startsWith("http") || currentImg.startsWith("data:")}
                                className="object-cover group-hover:scale-105 transition duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                Chưa có ảnh
                              </div>
                            )}
                          </div>

                          {/* Image URL input */}
                          <input
                            type="text"
                            value={currentImg}
                            onChange={(e) => {
                              const images = [...(editingJob.images || [])];
                              images[idx] = e.target.value;
                              setEditingJob({ ...editingJob, images });
                            }}
                            placeholder="/images/jobs/... hoặc https://"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-[11px] font-mono focus:ring-1 focus:ring-brand-700 outline-none"
                          />

                          {/* Quick preset selector */}
                          <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
                            {PRESET_GALLERY.slice(0, 5).map((pImg, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => {
                                  const images = [...(editingJob.images || [])];
                                  images[idx] = pImg;
                                  setEditingJob({ ...editingJob, images });
                                }}
                                className="w-6 h-6 rounded-md overflow-hidden border border-gray-300 shrink-0 hover:border-brand-700"
                                title={`Dùng ảnh mẫu ${pIdx + 1}`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={pImg} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>


              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 transition"
                >
                  Hủy Bỏ
                </button>

                <div className="flex items-center gap-3">
                  {editingJob.slug && (
                    <Link
                      href={`/viec-lam/${editingJob.slug}`}
                      target="_blank"
                      className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 font-bold text-xs hover:bg-gray-200 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem Trước</span>
                    </Link>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-red-950 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>Lưu Bài Tuyển Dụng</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
