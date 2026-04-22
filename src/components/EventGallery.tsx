import { imagePath } from '../utils/imagePath'
import styles from './EventGallery.module.css'

interface Props {
  images: string[]
  title: string
  onImageClick: (index: number) => void
}

export const EventGallery = ({ images, title, onImageClick }: Props) => (
  <div className={styles.grid}>
    {images.map((src, i) => (
      <img
        key={i}
        src={imagePath(src)}
        alt={`${title} ${i + 1}`}
        className={styles.image}
        onClick={() => onImageClick(i)}
      />
    ))}
  </div>
)
