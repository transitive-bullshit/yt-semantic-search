import * as React from 'react'
import cs from 'clsx'

import styles from './styles.module.css'

export type HeroButtonVariant = 'orange' | 'blue' | 'purple'

export const HeroButton: React.FC<
  {
    variant?: HeroButtonVariant
    className?: string
    buttonClassName?: string
    children: React.ReactNode
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  variant = 'purple',
  className,
  buttonClassName,
  children,
  style,
  ...buttonProps
}) => {
  return (
    <div className={cs(styles.heroButtonWrapper, className)} style={style}>
      {variant === 'blue' && (
        <span className={cs(styles.heroButtonBg, styles.heroButtonBg1)} />
      )}

      {variant === 'purple' && (
        <span className={cs(styles.heroButtonBg, styles.heroButtonBg2)} />
      )}

      {variant === 'orange' && (
        <span className={cs(styles.heroButtonBg, styles.heroButtonBg3)} />
      )}

      <button
        className={cs(styles.heroButton, buttonClassName)}
        {...buttonProps}
      >
        <div className={styles.heroButtonContent}>{children}</div>
      </button>
    </div>
  )
}
