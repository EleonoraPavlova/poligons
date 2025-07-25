import poligonsResponse from "./mocks/poligonsResponse"
export type Polygon = {
  id: number
  name: string
  polygon: Array<Coordinates>
}

export type Coordinates = {
  lat: number
  lng: number
};


async function getList(): Promise<Polygon[]> {
  return poligonsResponse;
}


export {
  getList,
}
