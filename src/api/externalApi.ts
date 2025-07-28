import { BASE_URL } from '@/api/nominatimApi.ts'
import { createStorageCache } from '@/utils/createStorageCache.ts'

const cache = createStorageCache('nominatim', {
  ttlMs: 60 * 60 * 1000, // 1 час
})

const VERCEL_PROXY_BASE_URL = '/api/proxy'

export async function fetchDataFromExternalApi(externalResourcePath: string) {
  const cacheKey = externalResourcePath
  const cached = cache.get<never>(cacheKey)
  if (cached) return cached

  const proxyUrl = `${VERCEL_PROXY_BASE_URL}?url=${encodeURIComponent(`${BASE_URL}${externalResourcePath}`)}`

  try {
    const response = await fetch(proxyUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    cache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching data via proxy:', error)
    throw error
  }
}
