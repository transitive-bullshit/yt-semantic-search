'use client'

import * as React from 'react'
import cs from 'clsx'

import { useTheme } from '@/lib/hooks/use-theme'

import styles from './styles.module.css'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const { isDarkMode } = useTheme()

  return isDarkMode ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cs(styles.logo, className)}
      src='/logo-dark.png'
      alt='Logo'
      width={1549}
      height={364}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cs(styles.logo, className)}
      src='/logo-light.png'
      alt='Logo'
      width={1549}
      height={364}
    />
  )
}
