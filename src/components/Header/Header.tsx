import * as React from 'react'
import cs from 'clsx'

import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { DarkModeToggle } from '@/components/DarkModeToggle/DarkModeToggle'

import { Logo } from './Logo'
import styles from './styles.module.css'

export const Header: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <header className={cs(styles.header, className)}>
      <div className={styles.navHeader}>
        <ActiveLink
          href='/'
          className={styles.action}
          activeClassName={styles.active}
          aria-label='Logo'
        >
          <Logo />
        </ActiveLink>

        <div className={styles.rhs}>
          <ActiveLink
            href='/about'
            className={styles.action}
            activeClassName={styles.active}
          >
            About
          </ActiveLink>

          <DarkModeToggle className={cs(styles.action, styles.icon)} />
        </div>
      </div>
    </header>
  )
}
