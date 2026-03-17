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
) => {
  const allFeatures = useMemo(() => {
    if (!topology) return [];
    const geojson = topojson.feature(topology, topology.objects[objectName]);
    return (geojson as GeoJSON.FeatureCollection).features;
  }, [topology, objectName]);

  const filteredFeatures = useMemo(() => {
    if (!countyId) return allFeatures;
    return allFeatures.filter(
      (f) => (f.properties as TownProperties).COUNTYCODE === countyId,
    );
  }, [allFeatures, countyId]);

  const pathGenerator = useMemo(() => {
    if (!topology) return null;

    const projection = d3.geoMercator();

    if (countyId) {
      const collection: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: filteredFeatures,
      };
      projection.fitExtent(
        [
          [30, 30],
          [570, 570],
        ],
        collection,
      );
    } else {
      projection.center([121, 24]).scale(10000).translate([400, 300]);
    }

    return d3.geoPath().projection(projection);
  }, [topology, countyId, filteredFeatures]);

  return useMemo(
    () => ({ features: filteredFeatures, pathGenerator }),
    [filteredFeatures, pathGenerator],
  );
};
