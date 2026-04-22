import { Profile } from '../components/Profile'
import { SnsLinks } from '../components/SnsLinks'
import { EventPreview } from '../components/EventPreview'
import { events } from '../config'
import styles from './TopPage.module.css'

export const TopPage = () => (
  <div className={styles.container}>
    <Profile />
    <SnsLinks />
    <div className={styles.events}>
      {events.map((event) => (
        <EventPreview key={event.id} event={event} />
      ))}
    </div>
  </div>
)
