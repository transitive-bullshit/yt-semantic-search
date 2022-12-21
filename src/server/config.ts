import dotenv from 'dotenv-safe'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  // youtube
  YOUTUBE_API_KEY: z.string().min(1),
  YOUTUBE_PLAYLIST_ID: z.string().min(1),

  // google cloud
  GOOGLE_STORAGE_BUCKET: z.string().min(1),

  // openai
  OPENAI_API_KEY: z.string().min(1),

  // pinecone
  PINECONE_API_KEY: z.string().min(1),
  PINECONE_BASE_URL: z.string().url(),
  PINECONE_NAMESPACE: z.string().min(1)
})

// ensure that all required env variables are defined
const env = envSchema.safeParse(process.env)

if (env.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 4)
  )

  process.exit(1)
}

export default env
