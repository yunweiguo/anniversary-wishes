import type { CategoryData } from '@/lib/types'

export default function FAQ({ data }: { data: CategoryData }) {
  if (!data.faq?.length) return null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-semibold tracking-tight">FAQ</h2>
      <dl className="divide-y rounded-md border">
        {data.faq.map((f) => (
          <div key={f.q} className="p-4">
            <dt className="font-medium">{f.q}</dt>
            <dd className="mt-1 text-slate-600">{f.a}</dd>
          </div>
        ))}
      </dl>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}

