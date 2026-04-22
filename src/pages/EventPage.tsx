import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { events } from '../config'
import { EventGallery } from '../components/EventGallery'
import { Lightbox } from '../components/Lightbox'
import styles from './EventPage.module.css'

export const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const event = events.find((e) => e.id === eventId)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!event) {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.back}>← トップに戻る</Link>
        <p className={styles.notFound}>イベントが見つかりません</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>← トップに戻る</Link>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.date}>{event.date}</p>
      {event.description && (
        <p className={styles.description}>{event.description}</p>
      )}
      <EventGallery
        images={event.images}
        title={event.title}
        onImageClick={setLightboxIndex}
      />
      {lightboxIndex !== null && (
        <Lightbox
          images={event.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() =>
            setLightboxIndex((i) => Math.min(event.images.length - 1, (i ?? 0) + 1))
          }
        />
      )}
    </div>
  )
}
