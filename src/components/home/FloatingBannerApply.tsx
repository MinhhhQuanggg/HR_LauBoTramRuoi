import { siteConfig } from "@/config/site";
import { Phone, Sparkles, MessageCircle } from "lucide-react";

export default function FloatingBannerApply() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mb-10 relative z-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl shadow-brand-950/5 border border-brand-100 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Viền nhấn màu đỏ nâu & vàng đồng đồng bộ nhận diện thương hiệu */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-amber-500 to-brand-800" />

        {/* Khối bên trái: Icon Zalo chuẩn nhận diện & Tiêu đề đồng bộ màu thương hiệu */}
        <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
          {/* Icon Zalo dạng bong bóng chat nhận diện chính thức */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 48 48"
              className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C12.954 4 4 12.507 4 23C4 28.188 6.19 32.89 9.845 36.312C9.406 39.512 8.016 42.616 8 42.656C7.875 42.938 7.953 43.266 8.188 43.469C8.328 43.594 8.516 43.656 8.703 43.656C8.828 43.656 8.953 43.625 9.063 43.563C12.422 41.672 15.656 41.344 17.516 41.563C19.578 42.484 21.734 43 24 43C35.046 43 44 34.493 44 24C44 13.507 35.046 4 24 4Z"
                fill="#0068FF"
              />
              <text
                x="50%"
                y="54%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontFamily="'Helvetica Neue', Arial, sans-serif"
                fontWeight="900"
                fontSize="13.5"
                letterSpacing="-0.5"
              >
                Zalo
              </text>
            </svg>
          </div>

          {/* Tiêu đề đồng bộ màu đỏ nâu Trăm Rưỡi (brand-800) */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Hỗ Trợ Ứng Viên 24/7</span>
            </div>
            <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-extrabold text-gray-900 leading-snug">
              <span className="text-brand-800 font-black">Liên hệ</span> với chúng tôi để
              <br className="hidden sm:inline" /> nhận thông tin tuyển dụng
            </h3>
          </div>
        </div>

        {/* Khối bên phải: Khung con nhộng đồng bộ bảng màu đỏ nâu / vàng ấm */}
        <div className="w-full lg:w-auto flex-1 max-w-xl">
          <div className="bg-brand-50/60 rounded-full p-2 pl-5 sm:pl-6 flex items-center justify-between gap-3 border border-brand-200/70 shadow-inner">
            {/* Thông tin số điện thoại */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-gray-800 min-w-0">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800 shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 truncate">
                <a
                  href={`tel:${siteConfig.hrContact.phone}`}
                  className="text-[17px] sm:text-[19px] font-bold text-brand-950 hover:text-brand-800 transition tracking-wide truncate"
                  title="Bấm để gọi điện cho anh Kiên"
                >
                  {siteConfig.hrContact.phone}
                </a>
                <span className="text-xs sm:text-sm text-brand-900/70 font-semibold truncate">
                  (Zalo/SĐT Kiên HR)
                </span>
              </div>
            </div>

            {/* Nút Nhắn Zalo đồng bộ với màu thương hiệu đỏ nâu & icon màu vàng */}
            <a
              href={siteConfig.hrContact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm sm:text-base shadow-md shadow-brand-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>Nhắn Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
