import * as d3 from "d3";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { CountyProperties } from "@/types/map";

export const OFFSHORE_COUNTY_CODES = ["09007", "09020", "10016"];
export type OffshoreCountyCode = (typeof OFFSHORE_COUNTY_CODES)[number];

export const OFFSHORE_LABELS: Record<OffshoreCountyCode, string> = {
  "09007": "連江縣",
  "09020": "金門縣",
  "10016": "澎湖縣",
};

export function makeInsetPathGenerator(
  feature: Feature<Geometry, CountyProperties>,
  width: number,
  height: number,
  padding = 4,
) {
  const collection: FeatureCollection<Geometry, CountyProperties> = {
    type: "FeatureCollection",
    features: [feature],
  };
  const projection = d3.geoMercator();
  projection.fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    collection,
  );
  return d3.geoPath().projection(projection);
}
