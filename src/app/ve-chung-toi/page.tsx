import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import CurvedWaveDivider from "@/components/common/CurvedWaveDivider";
import Image from "next/image";
import { ChevronRight, MapPin, Phone, ShieldCheck, HeartHandshake, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Lẩu Bò Trăm Rưỡi",
  description:
    "Tìm hiểu về chuỗi F&B Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu. Văn hóa đào tạo nghề bếp có lương và cam kết phát triển nhân sự.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header Banner - Gradient phủ đều: Nhẹ (#a82323) -> Trung (#6B1414) -> Đậm (#2a0505) */}
      <section className="relative bg-gradient-to-r from-[#a82323] via-[#6B1414] to-[#2a0505] text-white pt-8 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-amber-200/80 mb-4">
            <Link href="/" className="hover:text-white transition">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Về chúng tôi</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Về Lẩu Bò Trăm Rưỡi
          </h1>
        </div>
      </section>

      <CurvedWaveDivider fillColor="#F8F9FA" className="w-full" />

      {/* Main Content - Layout 2 cột đồng bộ trang chi tiết */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT TRÁI (70%) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-8">
              {/* Giới thiệu */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  Hệ Thống Tiệm Lẩu Bò Trăm Rưỡi – Lẩu Bò Triều Châu
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <strong>Lẩu Bò Trăm Rưỡi</strong> là chuỗi nhà hàng ẩm thực chuyên về lẩu bò chuẩn vị Triều Châu với hệ thống 13 chi nhánh trải rộng khắp TP. Hồ Chí Minh (Gò Vấp, Thủ Đức, Quận 3, Quận 10, Phú Nhuận, Bình Thạnh, Tân Phú, Bình Tân) và tỉnh Đồng Nai (Biên Hòa).
                </p>
              </div>

              {/* Giá trị cốt lõi */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                  <ShieldCheck className="w-7 h-7 text-amber-600" />
                  <h3 className="font-bold text-gray-900 text-base">Thực Phẩm Tươi Sạch</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Thịt bò tươi cắt mổ trong ngày, nước dùng ninh từ xương bò hầm cùng thảo mộc gia truyền Triều Châu.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200/60 space-y-2">
                  <HeartHandshake className="w-7 h-7 text-brand-800" />
                  <h3 className="font-bold text-gray-900 text-base">Học Nghề Có Lương</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Đào tạo nghề bếp miễn phí từ số 0, vẫn nhận đủ lương hàng tháng và bao ăn theo ca.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/60 space-y-2">
                  <Award className="w-7 h-7 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-base">Lộ Trình Rõ Ràng</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Cơ hội thăng tiến lên Bếp chính, Tổ trưởng và Quản lý tiệm sau 3 - 6 tháng nỗ lực.
                  </p>
                </div>
              </div>

              {/* Thông tin liên hệ chính thức */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Thông Tin Liên Hệ & Trụ Sở</h3>
                <div className="space-y-3 text-sm sm:text-base text-gray-700">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" />
                    <span>
                      <strong>Hệ thống:</strong> 13 chi nhánh tại TP.HCM & Đồng Nai (Chi nhánh trung tâm: 516 CMT8, Quận 3; 828 Sư Vạn Hạnh, Quận 10; 228 Hoàng Diệu 2, Thủ Đức; 701 Phan Văn Trị, Gò Vấp...).
                    </span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="w-5 h-5 text-brand-800 shrink-0" />
                    <span>
                      <strong>Hotline / Zalo Tuyển dụng:</strong>{" "}
                      <a href={`tel:${siteConfig.hrContact.phone}`} className="font-bold text-brand-900 hover:underline">
                        {siteConfig.hrContact.phone}
                      </a>{" "}
                      (Mr. Nguyễn Trung Kiên)
                    </span>
                  </p>
                </div>
              </div>

              {/* Các kênh mạng xã hội */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <h3 className="text-lg font-bold text-gray-900">Kênh Mạng Xã Hội Chính Thức</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={siteConfig.socials.facebookFanpage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold border border-blue-200 transition"
                  >
                    Facebook: Tiệm Lẩu Bò Trăm Rưỡi
                  </a>
                  <a
                    href={siteConfig.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold border border-gray-300 transition"
                  >
                    TikTok: @tiemlaubotramruoi
                  </a>
                  <a
                    href={siteConfig.socials.recruitmentPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-brand-900 text-sm font-semibold border border-red-200 transition"
                  >
                    Fanpage Tuyển Dụng Học Việc Bếp
                  </a>
                </div>
              </div>

              <div className="pt-4 text-center">
                <Link
                  href="/#danh-sach-viec-lam"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-brand-900 hover:bg-brand-800 text-amber-300 font-bold transition shadow-md"
                >
                  Xem Các Vị Trí Đang Tuyển Dụng
                </Link>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (30% - Chỉ để lại Logo thương hiệu) */}
          <div className="lg:col-span-4">
            <div className="w-full sticky top-24">
              <Image
                src="/logo.png"
                alt="Tiệm Lẩu Bò Trăm Rưỡi"
                width={409}
                height={400}
                priority
                className="w-full h-auto rounded-3xl object-contain shadow-sm border border-gray-100 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
