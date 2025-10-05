import Link from 'next/link'
import type { WishItem } from '@/lib/types'
import { Button } from '@/app/components/ui/button'

export default function Hero({
  title,
  summary,
  featured,
  ctaHref = '/anniversary-card-maker',
  onCtaClick,
  onSelect
}: {
  title: string
  summary: string
  featured: WishItem[]
  ctaHref?: string
  onCtaClick?: () => void
  onSelect?: (item: WishItem) => void
}) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-xl border bg-gradient-to-br from-rose-50 to-indigo-50 p-6 shadow-sm">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-rose-200/40 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-200/40 blur-2xl" />

      <h1 className="mb-2 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h1>
      <p className="mb-4 max-w-3xl text-slate-700">{summary}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {featured.slice(0, 4).map((it) => (
          onSelect ? (
            <button
              key={it.id}
              type="button"
              onClick={() => onSelect?.(it)}
              className="rounded-md border bg-white/70 p-3 text-left text-sm text-slate-800 shadow transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              “{it.text}”
            </button>
          ) : (
            <blockquote key={it.id} className="rounded-md border bg-white/70 p-3 text-sm text-slate-800 shadow">
              “{it.text}”
            </blockquote>
          )
        ))}
      </div>
      <div className="mt-5">
        {onCtaClick ? (
          <Button onClick={onCtaClick}>Generate Card</Button>
        ) : (
          <Link href={ctaHref}>
            <Button>Generate Card</Button>
          </Link>
        )}
      </div>
    </section>
  )
}
