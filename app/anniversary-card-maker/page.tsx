import type { Metadata } from 'next'
import { findItemById } from '@/lib/data'
import CardGenerator from '@/components/CardGenerator'

export const metadata: Metadata = {
  title: 'Anniversary Card Maker',
  description: 'Turn any wish into a beautiful share-ready image card (1080×1080 / 1080×1920).'
}

export default function Page({ searchParams }: { searchParams: { id?: string; text?: string } }) {
  const byId = searchParams.id ? findItemById(searchParams.id) : undefined
  const text = byId?.item.text || searchParams.text || 'To my love, here’s to another year of us. Happy Anniversary!'
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Anniversary Card Maker</h1>
      <p className="text-slate-600">Choose a theme, pick a size, and download your card.</p>
      <CardGenerator text={text} itemId={byId?.item.id} page={byId?.category.slug} />
    </div>
  )
}

