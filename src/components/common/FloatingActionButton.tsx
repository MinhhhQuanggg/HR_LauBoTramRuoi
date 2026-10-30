"use client";

import { useEffect, useState } from "react";
import { ChevronUp, UserPlus } from "lucide-react";
import QuickApplyModal from "./QuickApplyModal";

export default function FloatingActionButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed right-4 md:right-8 bottom-8 z-40 flex flex-col items-center gap-3">
        {/* Nút Cuộn lên đầu trang */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            className="w-11 h-11 rounded-full bg-white text-gray-700 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-200"
          >
            <ChevronUp className="w-5 h-5 text-brand-800" />
          </button>
        )}

        {/* Nút tròn Join Us / Ứng tuyển nổi bám cạnh màn hình */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-brand-900 to-brand-700 text-white shadow-2xl shadow-brand-900/40 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Ứng tuyển nhanh"
        >
          {/* Vòng pulse hiệu ứng */}
          <span className="absolute -inset-1 rounded-full bg-brand-600/30 animate-ping pointer-events-none" />

          <div className="flex flex-col items-center justify-center">
            <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-amber-300" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-tight mt-0.5">
              Join Us
            </span>
          </div>

          {/* Tooltip gợi ý */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none hidden md:block">
            Ứng tuyển nhanh 30s ⚡
          </span>
        </button>
      </div>

      <QuickApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
