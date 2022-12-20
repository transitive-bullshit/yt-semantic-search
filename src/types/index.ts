import { z } from 'zod'

import type { PineconeCaptionMetadata } from '@/server'

export type SearchResult = PineconeCaptionMetadata & {
  id: string

  // TODO: include offset in url
}

export const SearchQuerySchema = z.object({
  query: z.string(),
  limit: z.number().nonnegative().optional()
})

export type SearchQuery = z.infer<typeof SearchQuerySchema>
