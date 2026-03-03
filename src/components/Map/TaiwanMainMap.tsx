import { useState } from "react";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { type Party, PARTY_COLORS } from "@/types/elections";
import type { CountiesTopology, CountyProperties } from "@/types/map";

interface TaiwanMainMapProps {
  topology: CountiesTopology | null;
  results?: Record<string, { winner?: Party }>;
}

const TaiwanMainMap = ({ topology, results }: TaiwanMainMapProps) => {
  const { features, pathGenerator } = useTaiwanMap<CountyProperties>(
    topology,
    "COUNTY_MOI_1140318",
  );

  const [, setSelectedCounty] = useState<string>("");

  return (
    <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-card p-6 min-h-[600px]">
      {pathGenerator && (
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {features.map((f) => {
            const props = f.properties as CountyProperties;
            const countyId = props.COUNTYCODE;
            const winner = results?.[countyId]?.winner;
            const fillColor = winner ? PARTY_COLORS[winner] : "#D3D3D3";

            return (
              <path
                key={countyId ?? f.id}
                d={pathGenerator(f) ?? undefined}
                fill={fillColor}
                className="stroke-white stroke-1 hover:brightness-90 transition-all cursor-pointer"
                onClick={() => setSelectedCounty(props.COUNTYCODE)}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default TaiwanMainMap;
