import type { CategoryData } from '@/lib/types'

const data: CategoryData = {
  slug: 'first-anniversary-wishes',
  title: 'First Anniversary Wishes',
  language: 'en',
  summary: 'Thoughtful wishes to celebrate your very first year together.',
  groups: [
    {
      label: 'Heartfelt',
      items: [
        { id: 'aw-1st-001', text: 'One year down, forever to go. Happy 1st Anniversary!', tags: ['short'] },
        { id: 'aw-1st-002', text: 'Our first year was my favorite adventure. Cheers to many more.', tags: [] },
        { id: 'aw-1st-003', text: 'From day one to year one, I choose you.', tags: ['romantic'] }
      ]
    }
  ],
  faq: [
    { q: 'What to write for a first anniversary?', a: 'Recall a favorite moment from your first year and end with a future wish.' }
  ],
  related: ['anniversary-wishes-for-husband','anniversary-wishes-for-wife']
}

export default data

