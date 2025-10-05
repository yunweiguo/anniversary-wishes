"use client"
import { useEffect, useMemo, useState } from 'react'
import CardGenerator from './CardGenerator'
import { track } from '@/lib/analytics'

function substitute(text: string, vars: Record<string, string>) {
  return text
    .replaceAll('{name}', vars.name || '{name}')
    .replaceAll('{relation}', vars.relation || '{relation}')
    .replaceAll('{nth}', vars.nth || '{nth}')
}

export default function GeneratorDrawer({
  initialText,
  onClose
}: {
  initialText: string
  onClose: () => void
}) {
  const [text, setText] = useState(initialText)
  const [vars, setVars] = useState<{ name: string; relation: string; nth: string }>({ name: '', relation: '', nth: '' })

  useEffect(() => setText(initialText), [initialText])

  const rendered = useMemo(() => substitute(text, vars), [text, vars])

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareUrl = url.includes('/cards/') ? url : `/anniversary-card-maker?text=${encodeURIComponent(rendered)}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Anniversary Card', text: rendered, url: shareUrl })
      } else {
        await navigator.clipboard.writeText(shareUrl)
      }
      track('share_click', { channel: navigator.share ? 'native-share' : 'copy-link' })
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="ml-auto h-full w-full max-w-3xl overflow-y-auto bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Card Generator</h2>
          <button onClick={onClose} className="rounded border px-3 py-1 text-sm hover:bg-slate-50">Close</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm font-medium">Text</label>
            <textarea className="h-40 w-full rounded border p-2" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <label className="mb-1 block text-slate-600">{`{name}`}</label>
                <input className="w-full rounded border px-2 py-1" value={vars.name} onChange={(e) => setVars((v) => ({ ...v, name: e.target.value }))} />
              </div>
              <div>
                <label className="mb-1 block text-slate-600">{`{relation}`}</label>
                <input className="w-full rounded border px-2 py-1" value={vars.relation} onChange={(e) => setVars((v) => ({ ...v, relation: e.target.value }))} />
              </div>
              <div>
                <label className="mb-1 block text-slate-600">{`{nth}`}</label>
                <input className="w-full rounded border px-2 py-1" value={vars.nth} onChange={(e) => setVars((v) => ({ ...v, nth: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setVars({ name: '', relation: '', nth: '' })} className="rounded border px-3 py-1 text-sm hover:bg-slate-50">Clear Vars</button>
              <button onClick={share} className="rounded border px-3 py-1 text-sm hover:bg-slate-50">Share</button>
            </div>
          </div>
          <div>
            <CardGenerator text={rendered} />
          </div>
        </div>
      </div>
    </div>
  )
}

