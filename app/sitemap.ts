import type { MetadataRoute } from "next";
import { getAllPageSlugs, getAllBlogSlugs } from "@/lib/content";

const BASE_URL = "https://www.expertsportesdegarage.ca";

const CITY_SLUGS = [
  "portes-de-garage-granby",
  "portes-de-garage-saint-hyacinthe",
  "portes-de-garage-magog",
  "portes-de-garage-saint-jean-sur-richelieu",
  "portes-de-garage-bromont",
  "portes-de-garage-waterloo",
  "portes-de-garage-cowansville",
  "portes-de-garage-farnham",
  "portes-de-garage-beloeil",
];

const SERVICE_SLUGS = [
  "installation-de-nouvelle-porte-de-garage",
  "reparation-urgente-de-porte-de-garage",
  "reparation-ouvre-porte-de-garage",
  "remplacement-coupe-froid-porte-de-garage",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allSlugs = getAllPageSlugs();
  const blogSlugs = getAllBlogSlugs();

  const otherSlugs = allSlugs.filter(
    (slug) => !CITY_SLUGS.includes(slug) && !SERVICE_SLUGS.includes(slug)
  );

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    // Blogue index
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    },
    // Articles de blogue
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      lastModified: new Date(),
    })),
    // Pages services — haute priorité
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      lastModified: new Date(),
    })),
    // Pages villes — haute priorité SEO local
    ...CITY_SLUGS.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      lastModified: new Date(),
    })),
    // Autres pages
    ...otherSlugs.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date(),
    })),
  ];
}
