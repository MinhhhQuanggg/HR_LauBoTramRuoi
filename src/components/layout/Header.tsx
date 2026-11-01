"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";
import QuickApplyModal from "../common/QuickApplyModal";

export default function Header() {
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const menuItems = [
    {
      title: "Học nghề có lương",
      line1: "Học nghề",
      line2: "có lương",
      hasDropdown: true,
      subItems: [
        { title: "Học việc bếp", href: "/viec-lam/hoc-viec-bep" },
        { title: "Phụ bếp", href: "/viec-lam/phu-bep-hoc-nghe" },
        { title: "Học việc tổ trưởng", href: "/viec-lam/hoc-viec-to-truong" },
      ],
    },
    {
      title: "Part-time, Thời vụ",
      line1: "Part-time,",
      line2: "Thời vụ",
      hasDropdown: false,
      href: "/viec-lam/phuc-vu-part-time",
    },
    {
      title: "Full-time",
      line1: "Full-time",
      isSingleLine: true,
      hasDropdown: true,
      subItems: [
        { title: "Phục vụ", href: "/viec-lam/phuc-vu-full-time" },
        { title: "Phụ bếp", href: "/viec-lam/phu-bep-full-time" },
        { title: "Thu ngân", href: "/viec-lam/thu-ngan" },
        { title: "Pha chế", href: "/viec-lam/pha-che-full-time" },
      ],
    },
    {
      title: "Trưởng, Quản lý",
      line1: "Trưởng,",
      line2: "Quản lý",
      hasDropdown: true,
      subItems: [
        { title: "Quản lý vùng", href: "/viec-lam/quan-ly-vung" },
        { title: "Quản lý tiệm", href: "/viec-lam/quan-ly-tiem" },
        { title: "Phó quản lý tiệm", href: "/viec-lam/pho-quan-ly-tiem" },
        { title: "Bếp trưởng", href: "/viec-lam/bep-truong" },
        { title: "Tổ trưởng", href: "/viec-lam/to-truong" },
      ],
    },
    {
      title: "Hệ thống Chi nhánh",
      line1: "Hệ thống",
      line2: "Chi nhánh",
      hasDropdown: false,
      href: "#he-thong-chi-nhanh",
    },
  ];

  const menuRow1 = menuItems.slice(0, 3);
  const menuRow2 = menuItems.slice(3, 5);
  const activeDropdownItem = menuItems.find((it) => it.title === activeMobileDropdown);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActiveMobileDropdown(null);
      }
    }
  };

  return (
    <>
      {/* Menu Gradient 3 cấp độ: Nhẹ (#a82323) -> Trung (#6B1414) -> Đậm (#2a0505) */}
      <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#a82323] via-[#6B1414] to-[#2a0505] backdrop-blur-md text-white border-b border-amber-500/25 shadow-xl shadow-black/20 transition-all relative">
        {/* Đường viền ánh vàng kim sang trọng ở viền trên của Menu */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 opacity-90" />
        {/* Ánh sáng ấm nhẹ lan tỏa ở viền dưới của Menu */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20 sm:h-[100px] lg:h-[130px]">
            {/* Logo & Brand Left */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-[54px] h-[54px] sm:w-[68px] sm:h-[68px] shrink-0 drop-shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Lẩu Bò Trăm Rưỡi"
                  width={68}
                  height={68}
                  priority
                  className="w-[54px] h-[54px] sm:w-[68px] sm:h-[68px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[12px] sm:text-[15px] font-bold text-amber-300 tracking-wider uppercase leading-none">
                  TUYỂN DỤNG
                </span>
                <span className="font-extrabold text-[18px] sm:text-[24px] tracking-tight leading-none text-white group-hover:text-amber-300 transition-colors mt-1 whitespace-nowrap">
                  LẨU BÒ TRĂM RƯỠI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Center */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {menuItems.map((item, idx) => (
                <div key={idx} className="relative group">
                  {item.hasDropdown ? (
                    <button className="px-3 xl:px-3.5 py-2 rounded-xl text-[20px] font-medium text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all text-center">
                      {item.isSingleLine ? (
                        <span className="whitespace-nowrap">{item.line1}</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center leading-tight">
                          <span className="whitespace-nowrap">{item.line1}</span>
                          <span className="whitespace-nowrap">{item.line2}</span>
                        </div>
                      )}
                      <ChevronDown className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-180 shrink-0" />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={(e) => handleSmoothScroll(e, item.href || "#")}
                      className="px-3 xl:px-3.5 py-2 rounded-xl text-[20px] font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all flex flex-col items-center justify-center leading-tight text-center"
                    >
                      <span className="whitespace-nowrap">{item.line1}</span>
                      <span className="whitespace-nowrap">{item.line2}</span>
                    </Link>
                  )}

                  {/* Dropdown Menu Desktop */}
                  {item.hasDropdown && item.subItems && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden text-gray-800">
                        {item.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className="block px-4 py-3 text-[16px] sm:text-[17px] font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button Right (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="relative inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-2xl font-bold uppercase bg-gradient-to-r from-amber-500 to-amber-400 text-brand-950 hover:from-amber-400 hover:to-amber-300 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-brand-950 text-brand-950 shrink-0" />
                <div className="flex flex-col items-center leading-tight text-center">
                  <span className="text-[12px] sm:text-[13px] font-bold tracking-wide whitespace-nowrap">ỨNG TUYỂN</span>
                  <span className="text-[11px] sm:text-[12px] font-extrabold tracking-widest whitespace-nowrap">NHANH</span>
                </div>
              </button>
            </div>

            {/* Mobile Top Right: Nút Ứng tuyển trực tiếp (Đã đưa menu ra ngoài nên không cần nút hamburger) */}
            <div className="flex sm:hidden items-center">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-3.5 py-2 rounded-full text-xs font-bold bg-amber-400 text-brand-950 shadow-md active:scale-95 transition"
              >
                Ứng tuyển
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation 2 DÒNG NGANG HÀNG PHẲNG KHÔNG KHUNG (+25% chiều cao đệm) */}
        <div className="lg:hidden border-t border-white/10 px-2 py-2.5 min-[390px]:py-3 flex flex-col gap-2 min-[390px]:gap-2.5 relative z-20">
          {/* Dòng 1: 3 mục đầu */}
          <div className="flex items-center justify-around sm:justify-center sm:gap-6">
            {menuRow1.map((item, idx) => (
              <div key={idx} className="relative shrink-0">
                {item.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMobileDropdown(
                        activeMobileDropdown === item.title ? null : item.title
                      )
                    }
                    className={`py-1.5 px-1 flex items-center justify-center gap-1 text-[12px] min-[390px]:text-[13px] sm:text-[14px] whitespace-nowrap transition-colors ${
                      activeMobileDropdown === item.title
                        ? "text-amber-300 font-bold"
                        : "text-white/90 hover:text-white font-medium active:text-amber-300"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        activeMobileDropdown === item.title
                          ? "rotate-180 text-amber-300"
                          : "text-amber-300/80"
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href || "#");
                      setActiveMobileDropdown(null);
                    }}
                    className="py-1.5 px-1 flex items-center justify-center text-[12px] min-[390px]:text-[13px] sm:text-[14px] whitespace-nowrap font-medium text-white/90 hover:text-white active:text-amber-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Dòng 2: 2 mục còn lại */}
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {menuRow2.map((item, idx) => (
              <div key={idx + 3} className="relative shrink-0">
                {item.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMobileDropdown(
                        activeMobileDropdown === item.title ? null : item.title
                      )
                    }
                    className={`py-1.5 px-1 flex items-center justify-center gap-1 text-[12px] min-[390px]:text-[13px] sm:text-[14px] whitespace-nowrap transition-colors ${
                      activeMobileDropdown === item.title
                        ? "text-amber-300 font-bold"
                        : "text-white/90 hover:text-white font-medium active:text-amber-300"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        activeMobileDropdown === item.title
                          ? "rotate-180 text-amber-300"
                          : "text-amber-300/80"
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href || "#");
                      setActiveMobileDropdown(null);
                    }}
                    className="py-1.5 px-1 flex items-center justify-center text-[12px] min-[390px]:text-[13px] sm:text-[14px] whitespace-nowrap font-medium text-white/90 hover:text-white active:text-amber-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Floating Dropdown Sub-menu khi người dùng bấm vào các mục có menu con */}
          {activeDropdownItem && activeDropdownItem.subItems && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                onClick={() => setActiveMobileDropdown(null)}
              />
              <div className="absolute left-2 right-2 top-full mt-1 z-50 bg-white rounded-2xl shadow-2xl border border-amber-300/40 p-2 overflow-hidden text-gray-800">
                <div className="px-3 py-1.5 mb-1 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-amber-800 uppercase tracking-wider">
                    {activeDropdownItem.title}
                  </span>
                  <button
                    onClick={() => setActiveMobileDropdown(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-0.5">
                  {activeDropdownItem.subItems.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      onClick={() => setActiveMobileDropdown(null)}
                      className="block px-3.5 py-2.5 rounded-xl text-[15px] font-semibold text-gray-800 hover:bg-brand-50 hover:text-brand-800 active:bg-amber-100/60 transition-colors"
                    >
                      • {sub.title}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <QuickApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </>
  );
}
