import { useEffect } from 'react'
import styles from './Lightbox.module.css'

interface Props {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onPrev()
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <div
      className={styles.overlay}
      data-testid="lightbox-overlay"
      onClick={onClose}
    >
      <img
        src={images[currentIndex]}
        alt={`image ${currentIndex + 1}`}
        className={styles.image}
        onClick={(e) => e.stopPropagation()}
      />
      {currentIndex > 0 && (
        <button
          className={`${styles.nav} ${styles.prev}`}
          aria-label="前の画像"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >
          ‹
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          className={`${styles.nav} ${styles.next}`}
          aria-label="次の画像"
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >
          ›
        </button>
      )}
    </div>
  )
}
