'use client'

import * as React from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from 'next-themes'

export function RootLayoutProviders({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion='user'>{children}</MotionConfig>
    </ThemeProvider>
  )
}
