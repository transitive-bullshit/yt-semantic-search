'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'

import { useTheme } from '@/lib/hooks/use-theme'
import LogoDark from '@/public/logo-dark.png'
import LogoLight from '@/public/logo-light.png'

import styles from './styles.module.css'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const { isDarkMode } = useTheme()

  return isDarkMode ? (
    <Image
      className={cs(styles.logo, className)}
      src={LogoDark.src}
      alt='Logo'
      width={LogoDark.width}
      height={LogoDark.height}
    />
  ) : (
    <Image
      className={cs(styles.logo, className)}
      src={LogoLight.src}
      alt='Logo'
      width={LogoLight.width}
      height={LogoLight.height}
    />
  )
}
