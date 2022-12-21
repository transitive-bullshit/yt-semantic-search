import * as React from 'react'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { bootstrap } from '@/lib/bootstrap'
import { isServer } from '@/lib/config'

import './globals.css'

if (!isServer) {
  bootstrap()
}

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
      </Head>

      <Component {...pageProps} />

      <Analytics />
    </>
  )
}
