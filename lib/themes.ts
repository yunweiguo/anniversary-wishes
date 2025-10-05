import type { ThemeDef } from './types'

export const THEMES: ThemeDef[] = [
  {
    id: 'light',
    name: 'Light',
    fonts: { title: 'Playfair Display', body: 'Inter' },
    palette: { bg: '#ffffff', fg: '#1f2937', accent: '#e25a7a' }
  },
  {
    id: 'dark',
    name: 'Dark',
    fonts: { title: 'Playfair Display', body: 'Inter' },
    palette: { bg: '#0f172a', fg: '#f1f5f9', accent: '#93c5fd' }
  },
  {
    id: 'floral',
    name: 'Floral',
    fonts: { title: 'Pacifico', body: 'Inter' },
    palette: { bg: '#fff7f8', fg: '#1a1a1a', accent: '#e25a7a' },
    decorations: ['rose_corner.svg']
  },
  {
    id: 'elegant',
    name: 'Elegant',
    fonts: { title: 'Cinzel', body: 'Inter' },
    palette: { bg: '#f8fafc', fg: '#111827', accent: '#8b5cf6' }
  }
]

export const getTheme = (id?: string) => THEMES.find(t => t.id === id) || THEMES[0]

