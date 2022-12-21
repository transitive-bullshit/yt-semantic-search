'use client'

import * as React from 'react'
import cs from 'clsx'

import { ClearIcon, SearchIcon } from '@/icons/index'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export const SearchOptions: React.FC = () => {
  const { query, onChangeQuery, onClearQuery } = Search.useContainer()

  const queryInputRef = React.useRef<HTMLInputElement>(null)

  const onClickClearQuery = React.useCallback(() => {
    onClearQuery()

    if (queryInputRef.current) {
      queryInputRef.current.focus()
    }
  }, [onClearQuery, queryInputRef])

  React.useEffect(() => {
    if (queryInputRef.current) {
      queryInputRef.current.focus()
    }
  }, [queryInputRef])

  const onSubmit = React.useCallback((event: any) => {
    event.preventDefault()
  }, [])

  return (
    <form className={styles.searchOptions} onSubmit={onSubmit}>
      <div className={cs(styles.field, styles.queryField)}>
        <div className={cs(styles.searchInput)}>
          <SearchIcon className={styles.searchIcon} />

          <input
            type='text'
            name='query'
            id='query'
            placeholder='Search'
            className={cs(styles.input, styles.textInput)}
            value={query}
            onChange={onChangeQuery}
            ref={queryInputRef}
          />

          {query && (
            <div
              className={styles.clearInput}
              onClick={onClickClearQuery}
              aria-hidden='true'
            >
              <ClearIcon className={styles.clearIcon} />
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
