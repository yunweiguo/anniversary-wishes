"use client"
import type { CategoryData, WishItem } from '@/lib/types'
import CopyButton from './CopyButton'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { track } from '@/lib/analytics'

export default function SentenceList({ data, onGenerate }: { data: CategoryData; onGenerate?: (item: WishItem) => void }) {
  return (
    <div className="space-y-8">
      {data.groups.map((g) => (
        <section key={g.label}>
          <h3 className="mb-3 text-lg font-semibold tracking-tight">{g.label}</h3>
          <ul className="space-y-3">
            {g.items.map((it) => (
              <li key={it.id} className="rounded-md border p-4">
                <p className="mb-3">{it.text}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <CopyButton text={it.text} itemId={it.id} page={data.slug} />
                  {onGenerate ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        onGenerate(it)
                        track('generate_card_open', { page: data.slug, item_id: it.id })
                      }}
                    >
                      Generate Card
                    </Button>
                  ) : (
                    <Link
                      href={{ pathname: '/anniversary-card-maker', query: { id: it.id } }}
                      onClick={() => track('generate_card_open', { page: data.slug, item_id: it.id })}
                      className="rounded border px-3 py-1 hover:bg-slate-50"
                    >
                      Generate Card
                    </Link>
                  )}
                  <Link href={`/cards/${it.id}`} className="rounded border px-3 py-1 hover:bg-slate-50">
                    View Image Page
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
