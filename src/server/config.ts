import { z } from 'zod'

const envSchema = z.object({
  // general env
  NODE_ENV: z.enum(['development', 'test', 'production']),

  // youtube
  YOUTUBE_API_KEY: z.string().min(1),

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
