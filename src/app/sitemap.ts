import { siteConfig } from "@/config/site";
import { JOBS_DATA } from "@/data/jobs";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const jobUrls = JOBS_DATA.map((job) => ({
    url: `${siteConfig.url}/viec-lam/${job.slug}`,
    lastModified: new Date(job.datePosted),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...jobUrls,
  ];
}
