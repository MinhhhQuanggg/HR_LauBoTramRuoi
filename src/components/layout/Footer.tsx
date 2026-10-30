import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BRANCH_GROUPS } from "@/data/branches";
import { MapPin, Phone, ExternalLink, Flame } from "lucide-react";
import CurvedWaveDivider from "../common/CurvedWaveDivider";

export default function Footer() {
  const thuDucGroup = BRANCH_GROUPS.find((g) => g.region === "thu-duc-khu-dong");
  const goVapGroup = BRANCH_GROUPS.find((g) => g.region === "go-vap-phu-nhuan");
  const trungTamGroup = BRANCH_GROUPS.find((g) => g.region === "trung-tam");

  return (
    <footer id="he-thong-chi-nhanh" className="relative bg-brand-950 text-gray-300">
      {/* Curved wave transition at top of footer */}
      <CurvedWaveDivider
        fillColor="#1c0505"
        className="w-full bg-surface"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Cột 1: Thủ Đức & Khu Đông */}
          <div>
            <h4 className="text-white font-bold text-[16px] sm:text-[18px] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              {thuDucGroup?.title}
            </h4>
            <ul className="space-y-4 text-xs leading-relaxed">
              {thuDucGroup?.branches.map((b) => (
                <li key={b.id} className="space-y-1">
                  <div className="font-semibold text-[18px] sm:text-[20px] text-gray-100 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span>{b.name}</span>
                  </div>
                  <p className="text-[15px] sm:text-[16px] text-gray-400 pl-6">{b.address}</p>
                  {b.phone && (
                    <div className="flex items-center gap-1.5 pl-6 text-[15px] sm:text-[16px] text-amber-300">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${b.phone}`} className="hover:underline">
                        Hotline: {b.phone}
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: Gò Vấp & Phú Nhuận */}
          <div>
            <h4 className="text-white font-bold text-[16px] sm:text-[18px] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              {goVapGroup?.title}
            </h4>
            <ul className="space-y-4 text-xs leading-relaxed">
              {goVapGroup?.branches.map((b) => (
                <li key={b.id} className="space-y-1">
                  <div className="font-semibold text-[18px] sm:text-[20px] text-gray-100 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span>{b.name}</span>
                  </div>
                  <p className="text-[15px] sm:text-[16px] text-gray-400 pl-6">{b.address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Khu vực Trung Tâm (Quận 3, Quận 10 - CMT8) */}
          <div>
            <h4 className="text-white font-bold text-[16px] sm:text-[18px] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              {trungTamGroup?.title}
            </h4>
            <ul className="space-y-4 text-xs leading-relaxed mb-6">
              {trungTamGroup?.branches.map((b) => (
                <li key={b.id} className="space-y-1">
                  <div className="font-semibold text-[18px] sm:text-[20px] text-gray-100 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span>{b.name}</span>
                  </div>
                  <p className="text-[15px] sm:text-[16px] text-gray-400 pl-6">{b.address}</p>
                </li>
              ))}
            </ul>

            <a
              href={siteConfig.socials.canvaBranchMap}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-amber-300 text-sm sm:text-base font-semibold border border-brand-700/60 transition"
            >
              <span>Xem sơ đồ chi nhánh Canva</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Cột 4: Liên kết nhanh & Tuyển dụng */}
          <div>
            <h4 className="text-white font-bold text-[16px] sm:text-[18px] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Liên Kết Tuyển Dụng
            </h4>
            <ul className="space-y-2.5 text-[17px] sm:text-[18px] mb-6">
              <li>
                <Link
                  href="/viec-lam/hoc-viec-bep"
                  className="hover:text-amber-300 transition-colors"
                >
                  🔥 Học việc bếp (Bao ăn + Lương đủ)
                </Link>
              </li>
              <li>
                <Link
                  href="/viec-lam/phuc-vu-part-time"
                  className="hover:text-amber-300 transition-colors"
                >
                  ⚡ Phục vụ part-time (27k - 35k/giờ)
                </Link>
              </li>
              <li>
                <Link
                  href="/viec-lam/phuc-vu-full-time"
                  className="hover:text-amber-300 transition-colors"
                >
                  👉 Nhân viên sảnh Full-time (7 - 11 triệu)
                </Link>
              </li>
              <li>
                <Link
                  href="/viec-lam/quan-ly-tiem"
                  className="hover:text-amber-300 transition-colors"
                >
                  💼 Quản lý / Tổ trưởng tiệm lẩu
                </Link>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-brand-900/60 border border-brand-800 space-y-2">
              <p className="text-amber-300 font-bold text-[16px] sm:text-[18px]">Bộ phận Nhân Sự (HR):</p>
              <p className="text-gray-200 text-[17px] sm:text-[19px]">
                Mr. Nguyễn Trung Kiên:{" "}
                <a
                  href={`tel:${siteConfig.hrContact.phone}`}
                  className="text-white font-bold hover:underline"
                >
                  {siteConfig.hrContact.phone}
                </a>
              </p>
              <p className="text-gray-400 text-[14px] sm:text-[15px]">Hỗ trợ Zalo 24/7 cho ứng viên</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-brand-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] sm:text-[15px] text-gray-400">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-brand-950">
              <Flame className="w-5 h-5 fill-brand-950 text-brand-950" />
            </div>
            <span className="font-bold text-[18px] sm:text-[20px] text-white tracking-wide">
              {siteConfig.shortName}
            </span>
          </div>

          <p className="text-center">
            © {new Date().getFullYear()} {siteConfig.shortName} – {siteConfig.companyName}. Mọi quyền được bảo lưu.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.socials.facebookFanpage}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-brand-950 text-white flex items-center justify-center transition"
              aria-label="Facebook Fanpage"
            >
              f
            </a>
            <a
              href={siteConfig.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-brand-950 text-white flex items-center justify-center transition text-xs font-bold"
              aria-label="TikTok"
            >
              TT
            </a>
            <a
              href={siteConfig.socials.canvaBranchMap}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-brand-950 text-white flex items-center justify-center transition text-xs font-bold"
              aria-label="Bản đồ Canva"
            >
              📍
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
