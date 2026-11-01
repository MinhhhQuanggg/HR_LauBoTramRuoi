import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Play, Sparkles, ExternalLink } from "lucide-react";

import { LifeVideo } from "@/types/life-video";

interface LifeAtTramRuoiProps {
  initialVideos?: LifeVideo[];
}

export default function LifeAtTramRuoi({ initialVideos }: LifeAtTramRuoiProps) {
  const fallbackVideos: LifeVideo[] = [
    {
      id: "VID-01",
      title: "Chính thức ra mắt lẩu bò 2 ngăn nóng hổi tại Lẩu Bò Trăm Rưởi",
      author: "@tiemlaubotramruoi",
      platform: "TikTok",
      thumbnail: "/images/tiktok/tiktok-1.jpg",
      tag: "Món mới • Lẩu 2 ngăn",
      url: "https://www.tiktok.com/@tiemlaubotramruoi/video/7639325827200503060",
      displayOrder: 1,
      isActive: true,
    },
    {
      id: "VID-02",
      title: "Chi nhánh 828 Sư Vạn Hạnh sẵn sàng bùng nổ ngày khai trương",
      author: "@tiemlaubotramruoi",
      platform: "TikTok",
      thumbnail: "/images/tiktok/tiktok-2.jpg",
      tag: "Khai trương chi nhánh",
      url: "https://www.tiktok.com/@tiemlaubotramruoi/video/7699785501078752513",
      displayOrder: 2,
      isActive: true,
    },
    {
      id: "VID-03",
      title: "Đêm tiệc náo nhiệt: Vừa ăn lẩu bò vừa xem múa cổ trang tại Ung Văn Khiêm",
      author: "@tiemlaubotramruoi",
      platform: "TikTok",
      thumbnail: "/images/tiktok/tiktok-3.jpg",
      tag: "Sự kiện & Không khí",
      url: "https://www.tiktok.com/@tiemlaubotramruoi/video/7688300127995432213",
      displayOrder: 3,
      isActive: true,
    },
  ];

  const videos = initialVideos && initialVideos.length > 0 ? initialVideos : fallbackVideos;


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kênh Truyền Thông & Mạng Xã Hội</span>
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight">
            Đời Sống Tại <span className="text-brand-800">Lẩu Bò Trăm Rưỡi</span>
          </h2>
          <p className="text-[18px] sm:text-[20px] text-gray-600 mt-2">
            Hình ảnh chân thực về môi trường làm việc, đồng đội và gian bếp mỗi ngày
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            <span>TikTok {siteConfig.socials.tiktokHandle}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={siteConfig.socials.recruitmentPage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <span>Fanpage Tuyển Dụng</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Lưới video Facade (Tối ưu tốc độ tải trang Mobile >= 90) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id || video.url}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden aspect-[9/14] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-5 border border-white/20 bg-brand-950"
          >
            {/* Ảnh thumbnail video thực tế */}
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              unoptimized
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Lớp overlay nhẹ nhàng: chỉ tối ở chân (đọc tiêu đề) và trên cùng (đọc tag), ở giữa trong suốt để thấy rõ video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent via-50% to-black/40 group-hover:from-black/90 transition-colors" />

            {/* Tag góc trên */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/45 backdrop-blur-md text-white border border-white/20 shadow">
                {video.tag}
              </span>
              <span className="text-[11px] font-semibold text-amber-300 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 shadow">
                {video.platform}
              </span>
            </div>

            {/* Nút Play trung tâm */}
            <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-300">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>

            {/* Tiêu đề & Tác giả phía dưới */}
            <div className="relative z-10 space-y-1">
              <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-md">
                {video.title}
              </h3>
              <p className="text-xs text-amber-300 font-medium drop-shadow">
                {video.author}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
