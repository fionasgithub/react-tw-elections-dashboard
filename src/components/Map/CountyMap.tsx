import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { PARTY_COLORS, type CountyResult } from "@/types/elections";
import type { CountiesTopology, CountyProperties } from "@/types/map";
import MapLegend from "@/components/Map/MapLegend";
import MapTooltip from "@/components/Map/MapTooltip";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import { useMapTooltip } from "@/hooks/useMapTooltip";

interface CountyMapProps {
  topology: CountiesTopology | null;
  results: CountyResult[];
}

const CountyMap = ({ topology, results }: CountyMapProps) => {
  const navigate = useNavigate();

  const { ref: containerRef, dimensions } =
    useContainerDimensions<HTMLDivElement>();
  const [activeParties] = useState();

  const { features, pathGenerator } = useTaiwanMap<CountyProperties>(
    topology,
    "COUNTY_MOI_1140318",
    null,
    dimensions.width,
    dimensions.height,
  );

  const { tooltip, handleMouseMove, handleMouseLeave } = useMapTooltip();

  return (
    <div className="bento-cell col-span-12 lg:col-span-8 flex flex-col gap-3 min-h-0">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-lg font-semibold">全台縣市地圖</h2>
        <span className="text-xs text-muted-foreground">點擊縣市查看詳情</span>
      </div>

      {/* SVG map */}
      <div ref={containerRef} className="flex-1 min-h-[360px]">
        {pathGenerator && dimensions.width > 0 && (
          <svg width={dimensions.width} height={dimensions.height}>
            {features.map((f) => {
              const props = f.properties as CountyProperties;
              const countyId = props.COUNTYCODE;
              const countyName = props.COUNTYNAME;

              const countyResult = results?.find(
                (r) => r.countyId === countyId,
              );

              const candidates = countyResult?.candidates ?? [];

              const winner = countyResult?.candidates.find(
                (c) => c.elected,
              )?.party;

              const fillColor = winner ? PARTY_COLORS[winner] : "#D3D3D3";

              return (
                <path
                  key={countyId ?? f.id}
                  d={pathGenerator(f) ?? undefined}
                  fill={fillColor}
                  className="map-path"
                  onMouseMove={(e) => {
                    handleMouseMove(e, countyName, candidates);
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    navigate(`/county/${countyId}`);
                  }}
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

export default CountyMap;
