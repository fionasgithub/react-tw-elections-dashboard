import { useMemo } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type {
  Topology,
  GeometryCollection,
  Properties,
} from "topojson-specification";
import type { TownProperties } from "@/types/map";

export const useTaiwanMap = <P extends Properties = Properties>(
  topology: Topology<Record<string, GeometryCollection<P>>> | null,
  objectName: string,
  countyId: string | null = null,
  width: number,
  height: number,
) => {
  return useMemo(() => {
    if (!topology || width === 0 || height === 0)
      return { features: [], pathGenerator: null };

    const geojson = topojson.feature(topology, topology.objects[objectName]);
    const features = (geojson as GeoJSON.FeatureCollection).features;
    const countyFeatures = features.filter((f) => {
      if (!countyId) return true;
      return (f.properties as TownProperties).COUNTYCODE === countyId;
    });

    const projection = d3
      .geoMercator()
      .fitSize([width, height], geojson as GeoJSON.FeatureCollection);

    if (countyId) {
      const collection: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: countyFeatures,
      };

      projection.fitExtent(
        [
          [30, 30],
          [570, 570],
        ],
        collection,
      );
    }

    const pathGenerator = d3.geoPath().projection(projection);
    return {
      features: countyFeatures,
      pathGenerator,
    };
  }, [topology, objectName, countyId, width, height]);
};
