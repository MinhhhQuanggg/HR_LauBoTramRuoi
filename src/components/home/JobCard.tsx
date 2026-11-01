import Link from "next/link";
import { JobItem } from "@/types/job";
import { DollarSign, Clock, Calendar, ArrowRight, Flame } from "lucide-react";

interface JobCardProps {
  job: JobItem;
  onApplyClick?: (job: JobItem) => void;
}

export default function JobCard({ job, onApplyClick }: JobCardProps) {
  return (
    <div className="relative group bg-white rounded-2xl p-6 sm:p-7 border border-red-200 sm:border-gray-100 shadow-md sm:shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Họa tiết chìm mờ góc phải dưới như ảnh 11.JPG */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 text-brand-900">
        <Flame className="w-full h-full fill-current" />
      </div>

      <div>
        {/* Pill Badges phân loại đưa lên trên tiêu đề thẻ, chia ra từng item riêng biệt */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {(job.badges && job.badges.length > 0
            ? job.badges
            : job.badge
            ? job.badge.split(",").map((s) => s.trim())
            : [job.category]
          ).map((item, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-0.5 rounded-full text-[11px] sm:text-[13px] font-semibold bg-brand-50 text-brand-800 border border-brand-100"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Tiêu đề vị trí: Tăng 2px lên 20px (mobile) / 22px (desktop) */}
        <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 group-hover:text-brand-800 transition-colors line-clamp-2 mb-4 leading-snug">
          <Link href={`/viec-lam/${job.slug}`}>{job.title}</Link>
        </h3>

        {/* Thông tin: Lương, Ca làm & Yêu cầu */}
        <div className="space-y-3 text-[18px] sm:text-[20px] text-gray-700 mb-6 leading-relaxed">
          {/* 💰 Lương */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 text-amber-700" />
            </div>
            <span className="font-semibold text-brand-900">
              <b>Lương:</b> {job.salaryDisplay}
            </span>
          </div>

          {/* ⏰ Ca làm */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-blue-700" />
            </div>
            <span className="truncate">
              <b>Ca làm:</b> {job.workHours || job.workTypeDisplay}
            </span>
          </div>

          {/* 📅 Độ tuổi / Yêu cầu */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-gray-700" />
            </div>
            <span className="truncate">
              <b>Yêu cầu:</b> {job.ageRequirement} | {job.experienceDisplay}
            </span>
          </div>
        </div>
      </div>

      {/* Footer của Thẻ: Nút Xem chi tiết & Ứng tuyển */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
        {onApplyClick && (
          <button
            onClick={() => onApplyClick(job)}
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-semibold bg-amber-400 hover:bg-amber-500 text-brand-950 transition"
          >
            Nộp nhanh
          </button>
        )}
        <Link
          href={`/viec-lam/${job.slug}`}
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-brand-800 group-hover:text-brand-900 hover:underline"
        >
          <span>Chi tiết</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
