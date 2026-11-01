"use client";

import { useState, useEffect } from "react";
import {
  Building,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  RefreshCw,
  X,
  Navigation,
} from "lucide-react";
import { Branch, RegionType } from "@/types/branch";

const REGION_OPTIONS: { value: RegionType; label: string }[] = [
  { value: "thu-duc-khu-dong", label: "Thủ Đức & Khu Đông" },
  { value: "go-vap-phu-nhuan", label: "Gò Vấp & Phú Nhuận" },
  { value: "trung-tam", label: "Trung Tâm & Khu Vực Khác" },
];

export default function BranchesTab() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Partial<Branch> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/branches");
      const data = await res.json();
      if (data.success && data.branches) {
        setBranches(data.branches);
      }
    } catch (err) {
      console.error("Failed to load branches:", err);
      showToast("Không thể tải danh sách chi nhánh", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleOpenCreate = () => {
    const nextCn = branches.length > 0 ? Math.max(...branches.map((b) => b.cnNumber || 0)) + 1 : 1;
    setEditingBranch({
      id: `cn-${nextCn.toString().padStart(2, "0")}`,
      cnNumber: nextCn,
      name: `Chi nhánh ${nextCn}`,
      address: "",
      district: "Gò Vấp",
      city: "Hồ Chí Minh",
      phone: "0981256712",
      region: "go-vap-phu-nhuan",
      mapUrl: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (branch: Branch) => {
    setEditingBranch({ ...branch });
    setIsModalOpen(true);
  };

  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch || !editingBranch.name || !editingBranch.address || !editingBranch.district) {
      showToast("Vui lòng điền tên, địa chỉ và quận của chi nhánh", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const isUpdating = branches.some((b) => b.id === editingBranch.id);
      const url = isUpdating ? `/api/admin/branches/${editingBranch.id}` : "/api/admin/branches";
      const method = isUpdating ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBranch),
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          isUpdating
            ? `Đã cập nhật chi nhánh "${editingBranch.name}" thành công!`
            : `Đã thêm chi nhánh mới "${editingBranch.name}" thành công!`,
          "success"
        );
        setIsModalOpen(false);
        fetchBranches();
      } else {
        showToast(data.error || "Không thể lưu chi nhánh", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Lỗi lưu dữ liệu", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBranch = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa chi nhánh "${name}"? Thao tác này sẽ cập nhật bản đồ và hệ thống tìm kiếm việc làm.`)) return;

    try {
      const res = await fetch(`/api/admin/branches/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã xóa chi nhánh "${name}" thành công!`, "success");
        fetchBranches();
      } else {
        showToast(data.error || "Không thể xóa chi nhánh", "error");
      }
    } catch {
      showToast("Lỗi khi xóa chi nhánh", "error");
    }
  };

  const handleToggleActive = async (branch: Branch) => {
    const newStatus = !branch.isActive;
    try {
      const res = await fetch(`/api/admin/branches/${branch.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBranches((prev) =>
          prev.map((b) => (b.id === branch.id ? { ...b, isActive: newStatus } : b))
        );
        showToast(
          newStatus
            ? `Đã kích hoạt hoạt động chi nhánh "${branch.name}"`
            : `Đã tạm ngưng hiển thị chi nhánh "${branch.name}"`,
          "success"
        );
      }
    } catch {
      showToast("Lỗi cập nhật trạng thái chi nhánh", "error");
    }
  };

  const filteredBranches = branches.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.district.toLowerCase().includes(q) ||
      (b.phone && b.phone.includes(q)) ||
      `cn ${b.cnNumber}`.includes(q);

    const matchesRegion = selectedRegion === "ALL" || b.region === selectedRegion;
    return matchesSearch && matchesRegion;
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

      {/* Banner Giới Thiệu Chuyên Mục Địa Chỉ */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-950 via-brand-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-amber-900/40">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-3xl shadow-inner">
            📍
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-white">
                Quản Lý Danh Sách Địa Chỉ & Chi Nhánh Tiệm
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 uppercase tracking-wider">
                Hệ Thống Tiệm
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Các địa chỉ chi nhánh tại đây sẽ xuất hiện tự động trên <strong>Bản đồ chi nhánh</strong>, <strong>Chân trang (Footer)</strong> và danh sách lựa chọn trong <strong>Form ứng tuyển nhanh</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-brand-950 font-black text-xs sm:text-sm shadow-lg transition active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Thêm Chi Nhánh Mới</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{branches.length}</div>
            <div className="text-xs font-semibold text-gray-500">Tổng Số Chi Nhánh</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">
              {branches.filter((b) => b.isActive !== false).length}
            </div>
            <div className="text-xs font-semibold text-gray-500">Đang Hoạt Động</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">
              {branches.filter((b) => b.region === "go-vap-phu-nhuan").length}
            </div>
            <div className="text-xs font-semibold text-gray-500">Gò Vấp & Phú Nhuận</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">
              {branches.filter((b) => b.region === "thu-duc-khu-dong").length}
            </div>
            <div className="text-xs font-semibold text-gray-500">Thủ Đức & Khu Đông</div>
          </div>
        </div>
      </div>

      {/* Action Bar & Region Filter */}
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
              placeholder="Tìm kiếm theo địa chỉ, tên đường, quận, số chi nhánh..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={fetchBranches}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              title="Tải lại danh sách chi nhánh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Chi Nhánh Mới</span>
            </button>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedRegion("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedRegion === "ALL"
                ? "bg-brand-800 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tất cả khu vực ({branches.length})
          </button>
          {REGION_OPTIONS.map((reg) => (
            <button
              key={reg.value}
              onClick={() => setSelectedRegion(reg.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedRegion === reg.value
                  ? "bg-brand-800 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {reg.label} ({branches.filter((b) => b.region === reg.value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Branches Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-brand-800 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-gray-500">Đang tải danh sách địa chỉ chi nhánh...</p>
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 text-sm">Không tìm thấy chi nhánh nào phù hợp.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-bold hover:bg-brand-900"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm chi nhánh mới</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Số CN & Tên</th>
                  <th className="py-4 px-6">Địa Chỉ Thực Tế</th>
                  <th className="py-4 px-4">Quận / Tỉnh</th>
                  <th className="py-4 px-4">Hotline</th>
                  <th className="py-4 px-4 text-center">Trạng Thái</th>
                  <th className="py-4 px-6 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 border border-amber-300/80 flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                            CN {branch.cnNumber}
                          </span>
                          <div>
                            <div className="font-bold text-gray-950 text-sm">{branch.name}</div>
                            <span className="text-[11px] text-gray-400 font-mono">ID: {branch.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-md">
                        <div className="flex items-start gap-1.5 text-gray-800 font-medium text-xs sm:text-sm">
                          <MapPin className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                          <span>{branch.address}</span>
                        </div>
                        {branch.mapUrl && (
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline font-semibold"
                          >
                            <span>Xem Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200">
                          {branch.district}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-gray-700 whitespace-nowrap">
                        {branch.phone || "0981256712"}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(branch)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                            branch.isActive !== false
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              branch.isActive !== false ? "bg-emerald-600" : "bg-gray-400"
                            }`}
                          />
                          <span>{branch.isActive !== false ? "Mở cửa" : "Tạm ẩn"}</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(branch)}
                            className="p-2 rounded-xl text-gray-600 hover:text-brand-800 hover:bg-gray-100 transition"
                            title="Chỉnh sửa chi nhánh"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBranch(branch.id, branch.name)}
                            className="p-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
                            title="Xóa chi nhánh"
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
        )}
      </div>

      {/* MODAL THÊM / SỬA CHI NHÁNH */}
      {isModalOpen && editingBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto space-y-6">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5 text-brand-800" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    {branches.some((b) => b.id === editingBranch.id)
                      ? `Chỉnh Sửa Chi Nhánh CN ${editingBranch.cnNumber}`
                      : "Thêm Chi Nhánh Mới"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Cập nhật vị trí và địa chỉ tiệm trong chuỗi Lẩu Bò Trăm Rưởi
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
            <form onSubmit={handleSaveBranch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Số CN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingBranch.cnNumber ?? 1}
                    onChange={(e) =>
                      setEditingBranch({ ...editingBranch, cnNumber: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Tên Tiệm / Chi Nhánh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBranch.name || ""}
                    onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                    placeholder="Ví dụ: 828 Sư Vạn Hạnh"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Địa Chỉ Đầy Đủ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingBranch.address || ""}
                  onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                  placeholder="Ví dụ: 828 Sư Vạn Hạnh, Phường 12 (Hòa Hưng)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Quận / Huyện <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBranch.district || ""}
                    onChange={(e) => setEditingBranch({ ...editingBranch, district: e.target.value })}
                    placeholder="Ví dụ: Quận 10, Gò Vấp, Thủ Đức..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Khu Vực Tuyển Dụng
                  </label>
                  <select
                    value={editingBranch.region || "trung-tam"}
                    onChange={(e) =>
                      setEditingBranch({ ...editingBranch, region: e.target.value as RegionType })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none bg-white"
                  >
                    {REGION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Số Điện Thoại Hotline
                  </label>
                  <input
                    type="text"
                    value={editingBranch.phone || "0981256712"}
                    onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                    placeholder="0981256712"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Tỉnh / Thành Phố
                  </label>
                  <input
                    type="text"
                    value={editingBranch.city || "Hồ Chí Minh"}
                    onChange={(e) => setEditingBranch({ ...editingBranch, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-brand-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Đường Dẫn Bản Đồ (Google Maps URL)
                </label>
                <input
                  type="text"
                  value={editingBranch.mapUrl || ""}
                  onChange={(e) => setEditingBranch({ ...editingBranch, mapUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-brand-700 outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingBranch.isActive !== false}
                    onChange={(e) => setEditingBranch({ ...editingBranch, isActive: e.target.checked })}
                    className="w-5 h-5 rounded text-brand-800 focus:ring-brand-700 rounded-md"
                  />
                  <div>
                    <span className="font-bold text-gray-900 text-sm">Chi nhánh đang hoạt động</span>
                    <p className="text-xs text-gray-500">Hiển thị trong bản đồ và form nộp hồ sơ</p>
                  </div>
                </label>
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
                  <span>Lưu Chi Nhánh</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
