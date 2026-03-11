import { useState } from "react";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { PARTY_COLORS, type Party } from "@/types/elections";
import type { TownsTopology, TownProperties } from "@/types/map";
import MapLegend from "@/components/Map/MapLegend";
import MapTooltip from "@/components/Map/MapTooltip";
import { getWinnerParty, getTownshipsByCounty } from "@/data/electionResults";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import { useMapTooltip } from "@/hooks/useMapTooltip";

interface TownshipMapProps {
  topology: TownsTopology | null;
  countyId: string;
}

const TownshipMap = ({ topology, countyId }: TownshipMapProps) => {
  const townResults = getTownshipsByCounty(countyId);
  const resultMap = new Map(townResults.map((t) => [t.townshipName, t]));

  const { ref: containerRef, dimensions } =
    useContainerDimensions<HTMLDivElement>();
  const [activeParties] = useState();

  const { features, pathGenerator } = useTaiwanMap<TownProperties>(
    topology,
    "TOWN_MOI_1140318",
    countyId,
    dimensions.width,
    dimensions.height,
  );

  const { tooltip, handleMouseMove, handleMouseLeave } = useMapTooltip();

  return (
    <div className="bento-cell text-lg font-semibold text-foreground">
      <h2 className="text-lg font-semibold">鄉鎮市區地圖</h2>

      {/* SVG map */}
      <div ref={containerRef} className="flex-1 min-h-[360px]">
        {pathGenerator && dimensions.width > 0 && (
          <svg
            viewBox="0 0 600 600"
            width={dimensions.width}
            height={dimensions.height}
          >
            {features.map((f) => {
              const props = f.properties as TownProperties;
              const townId = props.TOWNCODE;
              const townName = props.TOWNNAME;
              const result = resultMap.get(townName);
              const candidates = result?.candidates ?? [];
              const winner = getWinnerParty(candidates);
              const fillColor = winner
                ? PARTY_COLORS[winner as Party]
                : "#D3D3D3";

              return (
                <path
                  key={townId ?? f.id}
                  d={pathGenerator(f) ?? undefined}
                  fill={fillColor}
                  className="map-path"
                  onMouseMove={(e) => {
                    handleMouseMove(e, townName, candidates);
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </svg>
        )}
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-border">
        <MapLegend activeParties={activeParties} />
      </div>

      {/* Tooltip */}
      <MapTooltip
        x={tooltip?.x ?? 0}
        y={tooltip?.y ?? 0}
        countyName={tooltip?.countyName ?? ""}
        candidates={tooltip?.candidates ?? []}
        visible={!!tooltip}
      />
    </div>
  );
};

export default TownshipMap;
