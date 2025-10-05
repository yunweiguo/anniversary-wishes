import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'
import { Button } from '@/app/components/ui/button'

export default function QuickFilterNav({ bare = false }: { bare?: boolean }) {
  // Derive available options from current categories
  const relationship = [
    'anniversary-wishes-for-husband',
    'anniversary-wishes-for-wife',
  ].filter((s) => CATEGORIES[s as keyof typeof CATEGORIES])
  const tone = [
    'romantic-anniversary-wishes-for-husband',
    'funny-anniversary-wishes-for-husband',
  ].filter((s) => CATEGORIES[s as keyof typeof CATEGORIES])
  const language = [
    { code: 'en', label: 'English', href: '/anniversary-wishes' },
    { code: 'hi', label: 'Hindi', href: '/hindi-anniversary-wishes' },
  ]

  return (
    <nav className={bare ? '' : 'mb-8 rounded-lg border bg-white p-4 shadow-sm'}>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Relationship</p>
          <div className="flex flex-wrap gap-2">
            {relationship.map((slug) => (
              <Link key={slug} href={`/${slug}`}>
                <Button variant="outline" size="sm">{CATEGORIES[slug]?.title}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Tone</p>
          <div className="flex flex-wrap gap-2">
            {tone.map((slug) => (
              <Link key={slug} href={`/${slug}`}>
                <Button variant="outline" size="sm">{CATEGORIES[slug]?.title}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Language</p>
          <div className="flex flex-wrap gap-2">
            {language.map((l) => (
              <Link key={l.code} href={l.href}>
                <Button variant="outline" size="sm">{l.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
