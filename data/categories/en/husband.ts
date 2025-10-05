import type { CategoryData } from '@/lib/types'

const data: CategoryData = {
  slug: 'anniversary-wishes-for-husband',
  title: 'Anniversary Wishes for Husband',
  language: 'en',
  summary: 'Heartfelt, romantic, and playful anniversary wishes to celebrate your husband and your journey together.',
  groups: [
    {
      label: 'Romantic',
      items: [
        { id: 'awh-rom-001', text: 'To my {relation}, here’s to another year of us. Happy {nth} Anniversary!', tags: ['romantic','short'], vars: ['relation','nth'] },
        { id: 'awh-rom-002', text: 'Forever my favorite hello, {name}. Happy Anniversary.', tags: ['romantic'], vars: ['name'] },
        { id: 'awh-rom-003', text: 'You are my always. Cheers to our love, today and always.', tags: ['romantic'] },
        { id: 'awh-rom-004', text: 'No matter the year, it’s always you. Happy anniversary, love.', tags: ['romantic','short'] }
      ]
    },
    {
      label: 'Funny',
      items: [
        { id: 'awh-fun-001', text: 'Thanks for doing life and dishes with me. Happy Anniversary!', tags: ['funny'] },
        { id: 'awh-fun-002', text: 'Another year of me stealing your fries. Worth it. Happy Anniversary!', tags: ['funny','short'] },
        { id: 'awh-fun-003', text: 'Love you more than pizza. Okay, equal to pizza. Happy Anniversary!', tags: ['funny'] }
      ]
    },
    {
      label: 'Short',
      items: [
        { id: 'awh-sh-001', text: 'Us. Always. Happy Anniversary.', tags: ['short'] },
        { id: 'awh-sh-002', text: 'You + Me = Forever. ❤️', tags: ['short'] },
        { id: 'awh-sh-003', text: 'Still my favorite person.', tags: ['short'] }
      ]
    }
  ],
  faq: [
    { q: 'What do I write in an anniversary card for my husband?', a: 'Keep it authentic. Mention a shared memory, express gratitude, and add a promise for the future.' },
    { q: 'Can I be funny in an anniversary message?', a: 'Yes—humor feels personal. Keep it sweet and light, and avoid inside jokes others won’t get if you plan to share.' }
  ],
  related: [
    'funny-anniversary-wishes-for-husband',
    'romantic-anniversary-wishes-for-husband',
    'anniversary-wishes-for-wife'
  ]
}

export default data

