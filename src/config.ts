export interface Profile {
  name: string
  bio: string
  avatar: string
}

export type LucideIconName = keyof typeof import('lucide-react')

export interface SnsLink {
  label: string
  url: string
  icon: LucideIconName
}

export interface Event {
  id: string
  title: string
  /** YYYY.MM format, e.g. "2024.08" */
  date: string
  description: string
  images: string[]
  previewCount: number
}

export const profile: Profile = {
  name: 'るん',
  bio: 'のんびり配信してる、るんです！架空事務所 ぱんなこった1期生兼社長やってます！',
  avatar: '/images/lun.png',
}

export const snsLinks: SnsLink[] = [
  { label: 'Reality', url: 'https://reality.app/profile/cce744e4?adj_t=8ogcewh_z9yhix5', icon: 'Diamond' },
  { label: 'Twitter', url: 'https://x.com/Lun222Lun', icon: 'Twitter' },
  { label: 'Instagram', url: 'https://www.instagram.com/luncone?igsh=dGNkMW9leTluOGNk&utm_source=qr', icon: 'Instagram' },
]

export const events: Event[] = [
  {
    id: 'debut-party',
    title: 'デビューパーティー（画像準備中）',
    date: '2026.04',
    description: '',
    images: [
      // '/images//01.jpg',
    ],
    previewCount: 3,
  },{
    id: 'one-day',
    title: 'ワンデイ（画像準備中）',
    date: '2026.03',
    description: '',
    images: [
      // '/images//01.jpg',
    ],
    previewCount: 3,
  }
]
