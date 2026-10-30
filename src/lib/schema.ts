import { siteConfig } from "@/config/site";
import { JobItem } from "@/types/job";

export function generateJobPostingSchema(job: JobItem) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `
      <h3>Mô tả công việc</h3>
      <ul>
        ${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}
      </ul>
      <h3>Yêu cầu công việc</h3>
      <ul>
        ${job.requirements.map((r) => `<li>${r}</li>`).join("")}
      </ul>
      <h3>Quyền lợi được hưởng</h3>
      <ul>
        ${job.benefits.map((b) => `<li>${b}</li>`).join("")}
      </ul>
    `.trim(),
    identifier: {
      "@type": "PropertyValue",
      name: siteConfig.companyName,
      value: job.id,
    },
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.workType,
    experienceRequirements: job.experienceRequirements,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.hiringOrgName,
      sameAs: [
        siteConfig.socials.facebookFanpage,
        siteConfig.socials.tiktok,
      ],
      logo: `${siteConfig.url}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "107 Lê Đức Thọ, Phường 17 (và các chi nhánh Gò Vấp, Thủ Đức, Quận 10)",
        addressLocality: "Gò Vấp",
        addressRegion: "Hồ Chí Minh",
        addressCountry: "VN",
      },
    },
    directApply: true,
  };

  if (job.minSalary && job.maxSalary && job.salaryUnit) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "VND",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.minSalary,
        maxValue: job.maxSalary,
        unitText: job.salaryUnit,
      },
    };
  }

  return schema;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.shortName,
    alternateName: siteConfig.subBrand,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    servesCuisine: "Lẩu Bò Triều Châu, Món Việt",
    priceRange: "$$",
    sameAs: [
      siteConfig.socials.facebookFanpage,
      siteConfig.socials.tiktok,
    ],
  };
}
