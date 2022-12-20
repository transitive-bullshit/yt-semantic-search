'use client'

import * as React from 'react'
import Loader from 'react-spinners/BeatLoader'

import { useTheme } from '@/lib/hooks/use-theme'

import styles from './styles.module.css'

export const LoadingSpinner: React.FC<{ loading?: boolean }> = ({
  loading = true
}) => {
  const { isDarkMode } = useTheme()

  return (
    <Loader
      loading={loading}
      color={isDarkMode ? '#fff' : '#24292f'}
      className={styles.loading}
    />
  )
}
