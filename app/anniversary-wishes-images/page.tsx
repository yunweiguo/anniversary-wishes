import { CATEGORIES } from '@/lib/data'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anniversary Wishes Images — Shareable Cards',
  description: 'Browse a curated wall of shareable anniversary image cards. Each card has an indexable URL.'
}

export default function Page() {
  const items = Object.values(CATEGORIES).flatMap((c) => c.groups.flatMap((g) => g.items.map((it) => ({ ...it, category: c }))))
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Anniversary Wishes Images</h1>
      <section>
        <h2 className="text-xl font-semibold tracking-tight">Gallery</h2>
        <p className="mt-1 text-slate-600">Tap any card to open the detail page, download the PNG, or personalize the text.</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.slice(0, 48).map((it) => (
            <Link key={it.id} href={`/cards/${it.id}`} className="group block">
              <article className="aspect-square w-full rounded border bg-gradient-to-br from-pink-50 to-indigo-50 p-3 text-xs text-slate-700">
                <h3 className="mb-2 text-sm font-semibold text-slate-800">{it.category.title}</h3>
                <p className="line-clamp-5">{it.text}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
