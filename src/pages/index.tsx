import * as React from 'react'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
// import { QueryParamProvider } from '@/components/QueryParamProvider/QueryParamProvider'
import { SearchOptions } from '@/components/SearchOptions/SearchOptions'
import { SearchResults } from '@/components/SearchResults/SearchResults'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export default function HomePage() {
  return (
    <Layout>
      <PageHead />

      <div className={styles.homePage}>
        <div className={styles.body}>
          {/* <QueryParamProvider> */}
          <Search.Provider>
            <SearchOptions />

            <SearchResults />
          </Search.Provider>
          {/* </QueryParamProvider> */}
        </div>
      </div>
    </Layout>
  )
}
