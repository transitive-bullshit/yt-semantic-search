import * as fs from 'node:fs/promises'

import pMap from 'p-map'
import xml2js from 'xml2js'
import youtubeTranscript from 'youtube-transcript'

import * as types from './types'
import got from './got'

// console.log(youtubeTranscript, youtubeTranscript.default)

export async function getPlaylistDetails(
  playlistId: string,
  {
    youtube
  }: {
    youtube: types.YouTubeClient
  }
): Promise<types.PlaylistDetails> {
  const playlist = (
    await youtube.playlists.list({
      id: [playlistId],
      part: ['id', 'contentDetails', 'localizations', 'snippet', 'status'],
      maxResults: 1
    })
  ).data.items[0]

  let playlistItems: types.youtube_v3.Schema$PlaylistItem[] = []
  let playlistItemsPageToken: string

  do {
    const playlistItemsPage = await youtube.playlistItems.list({
      playlistId,
      part: ['id', 'contentDetails', 'snippet', 'status'],
      maxResults: 50,
      pageToken: playlistItemsPageToken
    })

    playlistItems = playlistItems.concat(playlistItemsPage.data.items)
    playlistItemsPageToken = playlistItemsPage.data.nextPageToken
  } while (playlistItemsPageToken)

  return {
    playlistId,
    playlist,
    playlistItems
  }
}

export async function getTranscriptsForVideos(
  videoIds: string[],
  {
    concurrency = 4
  }: {
    concurrency?: number
  } = {}
): Promise<types.Transcript[]> {
  const transcripts = (
    await pMap(videoIds, getTranscriptForVideo, {
      concurrency
    })
  ).filter(Boolean)

  return transcripts
}

export async function getTranscriptForVideo(
  videoId: string
): Promise<types.Transcript | null> {
  const transcript = await getTranscriptForVideoImpl(videoId)
  if (transcript) {
    return transcript
  }

  console.log('transcript fallback', videoId)
  try {
    const res = await (youtubeTranscript as any).default.fetchTranscript(
      videoId,
      {
        lang: 'en',
        country: 'EN'
      }
    )

    const parts: types.TranscriptPart[] = res.map((p) => ({
      text: p.text,
      start: `${p.offset / 1000}`,
      dur: `${p.duration / 1000}`
    }))
    console.log('transcript fallback success', videoId, parts.length)

    // console.log(JSON.stringify(res, null, 2))
    return {
      videoId,
      parts
    }
  } catch (err) {
    console.warn('transcript error', videoId, err.toString())
  }

  return null
}

export async function getTranscriptForVideoImpl(
  videoId: string
): Promise<types.Transcript | null> {
  console.log('getTranscriptForVideo', videoId)

  try {
    const html = await got(`https://www.youtube.com/watch?v=${videoId}`, {
      retry: {
        limit: 2
      }
    }).text()

    await fs.writeFile('out.html', html, 'utf-8')

    // TODO: clean this up; it's too brittle...
    const videoPageHtml = html.split('"captions":')
    if (videoPageHtml.length < 2) {
      console.warn('getTranscriptForVideo error', videoId, 'no captions found')
      return null
    }
    const captions = JSON.parse(
      videoPageHtml[1].split(',"videoDetails')[0].replace('\n', '')
    ) as types.ScrapedCaptionJSON
    const captionTracks =
      captions?.playerCaptionsTracklistRenderer?.captionTracks

    // Find an english track
    // TODO: add a better heuristic here
    const track = captionTracks.find((track) => {
      return /english/i.test(track?.name?.simpleText)
    })
    if (!track) {
      console.warn(
        'getTranscriptForVideo warning',
        videoId,
        'no english captions'
      )
      console.log(JSON.stringify(captionTracks, null, 2))
      return null
    }

    const rawTranscriptXml = await got(track.baseUrl, {
      retry: {
        limit: 2
      }
    }).text()
    const parser = new xml2js.Parser()
    const parts0 = await parser.parseStringPromise(rawTranscriptXml)
    const parts = parts0.transcript.text.map((text: any) => ({
      text: text._,
      start: text.$.start,
      dur: text.$.dur
    }))

    return {
      videoId,
      parts
    }
  } catch (err) {
    console.warn('getTranscriptForVideo error', videoId, err.toString())
    return null
  }
}
