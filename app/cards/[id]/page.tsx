import type { Metadata } from 'next'
import { findItemById } from '@/lib/data'
import CardGenerator from '@/components/CardGenerator'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

type Props = { params: { id: string } }

export function generateMetadata({ params }: Props): Metadata {
  const found = findItemById(params.id)
  const text = found?.item.text || 'Anniversary card'
  const url = `https://wishwala.info/cards/${params.id}`
  const ogUrl = `https://wishwala.info/og/${params.id}.png`
  return {
    title: `Card: ${text.slice(0, 60)}`,
    description: text,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: text,
      description: text,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: 'Anniversary card preview'
        }
      ]
    }
  }
}

export default function Page({ params }: Props) {
  const found = findItemById(params.id)
  if (!found) return <div className="space-y-4"><h1 className="text-2xl font-semibold">Card Not Found</h1><Link href="/anniversary-wishes" className="text-brand">Back to overview</Link></div>

  const imageLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: found.item.text.slice(0, 80),
    caption: found.item.text,
    representativeOfPage: true,
    url: `https://wishwala.info/cards/${params.id}`,
    contentUrl: `https://wishwala.info/og/${params.id}.png`,
    width: 1200,
    height: 630
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs trail={[{ href: '/', label: 'Home' }, { href: `/${found.category.slug}`, label: found.category.title }, { href: `/cards/${params.id}`, label: 'Card' }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Card</h1>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Message preview</h2>
        <h3 className="text-sm font-semibold uppercase text-slate-500">Source wish</h3>
        <p className="text-slate-600">{found.item.text}</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Generate or download</h2>
        <CardGenerator text={found.item.text} itemId={found.item.id} page={found.category.slug} />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageLd) }} />
    </div>
  )
}
