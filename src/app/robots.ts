import { siteConfig } from "@/config/site";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Bytespider",
          "Applebot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
