import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import SentenceList from '@/components/SentenceList'
import CardWall from '@/components/CardWall'
import FAQ from '@/components/FAQ'
import RelatedNav from '@/components/RelatedNav'
import Section from '@/components/Section'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getCategory, getRelated } from '@/lib/data'

export function generateCategoryMetadata(slug: string): Metadata {
  const data = getCategory(slug)
  if (!data) return {}
  return {
    title: data.title,
    description: data.summary,
    alternates: {
      canonical: `/${data.slug}`
    },
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.summary
    }
  }
}

export default function CategoryPage({ slug }: { slug: string }) {
  const data = getCategory(slug)
  if (!data) return <div>Not found</div>
  const featured = data.groups[0]?.items?.slice(0, 5) || []
  const related = getRelated(slug)
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: data.groups.flatMap((g) => g.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.text,
      url: `/cards/${it.id}`
    })))
  }
  return (
    <div>
      <Breadcrumbs trail={[{ href: '/', label: 'Home' }, { href: `/${slug}`, label: data.title }]} />
      <Hero title={data.title} summary={data.summary} featured={featured} />

      <Section title="Wishes" description="Copy, personalize, and generate an image card.">
        <SentenceList data={data} />
      </Section>

      <Section title="Image Cards" description="Share-ready cards with indexable URLs.">
        <CardWall data={data} />
      </Section>

      <Section title="FAQ" description="Short answers for common etiquette and writing tips.">
        <FAQ data={data} />
      </Section>

      <RelatedNav related={related} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </div>
  )
}
