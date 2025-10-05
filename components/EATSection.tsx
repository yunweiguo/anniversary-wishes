export default function EATSection() {
  const updated = new Date().toISOString().split('T')[0]
  return (
    <section className="mt-8 rounded-lg border bg-white p-6 text-sm text-slate-700">
      <h2 className="mb-2 text-xl font-semibold tracking-tight">About This Page</h2>
      <p className="mb-2">Curated by our editorial team with a focus on originality, clarity, and cultural sensitivity. We avoid offensive content and keep examples fresh.</p>
      <p className="mb-2">Editorial Guidelines: concise, kind, and context-aware; avoid clichés; include romantic, funny, and short variants.</p>
      <p className="mb-2">Reviewer: In‑house editor. Last updated: {updated}.</p>
    </section>
  )
}

