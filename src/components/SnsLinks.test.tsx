import { render, screen } from '@testing-library/react'
import { SnsLinks } from './SnsLinks'

describe('SnsLinks', () => {
  it('config のリンクをすべて表示する', () => {
    render(<SnsLinks />)
    expect(screen.getByText('X (Twitter)')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('リンクは新しいタブで開く', () => {
    render(<SnsLinks />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('リンクの href が config の url と一致する', () => {
    render(<SnsLinks />)
    const twitterLink = screen.getByText('X (Twitter)').closest('a')
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/')
  })
})
