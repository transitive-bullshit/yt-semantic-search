import * as React from 'react'
import { AnimatePresence } from 'framer-motion'

import * as types from '@/types'
import { SearchResult } from '@/components/SearchResult/SearchResult'

import styles from './styles.module.css'

export const SearchResultsList: React.FC<{
  results: types.SearchResult[]
}> = ({ results }) => {
  return (
    <div className={styles.searchResultsList}>
      <AnimatePresence mode='popLayout' initial={false}>
        {results.map((result) => (
          <SearchResult key={result.id} result={result} />
        ))}
      </AnimatePresence>
    </div>
  )
}
