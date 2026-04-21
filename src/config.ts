export interface Profile {
  name: string
  bio: string
  avatar: string
}

export interface SnsLink {
  label: string
  url: string
  icon: string
}

export interface Event {
  id: string
  title: string
  date: string
  description: string
  images: string[]
  previewCount: number
}

export const profile: Profile = {
  name: 'なまえ',
  bio: 'ひとことじこしょうかい。よろしくね🍊',
  avatar: '/images/avatar.jpg',
}

export const snsLinks: SnsLink[] = [
  { label: 'X (Twitter)', url: 'https://x.com/', icon: 'Twitter' },
  { label: 'Instagram', url: 'https://instagram.com/', icon: 'Instagram' },
  { label: 'GitHub', url: 'https://github.com/', icon: 'Github' },
]

export const events: Event[] = [
  {
    id: 'sample-event',
    title: 'サンプルイベント',
    date: '2024.08',
    description: 'イベントの説明をここに書く。',
    images: [
      '/images/sample-event/01.jpg',
      '/images/sample-event/02.jpg',
      '/images/sample-event/03.jpg',
    ],
    previewCount: 3,
  },
]
