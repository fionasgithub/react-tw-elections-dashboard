import { useState, useRef, useEffect } from "react";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { PARTY_COLORS, type CountyResult } from "@/types/elections";
import type { CountiesTopology, CountyProperties } from "@/types/map";

interface TaiwanMainMapProps {
  topology: CountiesTopology | null;
  results?: CountyResult[];
}

const TaiwanMainMap = ({ topology, results }: TaiwanMainMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  const { features, pathGenerator } = useTaiwanMap<CountyProperties>(
    topology,
    "COUNTY_MOI_1140318",
    dimensions.width,
    dimensions.height,
  );

  const [, setSelectedCounty] = useState<string>("");

  return (
    <div className="bento-cell col-span-12 lg:col-span-8 flex flex-col gap-3 min-h-0">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-lg font-semibold">全台縣市地圖</h2>
        <span className="text-xs text-muted-foreground">點擊縣市查看詳情</span>
      </div>

      {/* SVG map */}
      <div ref={containerRef} className="flex-1 min-h-0">
        {pathGenerator && dimensions.width > 0 && (
          <svg width={dimensions.width} height={dimensions.height}>
            {features.map((f) => {
              const props = f.properties as CountyProperties;
              const countyId = props.COUNTYCODE;
              const countyResult = results?.find(
                (r) => r.countyId === countyId,
              );
              const winner = countyResult?.candidates.find(
                (c) => c.elected,
              )?.party;
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
    </div>
  );
};

export default TaiwanMainMap;
