import { Configuration, OpenAIApi } from 'openai'
import { PineconeClient } from 'pinecone-client'

import * as config from '@/lib/config'
import * as types from '@/server/types'
import '@/server/config'

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

  const query = 'hello world'
  const { data: embed } = await openai.createEmbedding({
    input: query,
    model: config.openaiEmbeddingModel
  })

  const res = await pinecone.query({
    vector: embed.data[0].embedding,
    topK: 10,
    includeMetadata: true,
    includeValues: false
  })

  console.log(JSON.stringify(res, null, 2))
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
