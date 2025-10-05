type EventName =
  | 'copy_text'
  | 'generate_card_open'
  | 'card_theme_change'
  | 'card_download'
  | 'share_click'
  | 'switch_language'
  | 'related_nav_click'

export async function track(event: EventName, payload: Record<string, unknown> = {}) {
  try {
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload, ts: Date.now() })
    })
  } catch {
    // no-op in MVP
  }
}

