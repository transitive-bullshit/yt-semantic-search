'use client'

import * as React from 'react'
import cs from 'clsx'

import { Moon, Sun } from '@/icons'
import { useTheme } from '@/lib/hooks/use-theme'

import styles from './styles.module.css'

export const DarkModeToggle: React.FC<{ className?: string }> = ({
  className
}) => {
  // const { isDarkMode } = useTheme()
  // TODO
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      className={cs(styles.toggleDarkMode, className)}
      aria-label='Toggle dark mode'
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  )
}
