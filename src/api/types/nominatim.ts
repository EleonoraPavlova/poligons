export type NominatimPlace = {
  place_id: number;
  licence: string;
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    municipality?: string;
    district?: string;
    state?: string;
    'ISO3166-2-lvl4'?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: [string, string, string, string];
}

type Position = [number, number]; // [longitude, latitude]
type LinearRing = Position[]; // замкнене кільце (перша та остання точка однакові)
type PolygonCoordinates = LinearRing[];

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: PolygonCoordinates;
}

export type NominatimPlaceWithGeojson = NominatimPlace & {
  geojson: GeoJSONPolygon;
};
