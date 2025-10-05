import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryContent from '@/components/CategoryContent'
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
      <CategoryContent data={data} related={related} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </div>
  )
}
