import { Link } from 'react-router-dom'
import type { Event } from '../config'
import styles from './EventPreview.module.css'

interface Props {
  event: Event
}

export const EventPreview = ({ event }: Props) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <span className={styles.title}>{event.title}</span>
      <span className={styles.date}>{event.date}</span>
    </div>
    <div className={styles.thumbnails}>
      {event.images.slice(0, event.previewCount).map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${event.title} ${i + 1}`}
          className={styles.thumbnail}
        />
      ))}
    </div>
    <Link to={`/album/${event.id}`} className={styles.more}>
      もっと見る →
    </Link>
  </div>
)
