import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllCategories,
  getAllTags,
} from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const base: MetadataRoute.Sitemap = [
    { url: "/", priority: 1.0 },
    { url: "/categories", priority: 0.7 },
    { url: "/tags", priority: 0.7 },
    { url: "/search", priority: 0.5 },
    { url: "/about", priority: 0.3 },
    { url: "/contact", priority: 0.3 },
    { url: "/privacy", priority: 0.3 },
  ].map((x) => ({
    ...x,
    lastModified: new Date(),
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `/posts/${p.slug}`,
    priority: 0.8,
    lastModified: new Date(),
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `/categories/${encodeURIComponent(c.category)}`,
    priority: 0.6,
    lastModified: new Date(),
  }));

  const tagUrls: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `/tags/${encodeURIComponent(t.tag)}`,
    priority: 0.6,
    lastModified: new Date(),
  }));

  return [...base, ...postUrls, ...categoryUrls, ...tagUrls];
}