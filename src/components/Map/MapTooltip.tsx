import { PARTY_COLORS, type Candidate } from "@/types/elections";

interface MapTooltipProps {
  x: number;
  y: number;
  countyName: string;
  candidates: Candidate[];
  visible: boolean;
}

const MapTooltip = ({
  x,
  y,
  countyName,
  candidates,
  visible,
}: MapTooltipProps) => {
  if (!visible) return null;

  return (
    <div
      className="map-tooltip"
      style={{
        left: x + 16,
        top: y - 8,
      }}
    >
      <div className="mb-1 font-semibold text-foreground">{countyName}</div>

      {candidates.length > 0 && (
        <div className="space-y-0.5">
          {candidates.map((candidate, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span
                className="party-dot"
                style={{
                  backgroundColor: PARTY_COLORS[candidate.party],
                  width: 7,
                  height: 7,
                }}
              ></span>
              <span className="text-foreground">{candidate.name}</span>
              <span className="ml-auto font-medium tabular-nums text-foreground">
                {candidate.voteRate.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapTooltip;
