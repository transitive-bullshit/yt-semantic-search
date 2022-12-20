import { Configuration, OpenAIApi } from 'openai'
import { PineconeClient } from 'pinecone-client'

import * as config from '@/lib/config'
import * as types from '@/server/types'
import { createAPIHandler } from '@/server/api'
import '@/server/config'
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

export default createAPIHandler<SearchQuery, never, SearchResult[]>(
  {
    methods: ['GET'],
    query: SearchQuerySchema
  },
  async function searchHandler(req, res, { query }) {
    const input = query.query
    const limit = query.limit ?? 10

    const { data: embed } = await openai.createEmbedding({
      input,
      model: config.openaiEmbeddingModel
    })

    const results = await pinecone.query({
      vector: embed.data[0].embedding,
      topK: limit,
      includeMetadata: true,
      includeValues: false
    })

    const searchResults: SearchResult[] = results.matches.map((result) => ({
      ...result.metadata,
      id: result.id
    }))

    // add an extra long delay to accentuate any client-side swr cache misses
    // (for debugging purposes)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000)
    // })

    return res.status(200).json(searchResults)
  }
)
