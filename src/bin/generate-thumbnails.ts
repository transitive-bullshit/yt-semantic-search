import * as fs from 'node:fs/promises'

import { Storage } from '@google-cloud/storage'
import pMap from 'p-map'
import { PineconeClient } from 'pinecone-client'

import * as types from '@/server/types'
import '@/server/config'
import { getThumbnailsForVideo } from '@/server/thumbnails'

async function main() {
  const pinecone = new PineconeClient<types.PineconeCaptionMetadata>({
    apiKey: process.env.PINECONE_API_KEY,
    baseUrl: process.env.PINECONE_BASE_URL,
    namespace: process.env.PINECONE_NAMESPACE
  })

  // const videoId = 'RDdjA4yJy88'
  // const timestamps = ['88', '150', '300', '350', '700', '1080']

  const playlistId = process.env.YOUTUBE_PLAYLIST_ID
  const playlistDetailsWithTranscripts: types.PlaylistDetailsWithTranscripts =
    JSON.parse(await fs.readFile(`out/${playlistId}.json`, 'utf-8'))

  const storage = new Storage()
  const bucket = process.env.GOOGLE_STORAGE_BUCKET

  await pMap(
    playlistDetailsWithTranscripts.playlistItems,
    async (playlistItem) => {
      const videoId = playlistItem.contentDetails.videoId
      if (!videoId) return

      try {
        // TODO: figure out a better way to fetch all vectors with this videoId
        const ids = Array.from(Array(1000).keys()).map(
          (_, i) => `${videoId}:${i}`
        )

        const { vectors } = await pinecone.fetch({
          ids
        })

        // get the docs which don't already have thumbnails
        const docs = (Object.values(vectors) as types.PineconeVector[]).filter(
          (doc) => !doc.metadata.thumbnail
        )
        docs.sort((a, b) => a.id.localeCompare(b.id))
        const timestamps = docs.map((doc) => doc.metadata.start)

        if (!timestamps.length) {
          console.warn('video', videoId, 'no embeddings found')
          return
        }

        console.log(
          '\nprocessing video',
          videoId,
          'with',
          timestamps.length,
          'timestamps\n'
        )

        const thumbnailMap = await getThumbnailsForVideo({
          videoId,
          timestamps,
          storage,
          bucket
        })

        for (const doc of docs) {
          const thumbnailData = thumbnailMap[doc.metadata.start]
          if (thumbnailData) {
            doc.metadata.thumbnail = thumbnailData.thumbnail
            doc.metadata.preview = thumbnailData.preview
          }
        }

        await pinecone.upsert({
          vectors: docs
        })
      } catch (err) {
        console.error('error processing video', videoId, err)
      }
    },
    {
      concurrency: 4
    }
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
