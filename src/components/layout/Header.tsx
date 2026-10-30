"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ChevronDown, Menu, X, Sparkles, Flame } from "lucide-react";
import QuickApplyModal from "../common/QuickApplyModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const menuItems = [
    {
      title: "Học nghề có lương",
      hasDropdown: true,
      subItems: [
        { title: "Học việc bếp, Phụ bếp (7,5 - 10 triệu)", href: "/viec-lam/hoc-viec-bep" },
        { title: "Học việc Tổ trưởng (8 - 11 triệu)", href: "/viec-lam/hoc-viec-to-truong" },
      ],
    },
    {
      title: "Part-time, Thời vụ",
      hasDropdown: true,
      subItems: [
        { title: "Phục vụ part-time (27k - 35k/h)", href: "/viec-lam/phuc-vu-part-time" },
      ],
    },
    {
      title: "Full-time",
      hasDropdown: true,
      subItems: [
        { title: "Phục vụ full-time (7 - 11 triệu)", href: "/viec-lam/phuc-vu-full-time" },
        { title: "Thu ngân tiệm lẩu (7,5 - 9,5 triệu)", href: "/viec-lam/thu-ngan" },
      ],
    },
    {
      title: "Trưởng, Quản lý",
      hasDropdown: true,
      subItems: [
        { title: "Quản lý / Phó quản lý tiệm (12 - 20 triệu + KPI)", href: "/viec-lam/quan-ly-tiem" },
      ],
    },
    {
      title: "Hệ thống Chi nhánh",
      hasDropdown: false,
      href: "#he-thong-chi-nhanh",
    },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-900/95 backdrop-blur-md text-white border-b border-brand-800 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-[104px]">
            {/* Logo & Brand Left */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-brand-950 shadow-md group-hover:scale-105 transition-transform">
                <Flame className="w-7 h-7 fill-brand-950 text-brand-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[20px] sm:text-[22px] tracking-tight leading-none text-white group-hover:text-amber-300 transition-colors">
                  LẨU BÒ TRĂM RƯỠI
                </span>
                <span className="text-[13px] sm:text-[14px] font-medium text-amber-300/90 tracking-wider uppercase mt-1">
                  Tuyển Dụng • Lẩu Bò Triều Châu
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Center */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {menuItems.map((item, idx) => (
                <div key={idx} className="relative group">
                  {item.hasDropdown ? (
                    <button className="px-3.5 py-2 rounded-xl text-[17px] xl:text-[18px] font-medium text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all">
                      <span>{item.title}</span>
                      <ChevronDown className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={(e) => handleSmoothScroll(e, item.href || "#")}
                      className="px-3.5 py-2 rounded-xl text-[17px] xl:text-[18px] font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
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

            {/* CTA Button Right */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm sm:text-base font-bold uppercase tracking-wide bg-gradient-to-r from-amber-500 to-amber-400 text-brand-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-brand-950 text-brand-950" />
                <span>Ứng Tuyển Nhanh</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-400 text-brand-950"
              >
                Ứng tuyển
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-white hover:bg-white/10 transition"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-950 border-t border-brand-800 px-4 pt-3 pb-6 space-y-3">
            {menuItems.map((item, idx) => (
              <div key={idx} className="border-b border-brand-900/60 pb-2">
                <span className="block text-[16px] sm:text-[18px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                  {item.title}
                </span>
                {item.hasDropdown && item.subItems ? (
                  <div className="space-y-1.5 pl-2">
                    {item.subItems.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-[18px] sm:text-[20px] text-gray-200 hover:text-white"
                      >
                        • {sub.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={(e) => handleSmoothScroll(e, item.href || "#")}
                    className="block py-1.5 text-[18px] sm:text-[20px] text-gray-200 hover:text-white pl-2"
                  >
                    Xem danh sách chi nhánh
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      <QuickApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </>
  );
}
