import type { MetadataRoute } from "next";

import { articles, services } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexveins.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/about", "/contact", "/privacy", "/terms"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const articleRoutes = articles.map((article) => `/insights/${article.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
  }));
}

