import type { Topology, GeometryCollection } from "topojson-specification";

export interface CountyProperties {
  COUNTYID: string;
  COUNTYCODE: string;
  COUNTYNAME: string;
  COUNTYENG: string;
}

export type CountiesTopology = Topology<
  Record<"COUNTY_MOI_1140318", GeometryCollection<CountyProperties>>
>;
