"use client"
import Link from 'next/link'
import type { CategoryData } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'

export default function CardWall({ data }: { data: CategoryData }) {
  const all = data.groups.flatMap((g) => g.items)
  const [limit, setLimit] = useState(12)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setLimit((l) => Math.min(l + 12, all.length))
      })
    })
    io.observe(el)
    return () => io.disconnect()
  }, [all.length])

  const items = all.slice(0, limit)
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-semibold tracking-tight">Image Cards</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((it) => (
          <Link key={it.id} href={`/cards/${it.id}`} className="group block">
            <div className="aspect-square w-full rounded-lg border bg-white p-3 text-xs text-slate-700 shadow-sm ring-1 ring-transparent transition group-hover:shadow-md group-hover:ring-slate-200">
              <div className="line-clamp-6">{it.text}</div>
            </div>
            <p className="mt-1 text-xs text-slate-500 group-hover:text-slate-700">{it.id}</p>
          </Link>
        ))}
      </div>
      {limit < all.length && <div ref={loadMoreRef} className="py-6 text-center text-sm text-slate-500">Loading more…</div>}
    </section>
  )
}
