import Link from 'next/link'

export default function Breadcrumbs({ trail }: { trail: Array<{ href: string; label: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600">
      {trail.map((t, i) => (
        <span key={t.href}>
          {i > 0 && <span className="mx-2 text-slate-300">/</span>}
          <Link href={t.href} className="hover:underline">{t.label}</Link>
        </span>
      ))}
    </nav>
  )
}

