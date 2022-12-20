import pMap from 'p-map'

import * as types from './types'
import { getEmbeddingsForVideoTranscript } from './openai'

export async function upsertVideoTranscriptsForPlaylist(
  playlist: types.PlaylistDetailsWithTranscripts,
  {
    openai,
    pinecone,
    concurrency = 1
  }: {
    openai: types.OpenAIApi
    pinecone: types.PineconeClient
    concurrency?: number
  }
) {
  const videos = playlist.playlistItems
    .map((playlistItem) => {
      const id = playlistItem.contentDetails.videoId
      if (!id) return

      const title = playlistItem.snippet.title
      if (!title) return

      const transcript = playlist.transcripts[id]
      if (!transcript) return

      return {
        id,
        transcript,
        title
      }
    })
    .filter(Boolean)

  return (
    await pMap(
      videos,
      async (video) => {
        try {
          const videoEmbeddings = await getEmbeddingsForVideoTranscript({
            transcript: video.transcript,
            title: video.title,
            openai
          })

          await pinecone.upsert({
            vectors: videoEmbeddings
          })

          return video
        } catch (err) {
          console.warn(
            'error upserting transcripts for video',
            video.id,
            video.title,
            err.toString()
          )
        }
      },
      {
        concurrency
      }
    )
  ).filter(Boolean)
}
