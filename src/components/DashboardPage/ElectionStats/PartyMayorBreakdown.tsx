import { TrendingUp } from "lucide-react";
import { type Party, PARTY_COLORS, PARTY_NAMES } from "@/types/elections";

interface PartyMayorBreakdownProps {
  stats: [Party, number][];
  totalCounties: number;
}

const PartyMayorBreakdown = ({
  stats,
  totalCounties,
}: PartyMayorBreakdownProps) => {
  return (
    <div className="bento-cell">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          政黨縣市長當選數
        </h3>
      </div>

      <div className="space-y-3">
        {stats.map(([party, seats]) => {
          const percentage = ((seats / totalCounties) * 100).toFixed(0);

          return (
            <div key={party}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="party-dot"
                    style={{ backgroundColor: PARTY_COLORS[party] }}
                  ></span>
                  <span className="text-foreground">{PARTY_NAMES[party]}</span>
                </div>
                <span className="font-bold tabular-nums text-foreground">
                  {seats} 名
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: PARTY_COLORS[party as Party],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartyMayorBreakdown;
