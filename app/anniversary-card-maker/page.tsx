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
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Anniversary Card Maker</h1>
      <section>
        <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-2 space-y-2 text-slate-600">
          <div>
            <h3 className="font-semibold text-slate-800">1. Pick or edit your message</h3>
            <p>Start with a saved wish or paste your own text. Fill in any variables like {'{name}'} or {'{relation}'}.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">2. Choose theme and size</h3>
            <p>Switch between Light, Dark, Floral, or Elegant, and export 1080×1080 or 1080×1920.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">3. Download or share</h3>
            <p>Download the PNG or copy a share link to keep editing later.</p>
          </div>
        </div>
      </section>
      <CardGenerator text={text} itemId={byId?.item.id} page={byId?.category.slug} />
    </div>
  )
}
