import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { PARTY_COLORS, type CountyResult } from "@/types/elections";
import type { CountiesTopology, CountyProperties } from "@/types/map";
import MapLegend from "@/components/Map/MapLegend";
import MapTooltip from "@/components/Map/MapTooltip";
import { useMapTooltip } from "@/hooks/useMapTooltip";

interface CountyMapProps {
  topology: CountiesTopology | null;
  results: CountyResult[];
  isLoading: boolean;
}

const CountyMap = ({ topology, results, isLoading }: CountyMapProps) => {
  const navigate = useNavigate();

  const [activeParties] = useState();

  const { features, pathGenerator } = useTaiwanMap<CountyProperties>(
    topology,
    "COUNTY_MOI_1140318",
    null,
  );

  // To ensure hovered county is on top, render the stroke properly.
  const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null);
  const sortedFeatures = [
    ...features.filter(
      (f) => (f.properties as CountyProperties).COUNTYCODE !== hoveredCountyId,
    ),
    ...features.filter(
      (f) => (f.properties as CountyProperties).COUNTYCODE === hoveredCountyId,
    ),
  ];

  const { tooltip, handleMouseMove, handleMouseLeave } = useMapTooltip();

  return (
    <div className="bento-cell col-span-12 lg:col-span-8 flex flex-col gap-3 min-h-0">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-lg font-semibold">全台縣市地圖</h2>
        <span className="text-xs text-muted-foreground">點擊縣市查看詳情</span>
      </div>

      {/* SVG map */}
      <div className="flex-1 min-h-[360px]">
        {pathGenerator && features.length > 0 && !isLoading ? (
          <svg viewBox="0 0 800 700" className="w-full h-full max-h-[600px]">
            <defs>
              <pattern
                id="specialElectionPattern"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(45 0 0)"
              >
                <rect width="10" height="10" fill="#1e2035" />
                <line
                  x1="0"
                  y1="5"
                  x2="10"
                  y2="5"
                  stroke="#C9961C"
                  strokeWidth="3"
                  opacity="0.7"
                />
              </pattern>
            </defs>
            {sortedFeatures.map((f) => {
              const props = f.properties as CountyProperties;
              const countyId = props.COUNTYCODE;
              const countyName = props.COUNTYNAME;

              const countyResult = results?.find(
                (r) => r.countyId === countyId,
              );

              const candidates = countyResult?.candidates ?? [];
              const isSpecialElection = countyResult?.isSpecialElection;
              const note = countyResult?.note;

              const winner = countyResult?.candidates.find(
                (c) => c.elected,
              )?.party;

              const fillColor = isSpecialElection
                ? "url(#specialElectionPattern)"
                : winner
                  ? PARTY_COLORS[winner]
                  : "#D3D3D3";

              return (
                <path
                  key={countyId ?? f.id}
                  d={pathGenerator(f) ?? undefined}
                  fill={fillColor}
                  className="map-path"
                  onMouseEnter={(e) => {
                    handleMouseMove(e, countyName, candidates, isSpecialElection, note);
                    setHoveredCountyId(countyId);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave();
                    setHoveredCountyId(null);
                  }}
                  onClick={() => {
                    navigate(`/county/${countyId}`);
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
        isSpecialElection={tooltip?.isSpecialElection}
        note={tooltip?.note}
        visible={!!tooltip}
      />
    </div>
  );
};

export default CountyMap;
