import CurvedWaveDivider from "../common/CurvedWaveDivider";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#a82323] via-[#6B1414] to-[#2a0505] text-white pt-12 md:pt-16 lg:pt-20 pb-0 overflow-hidden">
      {/* Banner Gradient phủ đều đồng bộ với Menu: Nhẹ (#a82323) -> Trung (#6B1414) -> Đậm (#2a0505) */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Breadcrumb / Tagline nhỏ */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-white/10 to-amber-500/20 backdrop-blur-md text-amber-300 text-xs font-semibold mb-6 shadow-sm border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Chuỗi F&B Lẩu Bò Trăm Rưỡi Tuyển Dụng</span>
        </div>

        {/* Tiêu đề H1 chuẩn PRD */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white drop-shadow-md leading-[1.22]">
          <span className="block">HỌC VIỆC, HỌC NGHỀ MIỄN PHÍ,</span>
          <span className="block mt-2 sm:mt-2.5 text-amber-300 drop-shadow-md">
            VẪN CÓ LƯƠNG ĐỦ
          </span>
        </h1>

        {/* Giữ Hero thoáng sạch đúng quy tắc PRD: Không search bar, không sub-headline rườm rà */}
        <div className="h-10 md:h-14" />
      </div>

      {/* Đường cong vòm phía dưới Hero */}
      <CurvedWaveDivider fillColor="#F8F9FA" className="w-full" />
    </section>
  );
}
