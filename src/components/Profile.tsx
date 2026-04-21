import { profile } from '../config'
import styles from './Profile.module.css'

export const Profile = () => (
  <div className={styles.container}>
    <img
      src={profile.avatar}
      alt={profile.name}
      className={styles.avatar}
    />
    <h1 className={styles.name}>{profile.name}</h1>
    <p className={styles.bio}>{profile.bio}</p>
  </div>
)
