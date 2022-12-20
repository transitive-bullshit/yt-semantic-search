import * as React from 'react'
import cs from 'clsx'

import { SpinnerIcon } from '@/icons'

import styles from './styles.module.css'

export const Button: React.FC<
  {
    className?: string
    buttonClassName?: string
    children: React.ReactNode
    isLoading?: boolean
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  className,
  buttonClassName,
  children,
  style,
  isLoading,
  ...buttonProps
}) => {
  return (
    <div className={cs(styles.buttonWrapper, className)} style={style}>
      <button className={cs(styles.button, buttonClassName)} {...buttonProps}>
        <div className={styles.buttonContent}>
          {isLoading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
          {children}
        </div>
      </button>
    </div>
  )
}
