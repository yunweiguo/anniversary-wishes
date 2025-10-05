import { NextResponse } from 'next/server'
import { CATEGORIES } from '@/lib/data'

export const revalidate = 86400 // 1 day

export async function GET() {
  const base = 'https://example.com'
  const items = Object.values(CATEGORIES).flatMap((c) => c.groups.flatMap((g) => g.items))

  const urls = items
    .map((it) => {
      const pageUrl = `${base}/cards/${it.id}`
      const imageUrl = `${base}/og/${it.id}.png`
      return `
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(it.text.slice(0, 80))}</image:title>
    </image:image>
  </url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

