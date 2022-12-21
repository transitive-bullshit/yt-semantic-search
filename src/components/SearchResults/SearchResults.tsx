'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

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

  let content: React.ReactNode

  if ((isEmpty || !results) && !debouncedQuery) {
    content = <EmptyQuery />
  } else if (isLoading) {
    content = (
      <div className={styles.detail}>
        <LoadingSpinner loading={isLoading} />
      </div>
    )
  } else if (results) {
    if (isEmpty) {
      content = <EmptyResults />
    } else {
      content = <SearchResultsList results={results} />
    }
  }

  return <div className={cs(styles.searchResults)}>{content}</div>
}

export const EmptyQuery: React.FC = () => {
  const { setQuery, setDebouncedQuery } = Search.useContainer()

  const fakeNavigation = React.useCallback(
    (query: string) => {
      // router.push({
      //   pathname: '/',
      //   query: {
      //     query
      //   }
      // })
      setQuery(query)
      setDebouncedQuery(query)
    },
    [setQuery, setDebouncedQuery]
  )

  return (
    <div className={styles.emptyResults}>
      <p>Search any topic the besties have covered on the pod.</p>

      <p>
        Examples:{' '}
        <Link
          className='link'
          href='/?query=sweater+karen'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('sweater karen')
          }}
        >
          sweater karen
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=great+poker+story'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('great poker story')
          }}
        >
          great poker story
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=crypto'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('crypto')
          }}
        >
          crypto
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=science+corner'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('science corner')
          }}
        >
          science corner
        </Link>
      </p>

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
