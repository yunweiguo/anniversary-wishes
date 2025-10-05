"use client"
import { track } from '@/lib/analytics'
import { useState } from 'react'
import { Button } from '@/app/components/ui/button'

export default function CopyButton({ text, itemId, page }: { text: string; itemId: string; page: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
        track('copy_text', { page, item_id: itemId })
      }}
      aria-label="Copy text"
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}
