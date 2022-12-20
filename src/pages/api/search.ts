import 'cross-fetch/polyfill'
import { Configuration, OpenAIApi } from 'openai'
import { PineconeClient } from 'pinecone-client'
import QuickLRU from 'quick-lru'

import * as config from '@/lib/config'
import * as types from '@/server/types'
import { createAPIHandler } from '@/server/api'
import '@/server/config'
import { pick } from '@/server/utils'
import { SearchQuery, SearchQuerySchema, SearchResult } from '@/types'

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

const embeddingCache = new QuickLRU<string, number[]>({
  maxSize: 4096
})

export default createAPIHandler<SearchQuery, never, SearchResult[]>(
  {
    methods: ['GET'],
    query: SearchQuerySchema
  },
  async function searchHandler(req, res, { query }) {
    const input = query.query
    const limit = query.limit ?? 10

    const inputL = input.toLowerCase().trim()
    let searchResults: SearchResult[] = []

    if (inputL) {
      let inputEmbedding = embeddingCache.get(inputL)

      if (!inputEmbedding) {
        const { data: embed } = await openai.createEmbedding({
          input,
          model: config.openaiEmbeddingModel
        })

        inputEmbedding = embed.data[0].embedding
        embeddingCache.set(inputL, inputEmbedding)
      }

      const results = await pinecone.query({
        vector: inputEmbedding,
        topK: limit,
        includeMetadata: true,
        includeValues: false
      })

      searchResults = results.matches.map((result) =>
        pick<SearchResult>(result, 'id', 'score', 'metadata')
      )
    }

    // add an extra long delay to accentuate any client-side swr cache misses
    // (for debugging purposes)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000)
    // })

    if (!config.isDev) {
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
      )
    }

    return res.status(200).json(searchResults)
  }
)
