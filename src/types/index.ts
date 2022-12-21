import { z } from 'zod'

import type { PineconeCaptionMetadata } from '@/server'

export type SearchResult = {
  id: string
  score: number
  matchedHtml: string
  metadata: PineconeCaptionMetadata
  // TODO: include offset in url
}

export const SearchQuerySchema = z.object({
  query: z.string(),
  limit: z.coerce.number().nonnegative().int().min(1).max(50).optional()
})

export type SearchQuery = z.infer<typeof SearchQuerySchema>

export const YouTubeThumbnailQuerySchema = z.object({
  videoId: z.string(),
  time: z.string().optional()
})

export type YouTubeThumbnailQuery = z.infer<typeof YouTubeThumbnailQuerySchema>
