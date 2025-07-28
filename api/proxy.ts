import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const externalUrl = req.query.url as string

    if (!externalUrl || !externalUrl.startsWith('https://')) {
      return res.status(400).json({ error: 'Invalid or missing URL' })
    }

    const response = await fetch(externalUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'my-test-task',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    })

    if (!response.ok) {
      return res.status(response.status).send(response.statusText)
    }

    const data = await response.json()

    res.setHeader('Cache-Control', 's-maxage=259200, stale-while-revalidate')
    res.status(200).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Failed to proxy request' })
  }
}
