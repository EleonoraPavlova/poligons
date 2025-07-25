import { centroid, polygon } from "@turf/turf";
import type { Coordinates } from "@/api/poligons";

/**
 * Calculates the center of a polygon defined by an array of coordinates.
 *
 * @param {Coordinates[]} coordinates - An array of coordinates defining the polygon.
 * @returns {Coordinates} The center point of the polygon.
 */
export default function getCenter(coordinates: Coordinates[]): Coordinates {
  const mappedValue = polygon([
    coordinates.map(coord => [coord.lng, coord.lat])
  ]);

  const center = centroid(mappedValue);

  return {
    lat: center.geometry.coordinates[1],
    lng: center.geometry.coordinates[0]
  };

}
