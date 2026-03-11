import type { Topology, GeometryCollection } from "topojson-specification";

export interface CountyProperties {
  COUNTYID: string;
  COUNTYCODE: string;
  COUNTYNAME: string;
  COUNTYENG: string;
}

export interface TownProperties {
  TOWNID: string;
  TOWNCODE: string;
  COUNTYNAME: string;
  TOWNNAME: string;
  TOWNENG: string;
  COUNTYID: string;
  COUNTYCODE: string;
}

export type CountiesTopology = Topology<
  Record<"COUNTY_MOI_1140318", GeometryCollection<CountyProperties>>
>;

export type TownsTopology = Topology<
  Record<"TOWN_MOI_1140318", GeometryCollection<TownProperties>>
>;
