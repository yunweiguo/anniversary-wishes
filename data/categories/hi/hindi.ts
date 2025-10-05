import type { CategoryData } from '@/lib/types'

const data: CategoryData = {
  slug: 'hindi-anniversary-wishes',
  title: 'Hindi Anniversary Wishes',
  language: 'hi',
  summary: 'Anniversary wishes in Hindi: simple, sweet, and heartfelt lines.',
  groups: [
    {
      label: 'हिंदी शुभकामनाएँ',
      items: [
        { id: 'hi-001', text: 'साथ जन्मों का वादा, सालगिरह की ढेरों बधाई।', tags: ['short'] },
        { id: 'hi-002', text: 'तेरे बिना क्या जीना, सालगिरह मुबारक हो जान।', tags: ['romantic'] },
        { id: 'hi-003', text: 'मुस्कुराहट तेरी सबसे प्यारी, आज का दिन है बहुत ही न्यारा।', tags: [] }
      ]
    }
  ],
  faq: [
    { q: 'सालगिरह के कार्ड में क्या लिखें?', a: 'दिल की बात लिखें—एक याद, धन्यवाद, और आने वाले कल की उम्मीद।' }
  ],
  related: ['anniversary-wishes-for-husband','anniversary-wishes-for-wife']
}

export default data

