"use client"
import { useEffect, useMemo, useState } from 'react'
import CardGenerator from './CardGenerator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { track } from '@/lib/analytics'

type VarKey = 'name' | 'relation' | 'nth'
const EMPTY_VALUES: Record<VarKey, string> = { name: '', relation: '', nth: '' }

export default function GeneratorSheet({
  open,
  onOpenChange,
  initialText,
  initialVars = []
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialText: string
  initialVars?: VarKey[]
}) {
  const [text, setText] = useState(initialText)
  const [activeVars, setActiveVars] = useState<VarKey[]>(initialVars)
  const [varValues, setVarValues] = useState<Record<VarKey, string>>(EMPTY_VALUES)

  useEffect(() => {
    setText(initialText)
    setActiveVars(initialVars)
    setVarValues({ ...EMPTY_VALUES })
  }, [initialText, initialVars])

  const rendered = useMemo(() => {
    let output = text
    ;(['name', 'relation', 'nth'] as VarKey[]).forEach((key) => {
      const value = varValues[key]
      output = output.replaceAll(`{${key}}`, value || `{${key}}`)
    })
    return output
  }, [text, varValues])

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareUrl = url.includes('/cards/') ? url : `/anniversary-card-maker?text=${encodeURIComponent(rendered)}`
    try {
      const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'
      if (canShare) {
        await navigator.share({ title: 'Anniversary Card', text: rendered, url: shareUrl })
      } else {
        await navigator.clipboard.writeText(shareUrl)
      }
      track('share_click', { channel: canShare ? 'native-share' : 'copy-link' })
    } catch {}
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Card Generator</DialogTitle>
          <DialogDescription>Personalize variables, preview the card, and download 1080×1080 or 1080×1920 images.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gen-text">Message</Label>
              <Textarea id="gen-text" className="h-40" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {activeVars.length ? (
                activeVars.map((key) => (
                  <div key={key}>
                    <Label htmlFor={`var-${key}`}>{`{${key}}`}</Label>
                    <Input
                      id={`var-${key}`}
                      value={varValues[key]}
                      onChange={(e) => setVarValues((prev) => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-xs text-slate-500">This message has no variables. Edit freely above.</p>)
              }
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setVarValues({ ...EMPTY_VALUES })}>Clear variables</Button>
              <Button variant="outline" onClick={share}>Share / copy link</Button>
            </div>
          </div>
          <div>
            <CardGenerator text={rendered} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
