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
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Anniversary Wishes Images</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.slice(0, 48).map((it) => (
          <Link key={it.id} href={`/cards/${it.id}`} className="group block">
            <div className="aspect-square w-full rounded border bg-gradient-to-br from-pink-50 to-indigo-50 p-3 text-xs text-slate-700">
              <div className="line-clamp-6">{it.text}</div>
            </div>
            <p className="mt-1 line-clamp-1 text-xs text-slate-500 group-hover:text-slate-700">{it.category.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

