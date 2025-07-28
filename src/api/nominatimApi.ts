import { type Coordinates, type Polygon } from '@/api/poligons'

import type { NominatimPlace, NominatimPlaceWithGeojson } from './types/nominatim'
import getCenter from '@/utils/getCenter'
import pLimit from 'p-limit'
import { fetchDataFromExternalApi } from '@/api/externalApi.ts'

// in order to speed up the development process, we can mock the response in development mode
// this way we can avoid hitting the API too hard and can test the application without waiting for the API response
// in production mode, we will use the real API
export const BASE_URL = import.meta.env.VITE_NOMINATIM_API

const getVillagesByCoords = async (
  poligons: Polygon[],
  onVillageLoaded?: (village: NominatimPlace) => void,
): Promise<NominatimPlace[]> => {
  let villages: NominatimPlace[] = []
  const errors = []
  if (import.meta.env.MODE === 'production') {
    const limit = pLimit(2)
    await Promise.all(
      poligons.map((polygon) =>
        limit(async () => {
          const village = await getVillageByCoords(getCenter(polygon.polygon))
          villages.push(village)
          onVillageLoaded?.(village)
        }).catch((e) => {
          console.error('error loading village:', e)
          errors.push({ polygon, error: e })
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
  const path = `/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json&zoom=10&addressdetails=1`
  return await fetchDataFromExternalApi(path)
}

const getVillageDetails = async (placeId: string): Promise<NominatimPlaceWithGeojson> => {
  const path = `/lookup?osm_ids=R${placeId}&polygon_geojson=1&format=json`
  const resp: NominatimPlaceWithGeojson[] = await fetchDataFromExternalApi(path)
  return resp[0]
}

export { getVillagesByCoords, getVillageDetails }
//http://localhost:3000/api/proxy?url=https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json&zoom=10&addressdetails=1
