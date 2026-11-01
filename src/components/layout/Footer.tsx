import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ALL_BRANCHES } from "@/data/branches";
import { MapPin, Navigation } from "lucide-react";
import CurvedWaveDivider from "../common/CurvedWaveDivider";
import BranchMap from "./BranchMap";

export default function Footer() {
  // Chia 13 chi nhánh thành 3 cột cân đối: 5 - 4 - 4 theo đúng thứ tự
  const col1 = ALL_BRANCHES.slice(0, 5);
  const col2 = ALL_BRANCHES.slice(5, 9);
  const col3 = ALL_BRANCHES.slice(9, 13);

  const columns = [col1, col2, col3];

  return (
    <footer
      id="he-thong-chi-nhanh"
      className="relative bg-gradient-to-b from-[#7a1717] via-[#3a0808] to-[#120202] text-gray-300 min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Footer Gradient 3 cấp độ từ trên xuống: Nhẹ (#7a1717) -> Trung (#3a0808) -> Đậm (#120202) */}
      {/* Hiệu ứng ánh sáng lan tỏa nhẹ phía trên footer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

      {/* Đường vòm cong chuyển tiếp đầu Footer */}
      <CurvedWaveDivider
        fillColor="#7a1717"
        className="w-full bg-surface shrink-0 relative z-10"
        heightClassName="h-6 sm:h-8 md:h-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 flex-1 flex flex-col justify-between w-full relative z-10 space-y-6">
        {/* PHẦN TRÊN: DANH SÁCH ĐỊA CHỈ CHI NHÁNH CHIA THÀNH 3 CỘT */}
        <div className="pb-6 border-b border-brand-900/80">
          <div className="mb-6">
            <h3 className="text-white font-extrabold text-sm sm:text-base md:text-lg uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              Hệ Thống 13 Chi Nhánh Lẩu Bò Trăm Rưỡi
            </h3>
          </div>

          {/* GRID 3 CỘT ĐỊA CHỈ - THIẾT KẾ KHÔNG KHUNG THOÁNG ĐẸP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {columns.map((colBranches, colIdx) => (
              <div key={colIdx} className="space-y-1.5">
                {colBranches.map((b) => (
                  <a
                    key={b.id}
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      "Lẩu Bò Trăm Rưỡi " + b.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Mở chỉ đường Google Maps tới CN ${b.cnNumber} (${b.name})`}
                    className="group flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-white/[0.06] transition-all duration-150 text-left cursor-pointer"
                  >
                    {/* Badge CN + số thứ tự đồng bộ với ghim trên Google Maps */}
                    <span className="shrink-0 px-2 py-0.5 mt-0.5 rounded-md bg-amber-400 text-brand-950 font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
                      CN {b.cnNumber}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-[13px] leading-snug text-gray-200 group-hover:text-white transition-colors">
                        <strong className="text-amber-300 font-bold">{b.district}: </strong>
                        <span className="text-gray-100 group-hover:text-amber-100 transition-colors">{b.address}</span>
                      </p>
                    </div>

                    <Navigation className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* THANH THÔNG TIN LIÊN HỆ & MẠNG XÃ HỘI */}
        <div className="py-4 border-b border-brand-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-gray-300">
            <Link
              href="/ve-chung-toi"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <span>👉</span>
              <span className="font-medium">Về chúng tôi (Thông tin & Liên hệ)</span>
            </Link>
            <span className="text-brand-800 hidden sm:inline">•</span>
            <Link
              href="/chinh-sach-bao-mat"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <span>🔒</span>
              <span className="font-medium">Chính sách bảo mật</span>
            </Link>
            <span className="text-brand-800 hidden sm:inline">•</span>
            <Link
              href="/dieu-khoan-su-dung"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <span>📜</span>
              <span className="font-medium">Điều khoản sử dụng</span>
            </Link>
          </div>

          {/* Mạng xã hội */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 uppercase font-semibold">Mạng xã hội:</span>
            <a
              href={siteConfig.socials.facebookFanpage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-brand-950 text-white text-xs font-semibold transition"
            >
              Facebook
            </a>
            <a
              href={siteConfig.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-brand-950 text-white text-xs font-semibold transition"
            >
              TikTok
            </a>
            <a
              href={siteConfig.socials.recruitmentPage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-brand-950 text-white text-xs font-semibold transition"
            >
              Tuyển Dụng
            </a>
          </div>
        </div>

        {/* PHẦN DƯỚI: BẢN ĐỒ TP.HCM GHIM TỪNG ĐỊA CHỈ CHI NHÁNH */}
        <div className="pt-2 pb-2">
          <BranchMap />
        </div>

        {/* BẢN QUYỀN */}
        <div className="pt-2 pb-1 text-center text-[12px] text-gray-400/80">
          Tuyển Dụng Lẩu Bò Trăm Rưỡi
        </div>
      </div>
    </footer>
  );
}
