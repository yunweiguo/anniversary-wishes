export type WishItem = {
  id: string
  text: string
  tags?: string[]
  vars?: Array<'name' | 'relation' | 'nth'>
}

export type WishGroup = {
  label: string
  items: WishItem[]
}

export type CategoryData = {
  slug: string
  title: string
  language: 'en' | 'hi'
  summary: string
  groups: WishGroup[]
  faq?: Array<{ q: string; a: string }>
  related?: string[]
}

export type ThemeDef = {
  id: string
  name: string
  fonts: { title: string; body: string }
  palette: { bg: string; fg: string; accent: string }
  decorations?: string[]
}

