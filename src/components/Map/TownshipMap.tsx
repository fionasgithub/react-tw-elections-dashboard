import { useState, useRef, useEffect, useCallback } from "react";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { PARTY_COLORS, type Candidate, type Party } from "@/types/elections";
import type { TownsTopology, TownProperties } from "@/types/map";
import MapLegend from "@/components/Map/MapLegend";
import MapTooltip from "@/components/Map/MapTooltip";
import { getWinnerParty, getTownshipsByCounty } from "@/data/electionResults";

interface TownshipMapProps {
  topology: TownsTopology | null;
  countyId: string;
}

const TownshipMap = ({ topology, countyId }: TownshipMapProps) => {
  const townResults = getTownshipsByCounty(countyId);
  const resultMap = new Map(townResults.map((t) => [t.townshipName, t]));

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeParties] = useState();

  // Dynamically update dimensions on container resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { features, pathGenerator } = useTaiwanMap<TownProperties>(
    topology,
    "TOWN_MOI_1140318",
    countyId,
    dimensions.width,
    dimensions.height,
  );

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    countyName: string;
    top3Candidates: Candidate[];
  } | null>(null);

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<SVGPathElement, MouseEvent>,
      name: string,
      candidates: Candidate[],
    ) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        countyName: name,
        top3Candidates: candidates
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 3),
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

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
        top3Candidates={tooltip?.top3Candidates ?? []}
        visible={!!tooltip}
      ></MapTooltip>
    </div>
  );
};

export default TownshipMap;
