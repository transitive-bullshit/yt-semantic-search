import * as React from 'react'
import cs from 'clsx'

import styles from './styles.module.css'

/**
 * `content` is assumed to have already been transformed into HTML via remark/rehype.
 */
export const Markdown: React.FC<{ className?: string; content: string }> = ({
  className,
  content
}) => {
  return (
    <div
      className={cs('prose dark:prose-invert', styles.markdown, className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
