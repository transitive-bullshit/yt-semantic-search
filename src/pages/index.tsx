import * as React from 'react'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
import { SearchOptions } from '@/components/SearchOptions/SearchOptions'
import { SearchResults } from '@/components/SearchResults/SearchResults'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export default function HomePage() {
  return (
    <Search.Provider>
      <Layout>
        <PageHead />

        <div className={styles.homePage}>
          <div className={styles.body}>
            <SearchOptions />

            <SearchResults />
          </div>
        </div>
      </Layout>
    </Search.Provider>
  )
}
