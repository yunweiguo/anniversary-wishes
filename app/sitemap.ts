import type { MetadataRoute } from 'next'
import { ALL_CATEGORY_SLUGS, CATEGORIES } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wishwala.info'
  const pages: MetadataRoute.Sitemap = []
  const now = new Date()
  pages.push({ url: `${base}/anniversary-wishes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 })
  for (const slug of ALL_CATEGORY_SLUGS) {
    pages.push({ url: `${base}/${slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 })
  }
  // Cards
  const items = Object.values(CATEGORIES).flatMap((c) => c.groups.flatMap((g) => g.items))
  for (const it of items) {
    pages.push({ url: `${base}/cards/${it.id}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  }
  // Maker & images
  pages.push({ url: `${base}/anniversary-card-maker`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 })
  pages.push({ url: `${base}/anniversary-wishes-images`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  return pages
}
