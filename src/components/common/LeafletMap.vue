<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LPolygon } from '@vue-leaflet/vue-leaflet'
import { computed, watch, ref, nextTick, type ComputedRef } from 'vue'
import { usePoligonsStore } from '@/stores/usePoligonsStore'
import { useVillageStore } from '@/stores/useVillageStore'
import getRandomHexColor from '@/utils/getRandomHexColor'
import type { Map as LeafletMap, LatLngTuple, LatLngBoundsExpression } from 'leaflet'

const { showPolygons, highlightVillage } = defineProps<{
  showPolygons: boolean
  highlightVillage: boolean
}>()

const mapRef = ref<LeafletMap | null>(null)

let polygonsList: ComputedRef<{ latLngs: LatLngTuple[]; color: string }[]> = computed(() => [])

if (showPolygons) {
  const poligonsStore = usePoligonsStore()
  polygonsList = computed(() => {
    return poligonsStore.poligons.map((p) => {
      return {
        latLngs: p.polygon.map((latLng) => [latLng.lat, latLng.lng]) as LatLngTuple[],
        color: getRandomHexColor(),
      }
    })
  })
} else if (highlightVillage) {
  const villageStore = useVillageStore()
  //
  polygonsList = computed(() => {
    if (!villageStore.villageDetails?.geojson?.coordinates[0]) {
      return []
    }
    // transform nominatim coordinates to leaflet LatLngTuple
    return [
      {
        latLngs: villageStore.villageDetails?.geojson?.coordinates[0].reduce(
          (acc: LatLngTuple[], curr) => {
            const reversedCoordinates = [curr[1], curr[0]]
            return [...acc, reversedCoordinates as LatLngTuple]
          },
          [],
        ),
        color: getRandomHexColor(),
      },
    ]
  })
}

watch(
  // @ts-expect-error use internal vue leaflet field
  [() => mapRef.value && mapRef.value.leafletObject, polygonsList],
  ([newMap, polygons]) => {
    if (newMap && polygons.length > 0) {
      nextTick(() => {
        const allPoints = polygonsList.value.flatMap((p) => p.latLngs)
        const bounds: LatLngBoundsExpression = allPoints as LatLngTuple[]

        newMap.fitBounds(bounds)
      })
    }
  },
  { immediate: true },
)

if (highlightVillage) {
}
</script>
<template>
  <LMap
    ref="mapRef"
    :zoom="2"
    :center="[47.41322, -1.219482]"
    class="w-full h-full rounded"
    :useGlobalLeaflet="false"
  >
    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <LPolygon
      v-for="(polygon, index) in polygonsList"
      :key="index"
      :lat-lngs="polygon.latLngs"
      :color="polygon.color"
    />
  </LMap>
</template>
