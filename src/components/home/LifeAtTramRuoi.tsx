import { siteConfig } from "@/config/site";
import { Play, Sparkles, ExternalLink } from "lucide-react";

export default function LifeAtTramRuoi() {
  const videoCards = [
    {
      title: "Một ngày làm việc thực chiến tại gian bếp Lẩu Bò Trăm Rưỡi",
      author: "@tiemlaubotramruoi",
      platform: "TikTok",
      thumbnailBg: "from-red-900 to-amber-900",
      tag: "Học việc bếp thực tế",
      url: siteConfig.socials.tiktok,
    },
    {
      title: "Không khí giờ cao điểm tại Tiệm Lẩu Bò Trăm Rưỡi CMT8",
      author: "@tiemlaubotramruoi",
      platform: "TikTok",
      thumbnailBg: "from-brand-950 to-brand-800",
      tag: "Văn hóa & Đồng đội",
      url: siteConfig.socials.tiktok,
    },
    {
      title: "Chính sách bao ăn ca & đào tạo nghề bếp từ con số 0",
      author: "Lẩu Bò Trăm Rưỡi",
      platform: "Facebook Reel",
      thumbnailBg: "from-amber-950 to-brand-900",
      tag: "Phúc lợi nhân viên",
      url: siteConfig.socials.facebookFanpage,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kênh Truyền Thông & Mạng Xã Hội</span>
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight">
            Đời Sống Tại <span className="text-brand-800">Trăm Rưỡi</span>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoCards.map((video, idx) => (
          <a
            key={idx}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden aspect-[9/14] bg-gradient-to-br shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-5 border border-white/20"
            style={{
              backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            }}
          >
            {/* Lớp nền mờ màu thương hiệu */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${video.thumbnailBg} opacity-95 group-hover:scale-105 transition-transform duration-500`}
            />

            {/* Tag góc trên */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {video.tag}
              </span>
              <span className="text-[11px] font-semibold text-amber-300">
                {video.platform}
              </span>
            </div>

            {/* Nút Play trung tâm */}
            <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-lg group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-300">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>

            {/* Tiêu đề & Tác giả phía dưới */}
            <div className="relative z-10 space-y-1">
              <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 drop-shadow">
                {video.title}
              </h3>
              <p className="text-xs text-amber-200/90 font-medium">
                {video.author}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
