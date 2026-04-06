import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTaiwanMap } from "@/hooks/useTaiwanMap";
import { PARTY_COLORS, type CountyResult, type Party } from "@/types/elections";
import type { CountiesTopology, CountyProperties } from "@/types/map";
import MapLegend from "@/components/Map/MapLegend";
import MapTooltip from "@/components/Map/MapTooltip";
import { useMapTooltip } from "@/hooks/useMapTooltip";
import {
  OFFSHORE_COUNTY_CODES,
  OFFSHORE_LABELS,
  makeInsetPathGenerator,
} from "@/lib/countyMapInsets";
import type { Feature, Geometry } from "geojson";

interface CountyMapProps {
  topology: CountiesTopology | null;
  results: CountyResult[];
  isLoading: boolean;
}

const CountyMap = ({ topology, results, isLoading }: CountyMapProps) => {
  const navigate = useNavigate();

  const resultMap = useMemo(() => {
    return new Map(results.map((r) => [r.countyId, r]));
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

  const { features, pathGenerator } = useTaiwanMap<CountyProperties>(
    topology,
    "COUNTY_MOI_1140318",
    null,
  );

  const mainlandFeatures = useMemo(() => {
    return features.filter(
      (f) =>
        !OFFSHORE_COUNTY_CODES.includes(
          (f.properties as CountyProperties).COUNTYCODE,
        ),
    );
  }, [features]);

  // To ensure hovered county is on top, render the stroke properly.
  const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null);

  const sortedFeatures = useMemo(() => {
    if (!hoveredCountyId) return mainlandFeatures;

    return [
      ...mainlandFeatures.filter(
        (f) =>
          (f.properties as CountyProperties).COUNTYCODE !== hoveredCountyId,
      ),
      ...mainlandFeatures.filter(
        (f) =>
          (f.properties as CountyProperties).COUNTYCODE === hoveredCountyId,
      ),
    ];
  }, [mainlandFeatures, hoveredCountyId]);

  const { tooltip, handleMouseMove, handleMouseLeave } = useMapTooltip();

  return (
    <div className="bento-cell col-span-12 lg:col-span-8 flex flex-col gap-3 min-h-0">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-lg font-semibold">全台縣市地圖</h2>
        <span className="text-xs text-muted-foreground">點擊縣市查看詳情</span>
      </div>

      <div className="flex flex-1 flex-wrap gap-2">
        {/* Offshore counties maps */}
        <div className="flex md:flex-col order-1 md:order-0 gap-2">
          {!isLoading &&
            OFFSHORE_COUNTY_CODES.length > 0 &&
            OFFSHORE_COUNTY_CODES.map((code) => {
              const feature = features.find(
                (f) => (f.properties as CountyProperties).COUNTYCODE === code,
              ) as Feature<Geometry, CountyProperties> | undefined;
              if (!feature) return null;
              const insetPathGenerator = makeInsetPathGenerator(
                feature,
                140,
                110,
              );
              const props = feature.properties as CountyProperties;
              const countyId = props.COUNTYCODE;

              const countyResult = resultMap.get(countyId);
              const countyName = props.COUNTYNAME;
              const candidates = countyResult?.candidates ?? [];
              const isSpecialElection = countyResult?.isSpecialElection;
              const note = countyResult?.note;

              const winner = countyResult?.candidates.find(
                (c) => c.elected,
              )?.party;
              const fill = winner ? PARTY_COLORS[winner] : PARTY_COLORS.EMPTY;

              return (
                <div
                  key={code}
                  className="relative border-2 rounded overflow-hidden bg-background w-auto md:w-[140px] h-[110px]"
                >
                  <svg
                    className="block w-full h-auto"
                    viewBox="0 0 140 110"
                    onMouseEnter={(e) => {
                      handleMouseMove(
                        e,
                        countyName,
                        candidates,
                        isSpecialElection,
                        note,
                      );
                      setHoveredCountyId(countyId);
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave();
                      setHoveredCountyId(null);
                    }}
                    onClick={() => {
                      navigate(`/county/${countyId}`);
                    }}
                  >
                    <path
                      className="map-path"
                      d={insetPathGenerator(feature) ?? undefined}
                      fill={fill}
                      stroke="currentColor"
                      strokeWidth={0.5}
                    ></path>
                  </svg>
                  <span className="pointer-events-none absolute inset-0 flex text-sm font-medium text-foreground/80 drop-shadow-sm p-2">
                    {OFFSHORE_LABELS[code]}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Mainland map */}
        <div className="flex-1 min-h-[360px] max-h-[500px]">
          {pathGenerator && sortedFeatures.length > 0 && !isLoading ? (
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

                const countyResult = resultMap.get(countyId);

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
                    : PARTY_COLORS.EMPTY;

                return (
                  <path
                    key={countyId ?? f.id}
                    d={pathGenerator(f) ?? undefined}
                    fill={fillColor}
                    className="map-path"
                    onMouseEnter={(e) => {
                      handleMouseMove(
                        e,
                        countyName,
                        candidates,
                        isSpecialElection,
                        note,
                      );
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
