import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOBS_DATA, getJobBySlug } from "@/data/jobs";
import { getJobByIdOrSlug } from "@/lib/jobs-store";
import { siteConfig } from "@/config/site";
import { generateJobPostingSchema } from "@/lib/schema";
import StickyJobSidebar from "@/components/job-detail/StickyJobSidebar";
import JobDetailMedia from "@/components/job-detail/JobDetailMedia";
import CurvedWaveDivider from "@/components/common/CurvedWaveDivider";
import { ChevronRight } from "lucide-react";

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

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = (await getJobByIdOrSlug(params.slug)) || getJobBySlug(params.slug);
  if (!job) {
    return {
      title: "Không tìm thấy công việc | Tuyển Dụng Lẩu Bò Trăm Rưỡi",
    };
  }

  const title = `${job.title} | Tuyển Dụng Lẩu Bò Trăm Rưỡi`;
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

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = (await getJobByIdOrSlug(params.slug)) || getJobBySlug(params.slug);
  if (!job) {
    notFound();
  }

  const jsonLd = generateJobPostingSchema(job);

  return (
    <>
      {/* Schema JobPosting phục vụ Google Jobs chuẩn 100% */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner với Breadcrumb - Gradient phủ đều: Nhẹ (#a82323) -> Trung (#6B1414) -> Đậm (#2a0505) */}
      <section className="relative bg-gradient-to-r from-[#a82323] via-[#6B1414] to-[#2a0505] text-white py-3.5 sm:py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-amber-200/80">
            <Link href="/" className="hover:text-white transition">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#danh-sach-viec-lam" className="hover:text-white transition">
              Cơ hội cho bạn
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{job.title}</span>
          </nav>
        </div>
      </section>

      <CurvedWaveDivider fillColor="#F8F9FA" className="w-full" />

      {/* Layout 2 cột bất đối xứng (70% - 30%) theo mẫu 33.JPG */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT TRÁI (70% - Hộp trắng lớn chứa nội dung JD) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
              {/* Badge & Tên vị trí: Tiêu đề tăng 2px lên 26px / 32px */}
              <div className="border-b border-gray-100 pb-6 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {(job.badges && job.badges.length > 0
                    ? job.badges
                    : job.badge
                    ? job.badge.split(",").map((s) => s.trim())
                    : [job.category]
                  ).map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-0.5 rounded-full text-[11px] sm:text-[12px] font-semibold bg-brand-50 text-brand-800 border border-brand-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <h1 className="text-[26px] sm:text-[32px] font-black text-gray-900 leading-tight">
                  {job.title}
                </h1>
                <div className="mt-3 flex items-center text-[18px] sm:text-[20px] text-gray-600">
                  <span className="flex items-center gap-1.5 font-bold text-brand-900">
                    💰 {job.salaryDisplay}
                  </span>
                </div>
              </div>

              {/* Nội dung tuyển dụng ngắn gọn trực quan theo mẫu bài post thực tế */}
              {job.concisePost ? (
                <div className="space-y-6">
                  {/* Đoạn giới thiệu ngắn */}
                  <p className="text-[18px] sm:text-[20px] text-gray-800 leading-relaxed font-normal">
                    {job.concisePost.intro}
                  </p>

                  {/* Danh sách các gạch đầu dòng ngắn gọn với Icon / Emoji chuẩn mẫu */}
                  <div className="space-y-4 pt-1">
                    {job.concisePost.points.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 text-[18px] sm:text-[20px] text-gray-800 leading-relaxed"
                      >
                        <span className="text-2xl shrink-0 mt-0.5 select-none">{point.icon}</span>
                        <div>
                          {point.label && (
                            <span className="font-bold text-gray-950 mr-1.5">
                              {point.label}
                            </span>
                          )}
                          <span>{point.content}</span>
                        </div>
                      </div>
                    ))}

                    {/* Dòng liên hệ Zalo */}
                    {job.concisePost.zalo && (
                      <div className="flex items-center gap-3.5 text-[18px] sm:text-[20px] pt-4 border-t border-gray-100">
                        <span className="text-2xl shrink-0 select-none">📲</span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-gray-950">Zl:</span>
                          <a
                            href={`https://zalo.me/${job.concisePost.zalo.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-black text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-2"
                          >
                            <span>{job.concisePost.zalo}</span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                              Nhắn Zalo Phỏng Vấn
                            </span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Fallback nếu không có concisePost */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Mô tả công việc</h3>
                    <ul className="space-y-2 text-gray-700">
                      {job.responsibilities.map((res, i) => (
                        <li key={i}>• {res}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI (30% - Logo thương hiệu & Media thực tế) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo thương hiệu */}
            <StickyJobSidebar job={job} />

            {/* 4 Thẻ ảnh và 1 Thẻ video bên dưới logo */}
            <JobDetailMedia
              images={job.images}
              videoUrl={job.videoUrl}
              videoPoster={job.videoPoster}
            />
          </div>
        </div>
      </div>
    </>
  );
}
