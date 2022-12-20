'use client'

import * as React from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from 'next-themes'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'

export function RootLayoutProviders({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion='user'>
        <YouTubeDialog>{children}</YouTubeDialog>
      </MotionConfig>
    </ThemeProvider>
  )
}
