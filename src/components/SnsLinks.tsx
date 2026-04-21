import { snsLinks } from '../config'
import { DynamicIcon } from './DynamicIcon'
import styles from './SnsLinks.module.css'

export const SnsLinks = () => (
  <div className={styles.container}>
    {snsLinks.map((link) => (
      <a
        key={link.url}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <DynamicIcon name={link.icon} size={16} />
        <span>{link.label}</span>
      </a>
    ))}
  </div>
)
