'use client'

import * as React from 'react'
import useSWR from 'swr'
import { createContainer } from 'unstated-next'

import * as types from '@/types'

const fetcher = ({
  url,
  body
}: {
  url: string
  body: types.SearchQuery
}): Promise<types.SearchResult[]> =>
  fetch(
    `${url}?${new URLSearchParams({
      query: body.query,
      limit: body.limit ? `${body.limit}` : undefined
    })}`
  ).then((res) => res.json())

function useSearch() {
  const [query, setQuery] = React.useState<string>()

  const body = React.useMemo<types.SearchQuery>(
    () => ({
      query,
      limit: 10
    }),
    [query]
  )

  const {
    data: results,
    error,
    isLoading,
    isValidating
  } = useSWR<types.SearchResult[], Error>(
    {
      url: '/api/search',
      body
    },
    fetcher,
    {
      keepPreviousData: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 24 * 60 * 1000
    }
  )

  const onChangeQuery = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    []
  )

  const onClearQuery = React.useCallback(() => {
    setQuery('')
  }, [])

  const isEmpty = results && !results.length

  return {
    results,

    query,
    onChangeQuery,
    onClearQuery,

    error,
    isEmpty,
    isLoading,
    isValidating
  }
}

export const Search = createContainer(useSearch)
