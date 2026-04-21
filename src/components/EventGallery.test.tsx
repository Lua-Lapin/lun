import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventGallery } from './EventGallery'

const images = ['/img/01.jpg', '/img/02.jpg', '/img/03.jpg']

describe('EventGallery', () => {
  it('すべての画像を表示する', () => {
    render(<EventGallery images={images} title="テスト" onImageClick={() => {}} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('画像クリックで正しいインデックスを渡す', async () => {
    const onImageClick = vi.fn()
    render(<EventGallery images={images} title="テスト" onImageClick={onImageClick} />)
    const imgs = screen.getAllByRole('img')
    await userEvent.click(imgs[1])
    expect(onImageClick).toHaveBeenCalledWith(1)
  })
})
