import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { findItemById } from '@/lib/data'

export const runtime = 'edge'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const found = findItemById(params.id)
  const text = found?.item.text || 'Anniversary Wishes'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 60,
          background: 'linear-gradient(135deg, #fff7f8 0%, #eef2ff 100%)',
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 700 }}>Anniversary Wishes</div>
        <div style={{ fontSize: 36, lineHeight: 1.3, whiteSpace: 'pre-wrap' }}>{text}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, color: '#6b7280' }}>anniversarywishes.example</div>
          <div
            style={{
              width: 120,
              height: 120,
              background: 'radial-gradient(circle at 30% 30%, #e25a7a22, transparent 60%)',
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

