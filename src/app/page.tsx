import { generateOrganizationSchema } from "@/lib/schema";
import HeroSection from "@/components/home/HeroSection";
import JobGridSection from "@/components/home/JobGridSection";
import LifeAtTramRuoi from "@/components/home/LifeAtTramRuoi";
import FloatingBannerApply from "@/components/home/FloatingBannerApply";

import { getLifeVideosList } from "@/lib/life-videos-store";

export default async function HomePage() {
  const orgSchema = generateOrganizationSchema();
  const lifeVideos = await getLifeVideosList(true);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero Section vòm cong */}
      <HeroSection />

      {/* Lưới Job Cards 2 cột */}
      <JobGridSection />

      {/* Kênh truyền thông & Đời sống Trăm Rưỡi */}
      <LifeAtTramRuoi initialVideos={lifeVideos} />

      {/* Khối hộp trắng nổi tích hợp Form Ứng Tuyển Nhanh trước đường cong Footer */}
      <FloatingBannerApply />
    </>
  );
}
