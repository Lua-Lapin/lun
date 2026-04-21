import { render, screen } from '@testing-library/react'
import { Profile } from './Profile'

describe('Profile', () => {
  it('名前を表示する', () => {
    render(<Profile />)
    expect(screen.getByText('なまえ')).toBeInTheDocument()
  })

  it('自己紹介を表示する', () => {
    render(<Profile />)
    expect(screen.getByText(/ひとことじこしょうかい/)).toBeInTheDocument()
  })

  it('アバター画像を表示する', () => {
    render(<Profile />)
    const img = screen.getByRole('img', { name: 'なまえ' })
    expect(img).toHaveAttribute('src', '/images/avatar.jpg')
  })
})
