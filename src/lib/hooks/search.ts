'use client'

import * as React from 'react'
import { dequal } from 'dequal/lite'
import { useRouter } from 'next/router'
import { useDebounce } from 'react-use'
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
  const router = useRouter()
  const [query, setQuery] = React.useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = React.useState('')

  React.useEffect(() => {
    const url = new URL(window.location.href)
    const query = url.searchParams.get('query')
    if (query) {
      setQuery(query)
      setDebouncedQuery(query)
    }
  }, [])

  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    500,
    [query]
  )

  const body = React.useMemo<types.SearchQuery>(
    () => ({
      query: debouncedQuery,
      limit: 10
    }),
    [debouncedQuery]
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
      keepPreviousData: false,
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
    setDebouncedQuery('')
  }, [])

  // Update local query state if the route reset the query
  React.useEffect(() => {
    if (!router.query.query && debouncedQuery) {
      setQuery('')
      setDebouncedQuery('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  // Update the route's searchParams to match local query state
  React.useEffect(() => {
    const newQuery = {
      ...router.query,
      query: debouncedQuery
    }

    if (!debouncedQuery) {
      delete newQuery.query
    }

    if (!dequal(router.query, newQuery)) {
      router.replace(
        { pathname: router.pathname, query: newQuery },
        { pathname: router.pathname, query: newQuery },
        { shallow: true }
      )
    }
  }, [router, debouncedQuery])

  const isEmpty = results && !results.length

  return {
    results,

    query,
    debouncedQuery,
    onChangeQuery,
    onClearQuery,

    setQuery,
    setDebouncedQuery,

    error,
    isEmpty,
    isLoading,
    isValidating
  }
}

export const Search = createContainer(useSearch)
