import pMap from 'p-map'
import unescape from 'unescape'

import * as config from '@/lib/config'

import * as types from './types'

type PineconeCaptionVectorPending = {
  id: string
  input: string
  metadata: types.PineconeCaptionMetadata
}

export async function getEmbeddingsForVideoTranscript({
  transcript,
  title,
  openai,
  model = config.openaiEmbeddingModel,
  maxInputTokens = 100, // TODO???
  concurrency = 4
}: {
  transcript: types.Transcript
  title: string
  openai: types.OpenAIApi
  model?: string
  maxInputTokens?: number
  concurrency?: number
}) {
  const { videoId } = transcript

  let pendingVectors: PineconeCaptionVectorPending[] = []
  let currentStart = ''
  let currentNumTokensEstimate = 0
  let currentInput = ''
  let currentPartIndex = 0
  let currentVectorIndex = 0
  let isDone = false

  // Pre-compute the embedding inputs, making sure none of them are too long
  do {
    isDone = currentPartIndex >= transcript.parts.length

    const part = transcript.parts[currentPartIndex]
    const text = unescape(part?.text)
      .replaceAll('[Music]', '')
      .replaceAll(/[\t\n]/g, ' ')
      .replaceAll('  ', ' ')
      .trim()
    const numTokens = getNumTokensEstimate(text)

    if (!isDone && currentNumTokensEstimate + numTokens < maxInputTokens) {
      if (!currentStart) {
        currentStart = part.start
      }

      currentNumTokensEstimate += numTokens
      currentInput = `${currentInput} ${text}`

      ++currentPartIndex
    } else {
      currentInput = currentInput.trim()
      if (isDone && !currentInput) {
        break
      }

      const currentVector: PineconeCaptionVectorPending = {
        id: `${videoId}:${currentVectorIndex++}`,
        input: currentInput,
        metadata: {
          title,
          videoId,
          text: currentInput,
          start: currentStart
        }
      }

      pendingVectors.push(currentVector)

      // reset current batch
      currentNumTokensEstimate = 0
      currentStart = ''
      currentInput = ''
    }
  } while (!isDone)

  // Evaluate all embeddings with a max concurrency
  const vectors: types.PineconeCaptionVector[] = await pMap(
    pendingVectors,
    async (pendingVector) => {
      const { data: embed } = await openai.createEmbedding({
        input: pendingVector.input,
        model
      })

      const vector: types.PineconeCaptionVector = {
        id: pendingVector.id,
        metadata: pendingVector.metadata,
        values: embed.data[0].embedding
      }

      return vector
    },
    {
      concurrency
    }
  )

  return vectors
}

function getNumTokensEstimate(input: string): number {
  const numTokens = (input || '')
    .split(/\s/)
    .map((token) => token.trim())
    .filter(Boolean).length

  return numTokens
}
