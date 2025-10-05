"use client"
import Link from 'next/link'
import QuickFilterNav from '@/components/QuickFilterNav'
import Hero from '@/components/Hero'
import SentenceList from '@/components/SentenceList'
import CardWall from '@/components/CardWall'
import FAQGeneric from '@/components/FAQGeneric'
import EATSection from '@/components/EATSection'
import GeneratorSheet from '@/components/GeneratorSheet'
import Section from '@/components/Section'
import { useState } from 'react'
import type { CategoryData, WishItem } from '@/lib/types'

export default function LandingContent({ heroCat, cats }: { heroCat: CategoryData; cats: CategoryData[] }) {
  const defaultItem: WishItem | undefined = heroCat?.groups?.[0]?.items?.[0]
  const defaultText = defaultItem?.text || 'To my {relation}, here’s to another year of us. Happy {nth} Anniversary!'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerText, setDrawerText] = useState(defaultText)
  const [drawerVars, setDrawerVars] = useState(defaultItem?.vars || [])

  const openWithItem = (item?: WishItem) => {
    const text = item?.text || defaultText
    setDrawerText(text)
    setDrawerVars(item?.vars || [])
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-10">
      <Hero
        title="Anniversary Wishes"
        summary="Find the right words fast. Explore by relationship, tone, and language. Generate shareable image cards in one tap."
        featured={heroCat.groups[0].items}
        ctaHref="#"
        onCtaClick={() => openWithItem(defaultItem)}
        onSelect={(item) => openWithItem(item)}
      />

      <Section title="Quick Filters" description="Jump to popular relationships, tones, and languages.">
        <QuickFilterNav bare />
      </Section>

      <Section title="Popular Wishes" description="Curated lines you can copy, personalize, and turn into images.">
        <SentenceList data={heroCat} onGenerate={(item) => openWithItem(item)} />
      </Section>

      <Section title="Image Cards" description="Browse share-ready cards with indexable URLs for search.">
        <CardWall data={heroCat} />
      </Section>

      <Section title="FAQ" description="Short, scannable answers that AI Overviews can extract.">
        <FAQGeneric
          items={[
            { q: 'How do I write an anniversary wish?', a: 'Keep it authentic: a shared memory, gratitude, and a hopeful note for the future.' },
            { q: 'Can I use these lines commercially?', a: 'Personal use is encouraged. For commercial use, please review our Terms.' },
            { q: 'Can I generate images for Instagram?', a: 'Yes. Use the Card Maker to export 1080×1080 or 1080×1920 cards.' },
          ]}
        />
      </Section>

      <EATSection />

      <Section title="More Categories" description="Explore more relationships, tones, and milestones.">
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {cats.map((c) => (
            <li key={c.slug} className="rounded-md border bg-white/70 p-4 shadow-sm">
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{c.summary}</p>
              <Link href={`/${c.slug}`} className="mt-3 inline-block text-sm text-brand hover:underline">Explore</Link>
            </li>
          ))}
        </ul>
      </Section>

      <GeneratorSheet open={drawerOpen} onOpenChange={setDrawerOpen} initialText={drawerText} initialVars={drawerVars} />
    </div>
  )
}
