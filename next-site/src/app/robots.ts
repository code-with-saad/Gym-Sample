import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/demo/",
    },
    sitemap: "https://ironforgefitness.pk/sitemap.xml",
  };
}
