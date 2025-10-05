import Link from 'next/link'
import type { CategoryData } from '@/lib/types'

export default function RelatedNav({ related }: { related: CategoryData[] }) {
  if (!related.length) return null
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-semibold tracking-tight">You may also like</h2>
      <div className="flex flex-wrap gap-2">
        {related.map((r) => (
          <Link key={r.slug} href={`/${r.slug}`} className="rounded border px-3 py-1 text-sm hover:bg-slate-50">
            {r.title}
          </Link>
        ))}
      </div>
    </section>
  )
}

