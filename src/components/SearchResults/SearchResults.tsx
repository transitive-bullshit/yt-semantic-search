'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'

import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { SearchResultsList } from '@/components/SearchResultsList/SearchResultsList'
import { Search } from '@/lib/hooks/search'
import socialImage from '@/public/social.jpg'

import styles from './styles.module.css'

export const SearchResults: React.FC = () => {
  const { results, debouncedQuery, error, isEmpty, isLoading } =
    Search.useContainer()

  if (error) {
    return <div>Error loading results</div>
  }

  return (
    <div className={cs(styles.searchResults)}>
      {isLoading ? (
        <div className={styles.detail}>
          <LoadingSpinner loading={isLoading} />
        </div>
      ) : (
        results &&
        (isEmpty && !isLoading ? (
          !debouncedQuery ? (
            <EmptyQuery />
          ) : (
            <EmptyResults />
          )
        ) : (
          <SearchResultsList results={results} />
        ))
      )}
    </div>
  )
}

export const EmptyQuery: React.FC = () => {
  return (
    <div className={styles.emptyResults}>
      <p>Search any topic the besties have covered on the pod.</p>

      <div className={styles.socialImageWrapper}>
        <Image
          className={styles.socialImage}
          src={socialImage.src}
          alt='Search the All-In Podcast using AI-powered semantic search.'
          width={socialImage.width}
          height={socialImage.height}
          placeholder='blur'
          blurDataURL={socialImage.blurDataURL}
        />
      </div>
    </div>
  )
}

export const EmptyResults: React.FC = () => {
  return (
    <div className={styles.emptyResults}>
      <p>No results found. Try broadening your search.</p>
    </div>
  )
}
