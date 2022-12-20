import { z } from 'zod'

import type { PineconeCaptionMetadata } from '@/server'

export type SearchResult = {
  id: string
  score: number
  metadata: PineconeCaptionMetadata
  // TODO: include offset in url
}

export const SearchQuerySchema = z.object({
  query: z.string(),
  limit: z.coerce.number().nonnegative().optional()
})

export type SearchQuery = z.infer<typeof SearchQuerySchema>
