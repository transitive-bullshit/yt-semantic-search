import * as React from 'react'
import cs from 'clsx'

import { DarkModeToggle } from '@/components/DarkModeToggle/DarkModeToggle'
import { GitHub, Twitter } from '@/icons/index'
import { copyright, githubRepoUrl, twitter, twitterUrl } from '@/lib/config'

import styles from './styles.module.css'

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={cs(styles.footer, className)}>
      <div className={styles.copyright}>
        <a href={twitterUrl} target='_blank' rel='noopener noreferrer'>
          {copyright}
        </a>
      </div>

      <div className={styles.settings}>
        <DarkModeToggle className={cs(styles.action, styles.darkModeToggle)} />
      </div>

      <div className={styles.social}>
        <a
          className={cs(styles.twitter, styles.action)}
          href={twitterUrl}
          title={`Twitter ${twitter}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Twitter />
        </a>

        <a
          className={cs(styles.github, styles.action)}
          href={githubRepoUrl}
          title='View source on GitHub'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHub />
        </a>
      </div>
    </footer>
  )
}
