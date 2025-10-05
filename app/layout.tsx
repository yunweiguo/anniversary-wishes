import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter, Playfair_Display } from 'next/font/google'
import SiteNav from '@/components/SiteNav'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  metadataBase: new URL('https://wishwala.info'),
  title: {
    default: 'Anniversary Wishes — Cards & Captions',
    template: '%s | Anniversary Wishes'
  },
  description: 'Curated anniversary wishes, captions, and shareable cards. Generate 1080×1080/1920 images in one tap.',
  applicationName: 'Anniversary Wishes',
  keywords: ['anniversary wishes', 'anniversary captions', 'card maker', 'wishes for husband', 'hindi anniversary wishes'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  },
  alternates: {
    languages: {
      'en-IN': '/',
      'hi-IN': '/hi'
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  openGraph: {
    type: 'website',
    title: 'Anniversary Wishes — Cards & Captions',
    description: 'Curated wishes, captions, and instant cards to copy, download, and share.',
    url: 'https://wishwala.info/',
    siteName: 'Anniversary Wishes'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anniversary Wishes — Cards & Captions',
    description: 'Curated wishes, captions, and instant cards to copy, download, and share.'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-10%,#fce7f3_0%,rgba(255,255,255,0)_60%),radial-gradient(1000px_500px_at_-10%_110%,#e0e7ff_0%,rgba(255,255,255,0)_60%)] text-slate-900">
        <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <div className="container flex h-14 items-center justify-between">
            <Link href="/" className="font-serif text-lg font-semibold tracking-tight">Anniversary Wishes</Link>
            <nav className="flex items-center gap-4 text-sm">
              <SiteNav />
            </nav>
          </div>
        </header>
        <main className="container py-8">
          {children}
        </main>
        <footer className="border-t py-8 text-sm text-slate-500">
          <div className="container flex flex-wrap items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Anniversary Wishes</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/sitemap.xml">Sitemap</a>
              <a href="/image-sitemap.xml">Image Sitemap</a>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <span className="text-slate-400">|</span>
              <Link href="/anniversary-wishes">EN</Link>
              <Link href="/hindi-anniversary-wishes">HI</Link>
            </div>
          </div>
        </footer>
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}` }} />
      </body>
    </html>
  )
}
