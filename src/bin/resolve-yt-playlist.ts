import * as fs from 'node:fs/promises'

import { google } from 'googleapis'

import * as types from '@/server/types'
import * as yt from '@/server/youtube'
import '@/server/config'

async function main() {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  })

  const playlistId = process.env.YOUTUBE_PLAYLIST_ID
  const playlistDetails = await yt.getPlaylistDetails(playlistId, { youtube })
  const videoIds = playlistDetails.playlistItems
    .filter((playListItem) => playListItem.status?.privacyStatus === 'public')
    .map((playlistItem) => playlistItem.contentDetails.videoId)
    .filter(Boolean)
  const transcripts = await yt.getTranscriptsForVideos(videoIds)
  const transcriptsMap = transcripts.reduce(
    (map, transcript) => ({
      ...map,
      [transcript.videoId]: transcript
    }),
    {}
  )
  const playlistDetailsWithTranscripts: types.PlaylistDetailsWithTranscripts = {
    ...playlistDetails,
    transcripts: transcriptsMap
  }

  await fs.writeFile(
    `out/${playlistId}.json`,
    JSON.stringify(playlistDetailsWithTranscripts, null, 2),
    'utf-8'
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
