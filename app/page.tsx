import type { Metadata } from 'next'
import { ALL_CATEGORY_SLUGS, CATEGORIES } from '@/lib/data'
import LandingContent from '@/components/LandingContent'

export const metadata: Metadata = {
  title: 'Anniversary Wishes — Ideas, Captions, and Cards',
  description: 'Browse curated anniversary wishes by relationship, tone, and language. Copy, generate image cards, and share instantly.'
}

export default function Home() {
  const cats = ALL_CATEGORY_SLUGS.map((s) => CATEGORIES[s])
  const heroCat = CATEGORIES['anniversary-wishes-for-husband'] || cats[0]
  return <LandingContent heroCat={heroCat} cats={cats} />
}
