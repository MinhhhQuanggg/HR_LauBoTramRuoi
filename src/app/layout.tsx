import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import AppLayout from "@/components/layout/AppLayout";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#8B1E1E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.heroHeading} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  description: siteConfig.description,
  keywords: [
    "lẩu bò trăm rưỡi tuyển dụng",
    "học việc bếp",
    "học nghề f&b miễn phí có lương",
    "tuyển phụ bếp lẩu bò",
    "tuyển phục vụ part-time gò vấp",
    "việc làm f&b hồ chí minh",
    "lẩu bò triều châu",
  ],
  authors: [{ name: siteConfig.companyName }],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.heroHeading} | ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-surface">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
