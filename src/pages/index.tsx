import * as React from 'react'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
import { SearchOptions } from '@/components/SearchOptions/SearchOptions'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export default function HomePage() {
  return (
    <Layout>
      <PageHead />

      <div className={styles.homePage}>
        <div className={styles.body}>
          <Search.Provider>
            <SearchOptions />
          </Search.Provider>
        </div>
      </div>
    </Layout>
  )
}
