import * as React from 'react'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'

import styles from './styles.module.css'

export default function HomePage() {
  return (
    <Layout>
      <PageHead />

      <div className={styles.homePage}>TODO</div>
    </Layout>
  )
}
