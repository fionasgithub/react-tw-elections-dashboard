import { useMemo } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type {
  Topology,
  GeometryCollection,
  Properties,
} from "topojson-specification";

export const useTaiwanMap = <P extends Properties = Properties>(
  topology: Topology<Record<string, GeometryCollection<P>>> | null,
  objectName: string,
  width: number,
  height: number,
) => {
  return useMemo(() => {
    if (!topology || width === 0 || height === 0)
      return { features: [], pathGenerator: null };

    const geojson = topojson.feature(topology, topology.objects[objectName]);
    const features = (geojson as GeoJSON.FeatureCollection).features;

    const projection = d3
      .geoMercator()
      .fitSize([width, height], geojson as GeoJSON.FeatureCollection);

    const pathGenerator = d3.geoPath().projection(projection);

    return { features, pathGenerator };
  }, [topology, objectName, width, height]);
};
