import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOBS_DATA, getJobBySlug, getRelatedJobs } from "@/data/jobs";
import { siteConfig } from "@/config/site";
import { generateJobPostingSchema } from "@/lib/schema";
import StickyJobSidebar from "@/components/job-detail/StickyJobSidebar";
import RelatedJobs from "@/components/job-detail/RelatedJobs";
import CurvedWaveDivider from "@/components/common/CurvedWaveDivider";
import {
  ChevronRight,
  Flame,
  CheckCircle,
  Briefcase,
  Gift,
  MapPin,
  MessageCircle,
} from "lucide-react";

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return JOBS_DATA.map((job) => ({
    slug: job.slug,
  }));
}

export function generateMetadata({ params }: JobDetailPageProps): Metadata {
  const job = getJobBySlug(params.slug);
  if (!job) {
    return {
      title: "Không tìm thấy công việc | Tuyển Dụng Lẩu Bò Trăm Rưỡi",
    };
  }

  const title = `${job.title} (${job.salaryDisplay}) | Tuyển Dụng Lẩu Bò Trăm Rưỡi`;
  const description = `Tuyển dụng ${job.title} tại TP.HCM. Mức lương: ${job.salaryDisplay}. Đào tạo nghề F&B miễn phí có lương, phỏng vấn đi làm ngay tại hệ thống Lẩu Bò Trăm Rưỡi.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/viec-lam/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/viec-lam/${job.slug}`,
      siteName: siteConfig.name,
      type: "article",
    },
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getJobBySlug(params.slug);
  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedJobs(job.slug, 3);
  const jsonLd = generateJobPostingSchema(job);

  return (
    <>
      {/* Schema JobPosting phục vụ Google Jobs chuẩn 100% */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner với Breadcrumb & Tiêu đề theo ảnh 33.JPG */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-amber-200/80 mb-4">
            <Link href="/" className="hover:text-white transition">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#danh-sach-viec-lam" className="hover:text-white transition">
              Cơ hội cho bạn
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Chi tiết tuyển dụng</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Chi tiết tuyển dụng
          </h1>
        </div>
      </section>

      <CurvedWaveDivider fillColor="#F8F9FA" className="w-full bg-brand-800" />

      {/* Layout 2 cột bất đối xứng (70% - 30%) theo mẫu 33.JPG */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT TRÁI (70% - Hộp trắng lớn chứa nội dung JD) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
              {/* Badge & Tên vị trí: Tiêu đề tăng 2px lên 26px / 32px */}
              <div className="border-b border-gray-100 pb-6 mb-8">
                <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-brand-50 text-brand-800 border border-brand-100 mb-3">
                  {job.category}
                </span>
                <h2 className="text-[26px] sm:text-[32px] font-black text-gray-900 leading-tight">
                  {job.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-[18px] sm:text-[20px] text-gray-600">
                  <span className="flex items-center gap-1.5 font-bold text-brand-900">
                    💰 {job.salaryDisplay}
                  </span>
                  <span>•</span>
                  <span>📍 {job.locations.join(", ")}</span>
                  <span>•</span>
                  <span>📅 Cập nhật: {job.datePosted}</span>
                </div>
              </div>

              {/* Khối Mô tả công việc: Tiêu đề 20px / 22px, dòng nhỏ 18px / 20px */}
              <div className="space-y-4 mb-8">
                <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-800" />
                  <span>Mô tả công việc</span>
                </h3>
                <ul className="space-y-3.5 text-[18px] sm:text-[20px] text-gray-700">
                  {job.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-700 mt-2.5 shrink-0" />
                      <span className="leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Khối Yêu cầu ứng viên: Tiêu đề 20px / 22px, dòng nhỏ 18px / 20px */}
              <div className="space-y-4 mb-8">
                <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                  <span>Yêu cầu ứng viên</span>
                </h3>
                <ul className="space-y-3.5 text-[18px] sm:text-[20px] text-gray-700">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Khối Quyền lợi & Đãi ngộ: Tiêu đề 20px / 22px, dòng nhỏ 18px / 20px */}
              <div className="space-y-4 mb-8">
                <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-600" />
                  <span>Quyền lợi & Chế độ đãi ngộ</span>
                </h3>
                <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-3.5">
                  {job.benefits.map((ben, i) => (
                    <div key={i} className="flex items-start gap-3 text-[18px] sm:text-[20px] text-amber-950 font-medium">
                      <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                      <span className="leading-relaxed">{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Địa điểm làm việc chi tiết */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-[18px] sm:text-[20px] text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-800" />
                  <span>Các chi nhánh đang tuyển vị trí này tại TP.HCM:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[15px] sm:text-[16px] text-gray-700">
                  <div className="p-3 rounded-xl bg-gray-50">
                    📍 107 Lê Đức Thọ, Gò Vấp
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    📍 701 Phan Văn Trị, Gò Vấp
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    📍 685 Quang Trung, Gò Vấp
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    📍 342 Phan Huy Ích, Gò Vấp
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    📍 Chi nhánh CMT8, Quận 10
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    📍 Các chi nhánh Thủ Đức & Khu Đông
                  </div>
                </div>
              </div>

              {/* Thông tin liên hệ trực tiếp */}
              <div className="mt-8 p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-brand-900 uppercase tracking-wide">
                    Cần giải đáp thắc mắc ngay?
                  </p>
                  <p className="text-[18px] sm:text-[20px] text-brand-950 font-semibold mt-1">
                    Liên hệ Nhân sự: {siteConfig.hrContact.name} - SĐT/Zalo:{" "}
                    <span className="font-bold text-brand-900">
                      {siteConfig.hrContact.phone}
                    </span>
                  </p>
                </div>
                <a
                  href={siteConfig.hrContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Nhắn Zalo Phỏng Vấn</span>
                </a>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (30% - Sidebar 2 Khối theo mẫu 33.JPG) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Khối 1: Hộp Thông tin công việc (Sticky Card) */}
            <StickyJobSidebar job={job} />

            {/* Khối 2: Vị trí tuyển dụng liên quan */}
            <RelatedJobs relatedJobs={relatedJobs} />
          </div>
        </div>
      </div>
    </>
  );
}
