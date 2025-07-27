import { type Coordinates, type Polygon } from '@/api/poligons'

import type { NominatimPlace, NominatimPlaceWithGeojson } from './types/nominatim'
import getCenter from '@/utils/getCenter'
import pLimit from 'p-limit'

// in order to speed up the development process, we can mock the response in development mode
// this way we can avoid hitting the API too hard and can test the application without waiting for the API response
// in production mode, we will use the real API
const getVillagesByCoords = async (
  poligons: Polygon[],
  onVillageLoaded?: (village: NominatimPlace) => void,
): Promise<NominatimPlace[]> => {
  let villages: NominatimPlace[] = []
  if (import.meta.env.MODE === 'production') {
    const limit = pLimit(2)
    await Promise.all(
      poligons.map((polygon) =>
        limit(async () => {
          try {
            const village = await getVillageByCoords(getCenter(polygon.polygon))
            villages.push(village)
            if (onVillageLoaded) {
              onVillageLoaded(village)
            }
          } catch (e) {
            console.error('error loading:', e)
          }
        }),
      ),
    )
  } else {
    const villagesMock = (await import('@/api/mocks/villagesResponse').then(
      (module) => module.default,
    )) as NominatimPlace[]
    villages = villagesMock
  }
  return villages
}

const getVillageByCoords = async (coords: Coordinates): Promise<NominatimPlace> => {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json&zoom=10&addressdetails=1`,
    {
      headers: {
        'User-Agent': 'my-test-task', // Важливо!
      },
    },
  )
  return await resp.json()
}

const getVillageDetails = async (placeId: string): Promise<NominatimPlaceWithGeojson> => {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/lookup?osm_ids=R${placeId}&polygon_geojson=1&format=json`,
    {
      headers: {
        'User-Agent': 'my-test-task', // Важливо!
      },
    },
  )
  const data: NominatimPlaceWithGeojson[] = await resp.json()
  return data && data[0]
}

export { getVillagesByCoords, getVillageDetails }
