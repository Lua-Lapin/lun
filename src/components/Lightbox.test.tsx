import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { imagePath } from '../utils/imagePath'
import { Lightbox } from './Lightbox'

const images = ['/img/01.jpg', '/img/02.jpg', '/img/03.jpg']
const defaultProps = {
  images,
  currentIndex: 1,
  onClose: vi.fn(),
  onPrev: vi.fn(),
  onNext: vi.fn(),
}

describe('Lightbox', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('現在の画像を表示する', () => {
    render(<Lightbox {...defaultProps} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', imagePath('/img/02.jpg'))
  })

  it('オーバーレイクリックで onClose を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.click(screen.getByTestId('lightbox-overlay'))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('Escape キーで onClose を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.keyboard('{Escape}')
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('← ボタンクリックで onPrev を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.click(screen.getByLabelText('前の画像'))
    expect(defaultProps.onPrev).toHaveBeenCalled()
  })

  it('→ ボタンクリックで onNext を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.click(screen.getByLabelText('次の画像'))
    expect(defaultProps.onNext).toHaveBeenCalled()
  })

  it('最初の画像では ← ボタンを表示しない', () => {
    render(<Lightbox {...defaultProps} currentIndex={0} />)
    expect(screen.queryByLabelText('前の画像')).not.toBeInTheDocument()
  })

  it('最後の画像では → ボタンを表示しない', () => {
    render(<Lightbox {...defaultProps} currentIndex={2} />)
    expect(screen.queryByLabelText('次の画像')).not.toBeInTheDocument()
  })

  it('最初の画像で ArrowLeft キーを押しても onPrev を呼ばない', async () => {
    render(<Lightbox {...defaultProps} currentIndex={0} />)
    await userEvent.keyboard('{ArrowLeft}')
    expect(defaultProps.onPrev).not.toHaveBeenCalled()
  })

  it('最後の画像で ArrowRight キーを押しても onNext を呼ばない', async () => {
    render(<Lightbox {...defaultProps} currentIndex={2} />)
    await userEvent.keyboard('{ArrowRight}')
    expect(defaultProps.onNext).not.toHaveBeenCalled()
  })
})
