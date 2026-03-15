import { TriangleAlert } from "lucide-react";
import { PARTY_COLORS, type Candidate } from "@/types/elections";

interface MapTooltipProps {
  x: number;
  y: number;
  countyName: string;
  candidates: Candidate[];
  isSpecialElection?: boolean;
  note?: string;
  visible: boolean;
}

const MapTooltip = ({
  x,
  y,
  countyName,
  candidates,
  isSpecialElection,
  note,
  visible,
}: MapTooltipProps) => {
  if (!visible) return null;

  return (
    <div
      className="map-tooltip"
      style={{
        left: x + 16,
        top: y - 8,
        maxWidth: isSpecialElection ? 260 : undefined,
      }}
    >
      <div className="mb-1.5 font-semibold text-foreground">{countyName}</div>

      {isSpecialElection ? (
        <div className="flex items-start gap-1.5 rounded-sm border border-amber-500/40 bg-amber-500/10 px-2 py-1.5">
          <TriangleAlert className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
          <p className="text-[11px] leading-relaxed text-amber-200">
            {note ?? "本次選舉因特殊情況延期，無開票資料。"}
          </p>
        </div>
      ) : candidates.length > 0 ? (
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
      ) : null}
    </div>
  );
};

export default MapTooltip;
