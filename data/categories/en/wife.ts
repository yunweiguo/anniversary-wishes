import type { CategoryData } from '@/lib/types'

const data: CategoryData = {
  slug: 'anniversary-wishes-for-wife',
  title: 'Anniversary Wishes for Wife',
  language: 'en',
  summary: 'Celebrate your wife with sweet, romantic, and grateful words.',
  groups: [
    {
      label: 'Sweet',
      items: [
        { id: 'aww-sw-001', text: 'You make every day brighter. Happy Anniversary, my love.', tags: ['romantic'] },
        { id: 'aww-sw-002', text: 'Still my best decision. Happy Anniversary.', tags: ['short'] },
        { id: 'aww-sw-003', text: 'Thank you for loving me the way you do.', tags: ['romantic'] }
      ]
    },
    {
      label: 'Playful',
      items: [
        { id: 'aww-pl-001', text: 'I love you more than coffee. That’s saying a lot.', tags: ['funny'] },
        { id: 'aww-pl-002', text: 'Another year of me stealing your hoodie. Worth it.', tags: ['funny','short'] }
      ]
    }
  ],
  faq: [
    { q: 'How to write to my wife?', a: 'Be specific, grateful, and affectionate. Add a compliment that only she recognizes.' }
  ],
  related: ['anniversary-wishes-for-husband']
}

export default data

