"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Video,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Play,
  Upload,
  X,
  RefreshCw,
  Sparkles,
  Eye,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";
import { LifeVideo } from "@/types/life-video";

const PRESET_VIDEO_THUMBNAILS = [
  "/images/tiktok/tiktok-1.jpg",
  "/images/tiktok/tiktok-2.jpg",
  "/images/tiktok/tiktok-3.jpg",
  "/images/jobs/all_img_1.jpg",
  "/images/jobs/all_img_2.jpg",
  "/images/jobs/all_img_3.jpg",
  "/images/jobs/all_img_4.jpg",
  "/images/jobs/all_img_6.jpg",
  "/images/jobs/all_img_7.jpg",
];

const SUGGESTED_TAGS = [
  "Món mới • Lẩu 2 ngăn",
  "Khai trương chi nhánh",
  "Sự kiện & Không khí",
  "Gian bếp & Đồng đội",
  "Đào tạo nghề bếp",
  "Phục vụ chu đáo",
  "Văn hóa Trăm Rưởi",
];

const PLATFORMS = ["TikTok", "Facebook Reels", "YouTube", "Instagram"];

export default function LifeVideosTab() {
  const [videos, setVideos] = useState<LifeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Partial<LifeVideo> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/life-videos");
      const data = await res.json();
      if (data.success && data.videos) {
        setVideos(data.videos);
      }
    } catch (err) {
      console.error("Failed to load videos:", err);
      showToast("Không thể tải danh sách video", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenCreate = () => {
    const nextOrder = videos.length > 0 ? Math.max(...videos.map((v) => v.displayOrder ?? 0)) + 1 : 1;
    setEditingVideo({
      id: `VID-${Date.now().toString(36).toUpperCase()}`,
      title: "",
      author: "@tiemlaubotramruoi",
      platform: "TikTok",
      thumbnail: "/images/tiktok/tiktok-1.jpg",
      tag: "Đời sống Trăm Rưởi",
      url: "",
      displayOrder: nextOrder,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (video: LifeVideo) => {
    setEditingVideo({ ...video });
    setIsModalOpen(true);
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.url || !editingVideo.thumbnail) {
      showToast("Vui lòng điền tiêu đề, link video và ảnh thumbnail", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const isUpdating = videos.some((v) => v.id === editingVideo.id);
      const url = isUpdating ? `/api/admin/life-videos/${editingVideo.id}` : "/api/admin/life-videos";
      const method = isUpdating ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVideo),
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          isUpdating
            ? `Đã cập nhật video "${editingVideo.title}" thành công!`
            : `Đã thêm video mới "${editingVideo.title}" thành công!`,
          "success"
        );
        setIsModalOpen(false);
        fetchVideos();
      } else {
        showToast(data.error || "Không thể lưu video", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Lỗi lưu dữ liệu", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVideo = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa video "${title}" khỏi danh sách?`)) return;

    try {
      const res = await fetch(`/api/admin/life-videos/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã xóa video "${title}" thành công!`, "success");
        fetchVideos();
      } else {
        showToast(data.error || "Không thể xóa video", "error");
      }
    } catch {
      showToast("Lỗi khi xóa video", "error");
    }
  };

  const handleToggleActive = async (video: LifeVideo) => {
    const newStatus = !video.isActive;
    try {
      const res = await fetch(`/api/admin/life-videos/${video.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) =>
          prev.map((v) => (v.id === video.id ? { ...v, isActive: newStatus } : v))
        );
        showToast(
          newStatus
            ? `Đã bật hiển thị video "${video.title}"`
            : `Đã tạm ẩn video "${video.title}"`,
          "success"
        );
      }
    } catch {
      showToast("Lỗi đổi trạng thái video", "error");
    }
  };

  const handleUploadThumbnail = async (file: File) => {
    setIsUploadingThumb(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setEditingVideo((prev) => (prev ? { ...prev, thumbnail: data.url } : prev));
        showToast("Đã tải ảnh thumbnail thành công!", "success");
      } else {
        showToast(data.error || "Tải ảnh thất bại", "error");
      }
    } catch {
      showToast("Lỗi khi tải ảnh", "error");
    } finally {
      setIsUploadingThumb(false);
    }
  };

  const filteredVideos = videos.filter((video) => {
    const q = searchQuery.toLowerCase();
    return (
      video.title.toLowerCase().includes(q) ||
      video.tag.toLowerCase().includes(q) ||
      video.author.toLowerCase().includes(q) ||
      video.platform.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
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

      {/* Banner Giới Thiệu Chuyên Mục */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-brand-950 to-brand-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-amber-900/40">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-3xl shadow-inner">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-white">
                Quản Lý Video "Đời Sống Tại Lẩu Bò Trăm Rưởi"
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 uppercase tracking-wider">
                Mạng Xã Hội
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Các video TikTok, Reels và Shorts được thêm ở đây sẽ xuất hiện trực tiếp tại khối
              <strong> "Kênh Truyền Thông & Đời Sống"</strong> ngoài trang chủ. Giúp ứng viên cảm nhận môi trường làm việc sống động!
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-brand-950 font-black text-xs sm:text-sm shadow-lg transition active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Thêm Video Mới</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{videos.length}</div>
            <div className="text-xs font-semibold text-gray-500">Tổng Video Đời Sống</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">
              {videos.filter((v) => v.isActive).length}
            </div>
            <div className="text-xs font-semibold text-gray-500">Đang Hiển Thị Ngoài Web</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-900 flex items-center justify-center font-bold">
            <span className="text-lg">🎵</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">
              {videos.filter((v) => v.platform === "TikTok").length}
            </div>
            <div className="text-xs font-semibold text-gray-500">Video TikTok</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">
              {videos.filter((v) => v.platform !== "TikTok").length}
            </div>
            <div className="text-xs font-semibold text-gray-500">Reels / Shorts khác</div>
          </div>
        </div>
      </div>

      {/* Action Bar: Search & View Toggle */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm video theo tiêu đề, tag, tác giả..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
                title="Xem dạng thẻ (Grid)"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Thẻ video</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
                title="Xem dạng bảng (Table)"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Bảng chi tiết</span>
              </button>
            </div>

            <button
              onClick={fetchVideos}
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
              <span>Thêm Video Mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Videos Content */}
      {isLoading ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-800 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-500">Đang tải danh sách video đời sống...</p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm py-16 text-center">
          <p className="text-gray-500 text-sm">Chưa có video nào hoặc không tìm thấy kết quả phù hợp.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-bold hover:bg-brand-900"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm video đầu tiên</span>
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW: Thẻ Video Mô Phỏng Trực Tiếp */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`bg-white rounded-3xl border shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${
                video.isActive ? "border-gray-200" : "border-gray-200 opacity-60 bg-gray-50/70"
              }`}
            >
              {/* Thẻ xem trước tỷ lệ 9:14 */}
              <div className="relative aspect-[9/13] w-full bg-brand-950 overflow-hidden group">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                {/* Badges top */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {video.tag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-amber-300 bg-black/60 backdrop-blur-md border border-white/10">
                    {video.platform}
                  </span>
                </div>

                {/* Play Button preview */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-300 z-10"
                  title="Nhấn để mở xem video gốc"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </a>

                {/* Order badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-gray-200">
                    Thứ tự: #{video.displayOrder ?? 0}
                  </span>
                </div>

                {/* Active switch */}
                <button
                  type="button"
                  onClick={() => handleToggleActive(video)}
                  className={`absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md transition flex items-center gap-1 ${
                    video.isActive
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-800 text-gray-300 border border-white/20"
                  }`}
                  title="Bấm để bật/tắt hiển thị"
                >
                  <span className={`w-2 h-2 rounded-full ${video.isActive ? "bg-white" : "bg-gray-400"}`} />
                  <span>{video.isActive ? "Đang hiện" : "Tạm ẩn"}</span>
                </button>
              </div>

              {/* Thông tin mô tả bên dưới */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-950 text-sm line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mt-1">
                    {video.author}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-brand-800 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Mở link gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(video)}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-brand-800 hover:bg-gray-100 transition"
                      title="Chỉnh sửa video"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id, video.title)}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
                      title="Xóa video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Video & Thumbnail</th>
                  <th className="py-4 px-4">Chủ Đề (Tag)</th>
                  <th className="py-4 px-4">Nền Tảng</th>
                  <th className="py-4 px-4">Tác Giả</th>
                  <th className="py-4 px-4 text-center">Thứ Tự</th>
                  <th className="py-4 px-4 text-center">Trạng Thái</th>
                  <th className="py-4 px-6 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-brand-950 shrink-0 border border-gray-200">
                          <Image
                            src={video.thumbnail}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-md">
                          <div className="font-bold text-gray-900 line-clamp-1">{video.title}</div>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline line-clamp-1 inline-flex items-center gap-1 mt-0.5"
                          >
                            <span>{video.url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                        {video.tag}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        {video.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-gray-600">
                      {video.author}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-gray-700">
                      #{video.displayOrder ?? 0}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(video)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                          video.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            video.isActive ? "bg-emerald-600" : "bg-gray-400"
                          }`}
                        />
                        <span>{video.isActive ? "Hiển thị" : "Tạm ẩn"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(video)}
                          className="p-2 rounded-xl text-gray-600 hover:text-brand-800 hover:bg-gray-100 transition"
                          title="Chỉnh sửa"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id, video.title)}
                          className="p-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL THÊM / CHỈNH SỬA VIDEO */}
      {isModalOpen && editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto space-y-6">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    {videos.some((v) => v.id === editingVideo.id)
                      ? "Chỉnh Sửa Video Đời Sống"
                      : "Thêm Video Đời Sống Mới"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Video xuất hiện tại mục "Kênh Truyền Thông & Đời Sống" Lẩu Bò Trăm Rưởi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveVideo} className="space-y-5">
              {/* Tiêu đề */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tiêu Đề Video <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  placeholder="Ví dụ: Chính thức ra mắt lẩu bò 2 ngăn nóng hổi tại Lẩu Bò Trăm Rưởi"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                />
              </div>

              {/* Nền tảng & Tác giả */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Nền Tảng
                  </label>
                  <select
                    value={editingVideo.platform || "TikTok"}
                    onChange={(e) => setEditingVideo({ ...editingVideo, platform: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none bg-white"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Tác Giả / Kênh
                  </label>
                  <input
                    type="text"
                    value={editingVideo.author || "@tiemlaubotramruoi"}
                    onChange={(e) => setEditingVideo({ ...editingVideo, author: e.target.value })}
                    placeholder="@tiemlaubotramruoi"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>
              </div>

              {/* Tag / Chủ đề */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Chủ Đề (Tag hiển thị góc video)
                  </label>
                  <span className="text-[11px] text-gray-400">Chọn gợi ý bên dưới hoặc tự nhập</span>
                </div>
                <input
                  type="text"
                  value={editingVideo.tag || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, tag: e.target.value })}
                  placeholder="Ví dụ: Món mới • Lẩu 2 ngăn"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SUGGESTED_TAGS.map((stag) => (
                    <button
                      key={stag}
                      type="button"
                      onClick={() => setEditingVideo({ ...editingVideo, tag: stag })}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-600 transition border border-gray-200"
                    >
                      + {stag}
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Video */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Đường Dẫn Video (Link TikTok / Reels / YouTube) <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={editingVideo.url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, url: e.target.value })}
                  placeholder="https://www.tiktok.com/@tiemlaubotramruoi/video/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none font-mono"
                />
              </div>

              {/* Thumbnail Ảnh Xem Trước */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Ảnh Thumbnail Video <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-500">Tỷ lệ đẹp nhất 9:16 hoặc 9:14</span>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Xem trước */}
                  <div className="relative w-24 h-36 rounded-xl overflow-hidden bg-gray-900 border-2 border-brand-800 shadow-md shrink-0">
                    {editingVideo.thumbnail ? (
                      <Image
                        src={editingVideo.thumbnail}
                        alt="Thumbnail"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        Chưa có ảnh
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    {/* Input dán URL */}
                    <input
                      type="text"
                      value={editingVideo.thumbnail || ""}
                      onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                      placeholder="Dán link ảnh (/images/tiktok/tiktok-1.jpg hoặc https://...)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-brand-700 outline-none bg-white"
                    />

                    {/* Nút Upload trực tiếp */}
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploadingThumb ? "Đang tải ảnh lên..." : "Tải ảnh từ máy tính"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploadingThumb}
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleUploadThumbnail(e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>

                    {/* Presets chọn nhanh */}
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 mb-1.5">
                        Hoặc chọn nhanh từ ảnh có sẵn:
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {PRESET_VIDEO_THUMBNAILS.map((presetImg, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setEditingVideo({ ...editingVideo, thumbnail: presetImg })}
                            className={`relative w-10 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                              editingVideo.thumbnail === presetImg
                                ? "border-brand-800 ring-2 ring-brand-800"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <Image src={presetImg} alt="" fill unoptimized className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thứ tự & Trạng thái */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Thứ Tự Hiển Thị (Số nhỏ đứng trước)
                  </label>
                  <input
                    type="number"
                    value={editingVideo.displayOrder ?? 0}
                    onChange={(e) =>
                      setEditingVideo({ ...editingVideo, displayOrder: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingVideo.isActive ?? true}
                      onChange={(e) => setEditingVideo({ ...editingVideo, isActive: e.target.checked })}
                      className="w-5 h-5 rounded text-brand-800 focus:ring-brand-700 rounded-md"
                    />
                    <div>
                      <span className="font-bold text-gray-900 text-sm">Hiển thị ra trang chủ</span>
                      <p className="text-xs text-gray-500">Bỏ tích nếu muốn tạm ẩn video này</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 transition"
                >
                  Hủy Bỏ
                </button>

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
                  <span>Lưu Video Đời Sống</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
