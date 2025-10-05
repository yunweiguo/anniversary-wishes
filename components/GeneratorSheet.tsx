"use client"
import { useEffect, useMemo, useState } from 'react'
import CardGenerator from './CardGenerator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/components/ui/sheet'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { track } from '@/lib/analytics'

function substitute(text: string, vars: Record<string, string>) {
  return text
    .replaceAll('{name}', vars.name || '{name}')
    .replaceAll('{relation}', vars.relation || '{relation}')
    .replaceAll('{nth}', vars.nth || '{nth}')
}

export default function GeneratorSheet({
  open,
  onOpenChange,
  initialText,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialText: string
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-3xl">
        <SheetHeader>
          <SheetTitle>Card Generator</SheetTitle>
        </SheetHeader>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="gen-text">Text</Label>
            <Textarea id="gen-text" className="h-40" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <Label htmlFor="var-name">{`{name}`}</Label>
                <Input id="var-name" value={vars.name} onChange={(e) => setVars((v) => ({ ...v, name: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="var-relation">{`{relation}`}</Label>
                <Input id="var-relation" value={vars.relation} onChange={(e) => setVars((v) => ({ ...v, relation: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="var-nth">{`{nth}`}</Label>
                <Input id="var-nth" value={vars.nth} onChange={(e) => setVars((v) => ({ ...v, nth: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setVars({ name: '', relation: '', nth: '' })}>Clear Vars</Button>
              <Button variant="outline" onClick={share}>Share</Button>
            </div>
          </div>
          <div>
            <CardGenerator text={rendered} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

