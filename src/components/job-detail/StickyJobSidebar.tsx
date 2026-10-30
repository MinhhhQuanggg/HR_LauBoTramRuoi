"use client";

import { useState } from "react";
import { JobItem } from "@/types/job";
import { DollarSign, Clock, MapPin, UserCheck, ArrowRight, ShieldCheck } from "lucide-react";
import QuickApplyModal from "../common/QuickApplyModal";

interface StickyJobSidebarProps {
  job: JobItem;
}

export default function StickyJobSidebar({ job }: StickyJobSidebarProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-[124px] space-y-6">
        <div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 border-b border-gray-100 pb-3">
            Thông tin công việc
          </h3>

          <div className="mt-4 space-y-4">
            {/* Mức lương */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Mức lương</p>
                <p className="font-bold text-brand-900 text-[18px] sm:text-[20px]">{job.salaryDisplay}</p>
              </div>
            </div>

            {/* Hình thức làm việc */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-brand-800" />
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Hình thức làm việc</p>
                <p className="font-semibold text-gray-800 text-[16px] sm:text-[18px]">{job.workTypeDisplay}</p>
              </div>
            </div>

            {/* Địa điểm */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Địa điểm làm việc</p>
                <p className="font-semibold text-gray-800 text-[16px] sm:text-[18px]">
                  Hồ Chí Minh (Chọn chi nhánh gần nhà)
                </p>
              </div>
            </div>

            {/* Độ tuổi / Cấp bậc */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Độ tuổi / Yêu cầu</p>
                <p className="font-semibold text-gray-800 text-[16px] sm:text-[18px]">{job.ageRequirement}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nút bấm bo tròn kèm mũi tên: Ứng tuyển ngay → */}
        <div>
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-full bg-brand-800 hover:bg-brand-900 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ứng tuyển ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Phỏng vấn trực tiếp • Không mất phí</span>
          </div>
        </div>
      </div>

      <QuickApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        defaultPositionSlug={job.slug}
      />
    </>
  );
}
