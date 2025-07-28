import { BASE_URL } from '@/api/nominatimApi.ts'

const VERCEL_PROXY_BASE_URL = '/api/proxy';

export async function fetchDataFromExternalApi(externalResourcePath: string) {
  const proxyUrl = `${VERCEL_PROXY_BASE_URL}?url=${encodeURIComponent(`${BASE_URL}${externalResourcePath}`)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data via proxy:', error);
    throw error;
  }
}