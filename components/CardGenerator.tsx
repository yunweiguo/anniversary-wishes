"use client"
import { useMemo, useState } from 'react'
import CardCanvas, { type CardSize } from './CardCanvas'
import ThemePicker from './ThemePicker'
import { track } from '@/lib/analytics'

export default function CardGenerator({
  text,
  initialTheme = 'light',
  initialSize = 'square',
  itemId,
  page
}: { text: string; initialTheme?: string; initialSize?: CardSize; itemId?: string; page?: string }) {
  const [theme, setTheme] = useState(initialTheme)
  const [size, setSize] = useState<CardSize>(initialSize)

  const watermarkEnabled = process.env.NEXT_PUBLIC_CARD_SHOW_WATERMARK === 'true'

  const filename = useMemo(() => `anniversary-card-${itemId || 'custom'}-${theme}-${size}.png`, [itemId, theme, size])

  function download() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    track('card_download', { page, item_id: itemId, format: 'png', size, footer: watermarkEnabled ? 'on' : 'off' })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ThemePicker value={theme} onChange={setTheme} />
        <div className="ml-auto flex items-center gap-4">
          <div className="flex gap-2">
            <SizeButton label="1080×1080" active={size === 'square'} onClick={() => setSize('square')} />
            <SizeButton label="1080×1920" active={size === 'story'} onClick={() => setSize('story')} />
          </div>
        </div>
      </div>
      <CardCanvas text={text} themeId={theme} size={size} showFooter={watermarkEnabled} />
      <div className="flex gap-3">
        <button onClick={download} className="rounded bg-brand px-4 py-2 text-white hover:bg-brand-dark">Download PNG</button>
      </div>
    </div>
  )
}

function SizeButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded border px-3 py-1 text-sm ${active ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}>
      {label}
    </button>
  )
}
