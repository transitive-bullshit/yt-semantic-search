import * as fs from 'node:fs/promises'

import { Configuration, OpenAIApi } from 'openai'
import { PineconeClient } from 'pinecone-client'

import * as types from '@/server/types'
import '@/server/config'
import { upsertVideoTranscriptsForPlaylist } from '@/server/pinecone'

async function main() {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
  )

  const pinecone = new PineconeClient<types.PineconeCaptionMetadata>({
    apiKey: process.env.PINECONE_API_KEY,
    baseUrl: process.env.PINECONE_BASE_URL,
    namespace: process.env.PINECONE_NAMESPACE
  })

  const playlistId = process.env.YOUTUBE_PLAYLIST_ID
  const playlistDetailsWithTranscripts: types.PlaylistDetailsWithTranscripts =
    JSON.parse(await fs.readFile(`out/${playlistId}.json`, 'utf-8'))

  await upsertVideoTranscriptsForPlaylist(playlistDetailsWithTranscripts, {
    openai,
    pinecone
  })
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
