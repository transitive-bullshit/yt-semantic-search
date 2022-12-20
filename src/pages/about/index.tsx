import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import * as config from '@/lib/config'
import { Layout } from '@/components/Layout/Layout'
import { Markdown } from '@/components/Markdown/Markdown'
import { markdownToHtml } from '@/server/markdown-to-html'

import styles from './styles.module.css'

const markdownContent = `
## About

TODO

## License

This project is [open source](${config.githubRepoUrl}). MIT © [${config.author}](${config.twitterUrl})

Support my open source work by [sponsoring me](${config.githubSponsorsUrl}) or <a href="${config.twitterUrl}">following me on twitter</a>.

The [All-In Podcast](https://www.allinpodcast.co/) is owned and operated by [Chamath Palihapitiya](https://twitter.com/chamath), [Jason Calacanis](https://twitter.com/jason), [David Sacks](https://twitter.com/DavidSacks), and [David Friedberg](https://twitter.com/friedberg).

This webapp is not associated with the All-In Podcast in any way. It just pulls transcripts and metadata from their amazing [YouTube channel](https://www.youtube.com/channel/UCESLZhusAkFfsNsApnjF_Cg) and processes it using AI.
`

export default function AboutPage({
  content
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className={styles.aboutPage}>
        <div className={styles.meta}>
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.detail}>
            By{' '}
            <a
              className='link'
              href={config.twitterUrl}
              title={`Twitter ${config.twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Travis Fischer
            </a>
          </p>
        </div>

        <Markdown content={content} />
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const content = await markdownToHtml(markdownContent)

  return {
    props: {
      content
    }
  }
}
