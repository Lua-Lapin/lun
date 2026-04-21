import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { EventPreview } from './EventPreview'
import type { Event } from '../config'

const mockEvent: Event = {
  id: 'test-event',
  title: 'テストイベント',
  date: '2024.08',
  description: 'テスト説明',
  images: ['/img/01.jpg', '/img/02.jpg', '/img/03.jpg', '/img/04.jpg'],
  previewCount: 3,
}

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>)

describe('EventPreview', () => {
  it('イベントタイトルを表示する', () => {
    renderWithRouter(<EventPreview event={mockEvent} />)
    expect(screen.getByText('テストイベント')).toBeInTheDocument()
  })

  it('previewCount 枚だけ画像を表示する', () => {
    renderWithRouter(<EventPreview event={mockEvent} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(3)
  })

  it('「もっと見る」リンクが /album/:eventId を指す', () => {
    renderWithRouter(<EventPreview event={mockEvent} />)
    const link = screen.getByText(/もっと見る/)
    expect(link.closest('a')).toHaveAttribute('href', '/album/test-event')
  })
})
