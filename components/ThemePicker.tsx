"use client"
import { THEMES } from '@/lib/themes'
import { track } from '@/lib/analytics'

export default function ThemePicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((t) => (
        <button
          key={t.id}
          className={`rounded border px-3 py-1 text-sm ${value === t.id ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}
          onClick={() => {
            onChange(t.id)
            track('card_theme_change', { theme: t.id })
          }}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}

