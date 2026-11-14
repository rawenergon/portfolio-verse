import { MetadataRoute } from "next";
import { TEMPLATES_DATA } from "@/lib/templates-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-verse.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const templateRoutes: MetadataRoute.Sitemap = TEMPLATES_DATA.map((template) => {
    const parsedDate = Date.parse(template.updatedAt);
    const lastModified = !isNaN(parsedDate) ? new Date(parsedDate) : new Date();

    return {
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...templateRoutes];
}
