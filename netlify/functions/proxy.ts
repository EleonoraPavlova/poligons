import type { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  try {
    const encodedUrl = event.queryStringParameters?.url
    if (!encodedUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing URL' }),
      }
    }

    const externalUrl = decodeURIComponent(encodedUrl)

    if (!externalUrl.startsWith('https://')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid URL' }),
      }
    }

    const response = await fetch(externalUrl, {
      method: event.httpMethod,
      headers: {
        'User-Agent': 'my-test-task',
      },
    })

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: response.statusText,
      }
    }

    const data = await response.json()

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 's-maxage=259200, stale-while-revalidate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error('Proxy error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to proxy request' }),
    }
  }
}
