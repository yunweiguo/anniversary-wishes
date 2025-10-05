"use client"
import { useState } from 'react'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import SentenceList from '@/components/SentenceList'
import CardWall from '@/components/CardWall'
import FAQ from '@/components/FAQ'
import RelatedNav from '@/components/RelatedNav'
import GeneratorSheet from '@/components/GeneratorSheet'
import type { CategoryData, WishItem } from '@/lib/types'

export default function CategoryContent({ data, related }: { data: CategoryData; related: CategoryData[] }) {
  const defaultItem: WishItem | undefined = data?.groups?.[0]?.items?.[0]
  const defaultText = defaultItem?.text || 'To my {relation}, here’s to another year of us. Happy {nth} Anniversary!'
  const defaultVars = defaultItem?.vars || []

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerText, setDrawerText] = useState(defaultText)
  const [drawerVars, setDrawerVars] = useState(defaultVars)

  const openWithItem = (item?: WishItem) => {
    const text = item?.text || defaultText
    const vars = item?.vars || []
    setDrawerText(text)
    setDrawerVars(vars)
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-10">
      <Hero
        title={data.title}
        summary={data.summary}
        featured={data.groups[0]?.items || []}
        onCtaClick={() => openWithItem(defaultItem)}
        onSelect={(item) => openWithItem(item)}
      />

      <Section title="Wishes" description="Copy, personalize, and generate an image card.">
        <SentenceList data={data} onGenerate={(item) => openWithItem(item)} />
      </Section>

      <Section title="Image Cards" description="Share-ready cards with indexable URLs.">
        <CardWall data={data} />
      </Section>

      <Section title="FAQ" description="Quick etiquette and writing guidance for this category.">
        <FAQ data={data} />
      </Section>

      <RelatedNav related={related} />

      <GeneratorSheet open={drawerOpen} onOpenChange={setDrawerOpen} initialText={drawerText} initialVars={drawerVars} />
    </div>
  )
}

