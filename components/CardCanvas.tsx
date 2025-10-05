"use client"
import { useEffect, useRef } from 'react'
import { getTheme } from '@/lib/themes'

export type CardSize = 'square' | 'story'
const DIMENSIONS: Record<CardSize, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 },
}

export default function CardCanvas({ text, themeId, size }: { text: string; themeId: string; size: CardSize }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const { w, h } = DIMENSIONS[size]
    canvas.width = w
    canvas.height = h
    const theme = getTheme(themeId)

    // Background
    ctx.fillStyle = theme.palette.bg
    ctx.fillRect(0, 0, w, h)

    // Accent decoration (simple corner arc)
    ctx.fillStyle = theme.palette.accent
    ctx.globalAlpha = 0.08
    ctx.beginPath()
    ctx.arc(w, 0, Math.max(w, h) * 0.6, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1

    // Text
    const margin = Math.floor(Math.min(w, h) * 0.08)
    const maxWidth = w - margin * 2
    ctx.fillStyle = theme.palette.fg
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'

    const titleFontSize = Math.floor(Math.min(w, h) * 0.05)
    ctx.font = `700 ${titleFontSize}px ${theme.fonts.title}, serif`
    const title = 'Happy Anniversary'
    ctx.fillText(title, margin, margin)

    const bodyFontSize = Math.floor(Math.min(w, h) * 0.045)
    ctx.font = `400 ${bodyFontSize}px ${theme.fonts.body}, system-ui, -apple-system`
    const lines = wrapText(ctx, text, maxWidth)
    let y = margin + titleFontSize + Math.floor(bodyFontSize * 0.8)
    const lineHeight = Math.floor(bodyFontSize * 1.3)
    for (const line of lines) {
      ctx.fillText(line, margin, y)
      y += lineHeight
    }

    // Footer mark
    ctx.globalAlpha = 0.6
    ctx.font = `500 ${Math.floor(bodyFontSize * 0.55)}px ${theme.fonts.body}, system-ui`
    const mark = 'anniversarywishes.example'
    const metrics = ctx.measureText(mark)
    ctx.fillText(mark, w - metrics.width - margin, h - margin - Math.floor(bodyFontSize * 0.2))
    ctx.globalAlpha = 1
  }, [text, themeId, size])

  return <canvas ref={ref} className="w-full rounded border shadow-sm" />
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    const width = ctx.measureText(test).width
    if (width > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

