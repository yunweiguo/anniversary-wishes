"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet'
import { Button } from '@/app/components/ui/button'
import { ALL_CATEGORY_SLUGS, CATEGORIES } from '@/lib/data'

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const cats = ALL_CATEGORY_SLUGS.map((s) => CATEGORIES[s])
  const featured = [
    'anniversary-wishes-for-husband',
    'anniversary-wishes-for-wife',
    'first-anniversary-wishes',
    'hindi-anniversary-wishes',
  ]
    .map((s) => CATEGORIES[s])
    .filter(Boolean)

  return (
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-3 md:flex">
        <Link href="/" className="rounded px-3 py-1 hover:bg-slate-50">Home</Link>
        <Link href="/anniversary-wishes" className="rounded px-3 py-1 hover:bg-slate-50">Overview</Link>
        <Link href="/anniversary-wishes-images" className="rounded px-3 py-1 hover:bg-slate-50">Images</Link>
        <Link href="/anniversary-card-maker" className="rounded px-3 py-1 hover:bg-slate-50">Card Maker</Link>
        <span className="mx-1 text-slate-300">|</span>
        {featured.map((c) => (
          <Link key={c!.slug} href={`/${c!.slug}`} className="rounded px-3 py-1 hover:bg-slate-50">
            {c!.title}
          </Link>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden">Menu</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 space-y-2 text-sm">
            <Link onClick={() => setOpen(false)} href="/" className="block rounded px-3 py-2 hover:bg-slate-50">Home</Link>
            <Link onClick={() => setOpen(false)} href="/anniversary-wishes" className="block rounded px-3 py-2 hover:bg-slate-50">Overview</Link>
            <Link onClick={() => setOpen(false)} href="/anniversary-wishes-images" className="block rounded px-3 py-2 hover:bg-slate-50">Images</Link>
            <Link onClick={() => setOpen(false)} href="/anniversary-card-maker" className="block rounded px-3 py-2 hover:bg-slate-50">Card Maker</Link>
            <div className="my-2 h-px bg-slate-200" />
            {cats.map((c) => (
              <Link key={c.slug} onClick={() => setOpen(false)} href={`/${c.slug}`} className="block rounded px-3 py-2 hover:bg-slate-50">
                {c.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

