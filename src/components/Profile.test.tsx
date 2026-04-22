import { render, screen } from '@testing-library/react'
import { profile } from '../config'
import { imagePath } from '../utils/imagePath'
import { Profile } from './Profile'

describe('Profile', () => {
  it('名前を表示する', () => {
    render(<Profile />)
    expect(screen.getByText(profile.name)).toBeInTheDocument()
  })

  it('自己紹介を表示する', () => {
    render(<Profile />)
    expect(screen.getByText(profile.bio)).toBeInTheDocument()
  })

  it('アバター画像を表示する', () => {
    render(<Profile />)
    const img = screen.getByRole('img', { name: profile.name })
    expect(img).toHaveAttribute('src', imagePath(profile.avatar))
  })
})
