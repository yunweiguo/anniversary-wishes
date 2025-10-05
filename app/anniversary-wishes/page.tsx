import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_CATEGORY_SLUGS, CATEGORIES } from '@/lib/data'
import QuickFilterNav from '@/components/QuickFilterNav'
import Section from '@/components/Section'

export const metadata: Metadata = {
  title: 'Anniversary Wishes — Ideas, Captions, and Cards',
  description: 'Browse curated anniversary wishes by relationship, tone, and language. Copy, generate image cards, and share instantly.'
}

export default function Page() {
  const cats = ALL_CATEGORY_SLUGS.map((s) => CATEGORIES[s])
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-semibold tracking-tight">Anniversary Wishes</h1>
      <Section title="Anniversary Wishes Overview" description="Browse categories by relationship, tone, language, and milestones. Start with a category, then copy or generate a shareable image card.">
        <QuickFilterNav bare />
      </Section>

      <Section title="All Categories" description="A complete index of currently available pages.">
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {cats.map((c) => (
            <li key={c.slug} className="rounded-md border bg-white/70 p-4 shadow-sm">
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{c.summary}</p>
              <Link href={`/${c.slug}`} className="mt-3 inline-block text-sm text-brand hover:underline">Open</Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tools" description="Jump straight into making cards or browsing images.">
        <div className="flex flex-wrap gap-3">
          <Link href="/anniversary-card-maker" className="rounded bg-brand px-4 py-2 text-white hover:bg-brand-dark">Card Maker</Link>
          <Link href="/anniversary-wishes-images" className="rounded border px-4 py-2 hover:bg-slate-50">Images</Link>
        </div>
      </Section>
    </div>
  )
}
