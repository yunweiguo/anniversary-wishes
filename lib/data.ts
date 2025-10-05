import type { CategoryData, WishItem } from './types'

// Import sample categories (M0 scope)
import husband from '@/data/categories/en/husband'
import husbandFunny from '@/data/categories/en/husband-funny'
import husbandRomantic from '@/data/categories/en/husband-romantic'
import wife from '@/data/categories/en/wife'
import first from '@/data/categories/en/first'
import hindi from '@/data/categories/hi/hindi'

export const CATEGORIES: Record<string, CategoryData> = {
  [husband.slug]: husband,
  [husbandFunny.slug]: husbandFunny,
  [husbandRomantic.slug]: husbandRomantic,
  [wife.slug]: wife,
  [first.slug]: first,
  [hindi.slug]: hindi,
}

export const ALL_CATEGORY_SLUGS = Object.keys(CATEGORIES)

export function getCategory(slug: string): CategoryData | undefined {
  return CATEGORIES[slug]
}

export function findItemById(id: string): { item: WishItem; category: CategoryData } | undefined {
  for (const cat of Object.values(CATEGORIES)) {
    for (const group of cat.groups) {
      const found = group.items.find((i) => i.id === id)
      if (found) return { item: found, category: cat }
    }
  }
  return undefined
}

export function getRelated(slug: string): CategoryData[] {
  const cat = getCategory(slug)
  if (!cat?.related) return []
  return cat.related.map((s) => CATEGORIES[s]).filter(Boolean)
}

