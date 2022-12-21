import { useRouter } from 'next/router'
import React from 'react'
import { QueryParamProvider as ContextProvider } from 'use-query-params'

import * as config from '@/lib/config'

export const QueryParamProviderComponent = (props: {
  children?: React.ReactNode
}) => {
  const { children, ...rest } = props
  const router = useRouter()
  const match = router.asPath.match(/[^?]+/)
  const pathname = match ? match[0] : router.asPath

  const location = React.useMemo(
    () =>
      !config.isServer
        ? window.location
        : ({
            search: router.asPath.replace(/[^?]+/u, '')
          } as Location),
    [router.asPath]
  )

  const history = React.useMemo(
    () => ({
      push: ({ search }: Location) =>
        router.push(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true }
        ),
      replace: ({ search }: Location) =>
        router.replace(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true }
        )
    }),
    [pathname, router]
  )

  return (
    <ContextProvider {...rest} history={history} location={location}>
      {children}
    </ContextProvider>
  )
}

export const QueryParamProvider = React.memo(QueryParamProviderComponent)
