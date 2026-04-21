import { render, screen } from '@testing-library/react'
import { DynamicIcon } from './DynamicIcon'

describe('DynamicIcon', () => {
  it('既知のアイコン名で SVG をレンダリングする', () => {
    const { container } = render(<DynamicIcon name="Github" data-testid="icon" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('未知のアイコン名では何もレンダリングしない', () => {
    const { container } = render(<DynamicIcon name="UnknownIconXyz" />)
    expect(container.firstChild).toBeNull()
  })
})
