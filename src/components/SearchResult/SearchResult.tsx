import * as React from 'react'
import cs from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import prettyMilliseconds from 'pretty-ms'

import * as types from '@/types'

import styles from './styles.module.css'

export const SearchResult: React.FC<{
  result: types.SearchResult
  className?: string
}> = React.forwardRef(function SearchResult({ result, className }, ref) {
  const time = result.metadata.start.split('.')[0]
  const youtubeUrl = `https://youtube.com/watch?v=${result.metadata.videoId}&t=${time}`
  const prettyTime = prettyMilliseconds(parseFloat(time) * 1000, {
    colonNotation: true
  })

  return (
    <motion.div
      className={cs(styles.searchResult, className)}
      initial={{ scale: 0, translateY: -50 }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{ scale: 0, translateY: 50 }}
      ref={ref as any}
    >
      <div className={styles.lhs}>
        <Link
          href={youtubeUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='YouTube'
          className={cs('link', styles.title)}
        >
          <h3>
            {result.metadata.title}{' '}
            <span className={styles.offset}>@ {prettyTime}</span>
          </h3>
        </Link>

        <p dangerouslySetInnerHTML={{ __html: result.matchedHtml }} />
      </div>

      {result.metadata.thumbnail && (
        <Link
          href={youtubeUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='YouTube'
          className={styles.frame}
        >
          <Image
            className={styles.thumbnail}
            src={result.metadata.thumbnail}
            alt={`YouTube ${result.metadata.title}`}
            width={640}
            height={360}
            unoptimized
            placeholder='blur'
            blurDataURL={result.metadata.preview}
          />

          <div className={styles.overlay}>
            <div className={styles.youtubeButton} />
          </div>
        </Link>
      )}
    </motion.div>
  )
})
