import { useNavigate } from "react-router-dom";
import { PARTY_COLORS, type Party } from "@/types/elections";

interface CountyWinnersListProps {
  countyId: string;
  countyName: string;
  winner: string;
  party: Party;
  voteRate: number;
}

const CountyWinnersList = ({ stats }: { stats: CountyWinnersListProps[] }) => {
  const navigate = useNavigate();

  return (
    <div className="bento-cell">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        最新開票結果
      </h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {stats.map((stat) => {
          return (
            <div
              key={stat.countyId}
              className="flex items-center gap-2 rounded-md bg-secondary/30 px-3 py-2 text-sm cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => {
                navigate(`/county/${stat.countyId}`);
              }}
            >
              <span
                className="party-dot"
                style={{
                  backgroundColor: PARTY_COLORS[stat.party],
                  width: 8,
                  height: 8,
                }}
              />
              <span className="font-medium text-foreground">
                {stat.countyName}
              </span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">{stat.winner}</span>
              <span className="ml-auto font-bold tabular-nums text-foreground">
                {stat.voteRate.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountyWinnersList;
