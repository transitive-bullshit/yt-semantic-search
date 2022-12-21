import type { Storage } from '@google-cloud/storage'
import type { youtube_v3 } from 'googleapis'
import type { OpenAIApi } from 'openai'
import type {
  PineconeClient as PineconeClientGeneric,
  Vector
} from 'pinecone-client'

type YouTubeClient = youtube_v3.Youtube
type GCPStorage = Storage

export type { youtube_v3 }
export type { YouTubeClient }
export type { GCPStorage }
export type { OpenAIApi }

export interface ScrapedCaptionJSON {
  playerCaptionsTracklistRenderer: PlayerCaptionsTracklistRenderer
}

export interface PlayerCaptionsTracklistRenderer {
  captionTracks: CaptionTrack[]
  audioTracks: AudioTrack[]
  translationLanguages: TranslationLanguage[]
  defaultAudioTrackIndex: number
}

export interface AudioTrack {
  captionTrackIndices: number[]
}

export interface CaptionTrack {
  baseUrl: string
  name: Name
  vssId: string
  languageCode: string
  kind: string
  isTranslatable: boolean
}

export interface Name {
  simpleText: string
}

export interface TranslationLanguage {
  languageCode: string
  languageName: Name
}

export interface Transcript {
  videoId: string
  parts: TranscriptPart[]
}

export type TranscriptPart = {
  text: string
  start: string
  dur: string
}

export interface PlaylistDetails {
  playlistId: string
  playlist: youtube_v3.Schema$Playlist
  playlistItems: youtube_v3.Schema$PlaylistItem[]
}

export interface PlaylistDetailsWithTranscripts extends PlaylistDetails {
  transcripts: {
    [videoId: string]: Transcript
  }
}

export type PineconeCaptionMetadata = {
  title: string
  videoId: string
  text: string
  start: string

  thumbnail?: string
  preview?: string
}

export type PineconeCaptionVector = {
  id: string
  values: number[]
  metadata: PineconeCaptionMetadata
}

export type PineconeClient = PineconeClientGeneric<PineconeCaptionMetadata>
export type PineconeVector = Vector<PineconeCaptionMetadata> & {
  metadata: PineconeCaptionMetadata
}
