import rehypeFormat from 'rehype-format'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, {
    allowDangerousHtml: true
  })
  .use(rehypeRaw)
  .use(rehypeFormat)
  .use(rehypeStringify)

export async function markdownToHtml(markdown: string) {
  const result = await processor.process(markdown)
  return result.toString()
}
