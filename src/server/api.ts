import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface APIHandlerOptions {
  methods: Array<HTTPMethod>
  query?: z.ZodTypeAny
  body?: z.ZodTypeAny
}

type APIHandlerThunk<Q, B, T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  params: {
    query: Q
    body: B
  }
) => Promise<void>

type ErrorReturnType = { error: string } & any

export function createAPIHandler<Q, B, T>(
  opts: APIHandlerOptions,
  handler: APIHandlerThunk<Q, B, T | ErrorReturnType>
) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<T | ErrorReturnType>
  ) => {
    if (!req.method || !opts.methods.includes(req.method as HTTPMethod)) {
      return res.status(405).json({ error: 'method not allowed' })
    }

    let query: Q | undefined
    if (opts.query) {
      try {
        query = opts.query.parse(req.query)
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error('error parsing request query', err.issues)

          return res.status(400).json({
            error: 'error invalid request query',
            details: err.format()
          })
        }

        return res.status(400).json({ error: 'error invalid request query' })
      }
    }

    let body: B | undefined
    if (opts.body) {
      try {
        body = opts.body.parse(req.body)
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error('error parsing request body', err.issues)

          return res.status(400).json({
            error: 'error invalid request body',
            details: err.format()
          })
        }

        return res.status(400).json({ error: 'error invalid request body' })
      }
    }

    try {
      // TODO: these type casts are really not what we want
      await handler(req, res, {
        query: query as Q,
        body: body as B
      })
    } catch (err: any) {
      console.error('unexpected api error', err.toString())

      return res.status(500).json({ error: 'unexpected api error' })
    }
  }
}
