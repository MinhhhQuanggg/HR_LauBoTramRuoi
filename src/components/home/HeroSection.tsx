import CurvedWaveDivider from "../common/CurvedWaveDivider";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700 text-white pt-12 md:pt-16 lg:pt-20 pb-0 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Breadcrumb / Tagline nhỏ */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-6 shadow-sm border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chuỗi F&B Lẩu Bò Trăm Rưỡi Tuyển Dụng</span>
        </div>

        {/* Tiêu đề H1 chuẩn PRD */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white drop-shadow-md leading-[1.22]">
          <span className="block">HỌC VIỆC, HỌC NGHỀ MIỄN PHÍ,</span>
          <span className="block mt-2 sm:mt-2.5 text-amber-400">
            VẪN CÓ LƯƠNG ĐỦ
          </span>
        </h1>

        {/* Giữ Hero thoáng sạch đúng quy tắc PRD: Không search bar, không sub-headline rườm rà */}
        <div className="h-10 md:h-14" />
      </div>

      {/* Đường cong vòm phía dưới Hero như ảnh 11.JPG */}
      <CurvedWaveDivider fillColor="#F8F9FA" className="w-full" />
    </section>
  );
}
