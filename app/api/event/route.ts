import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // eslint-disable-next-line no-console
    console.log('[event]', data?.event, data?.payload)
  } catch {}
  return new NextResponse(null, { status: 204 })
}

