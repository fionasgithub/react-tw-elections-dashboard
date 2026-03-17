import { useState, useMemo } from "react";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import {
  PARTY_COLORS,
  type Party,
  type TownshipResult,
} from "@/types/elections";
import type { TownsTopology, TownProperties } from "@/types/map";
import MapLegend from "@/components/Map/MapLegend";
import MapTooltip from "@/components/Map/MapTooltip";
import { useMapTooltip } from "@/hooks/useMapTooltip";

interface TownshipMapProps {
  topology: TownsTopology | null;
  countyId: string;
  results: TownshipResult[];
}

const TownshipMap = ({ topology, countyId, results }: TownshipMapProps) => {
  const resultMap = useMemo(() => {
    return new Map(results.map((t) => [t.townshipId, t]));
  }, [results]);

  const activeParties = useMemo(() => {
    const partySet = new Set<Party>();
    results.reduce((item, rows) => {
      const winner = rows.candidates.find((c) => c.elected)?.party;
      if (winner) {
        item.add(winner);
      }
      return item;
    }, partySet);
    return Array.from(partySet);
  }, [results]);

  const { features, pathGenerator } = useTaiwanMap<TownProperties>(
    topology,
    "TOWN_MOI_1140318",
    countyId,
  );

  // To ensure hovered township is on top, render the stroke properly.
  const [hoveredTownId, setHoveredTownId] = useState<string | null>(null);
  const sortedFeatures = useMemo(() => {
    if (!hoveredTownId) return features;
    return [
      ...features.filter(
        (f) => (f.properties as TownProperties).TOWNCODE !== hoveredTownId,
      ),
      ...features.filter(
        (f) => (f.properties as TownProperties).TOWNCODE === hoveredTownId,
      ),
    ];
  }, [features, hoveredTownId]);

  const { tooltip, handleMouseMove, handleMouseLeave } = useMapTooltip();

  return (
    <div className="bento-cell text-lg font-semibold text-foreground">
      <h2 className="text-lg font-semibold">鄉鎮市區地圖</h2>

      {/* SVG map */}
      <div className="flex-1 min-h-[360px]">
        {pathGenerator && features.length > 0 ? (
          <svg viewBox="0 0 600 600" className="w-full h-full max-h-[500px]">
            {sortedFeatures.map((f) => {
              const props = f.properties as TownProperties;
              const townId = props.TOWNCODE;
              const townName = props.TOWNNAME;
              const result = resultMap.get(townId);
              const candidates = result?.candidates ?? [];
              const winner = candidates.find((c) => c.elected)?.party;
              const fillColor = winner
                ? PARTY_COLORS[winner as Party]
                : "#D3D3D3";

              return (
                <path
                  key={townId ?? f.id}
                  d={pathGenerator(f) ?? undefined}
                  fill={fillColor}
                  className="map-path"
                  onMouseEnter={(e) => {
                    handleMouseMove(e, townName, candidates);
                    setHoveredTownId(townId);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave();
                    setHoveredTownId(null);
                  }}
                />
              );
            })}
          </svg>
        ) : (
          <p className="text-muted-foreground text-sm">載入地圖中…</p>
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
