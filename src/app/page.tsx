import { generateOrganizationSchema } from "@/lib/schema";
import HeroSection from "@/components/home/HeroSection";
import JobGridSection from "@/components/home/JobGridSection";
import LifeAtTramRuoi from "@/components/home/LifeAtTramRuoi";
import FloatingBannerApply from "@/components/home/FloatingBannerApply";

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

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
      <LifeAtTramRuoi />

      {/* Khối hộp trắng nổi tích hợp Form Ứng Tuyển Nhanh trước đường cong Footer */}
      <FloatingBannerApply />
    </>
  );
}
