import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ironforgefitness.pk";
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/trainers",
    "/schedule",
    "/pricing",
    "/gallery",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Demo routes are intentionally excluded from the sitemap.
  return staticRoutes;
}
