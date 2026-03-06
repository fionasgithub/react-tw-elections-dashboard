import { Vote, Users, BarChart3 } from "lucide-react";
import QuickStats from "@/components/DashboardPage/ElectionStats/QuickStats";
import PartyMayorBreakdown from "@/components/DashboardPage/ElectionStats/PartyMayorBreakdown";
import { type CountyResult, type Party } from "@/types/elections";
import { getWinnerParty } from "@/data/electionResults";

interface ElectionStatsProps {
  results: CountyResult[];
}

const ElectionStats = ({ results }: ElectionStatsProps) => {
  // Calculate stats
  const totalCounties = results.length;
  const countedCounties = results.filter((r) => r.votingProgress > 0).length;
  const avgProgress =
    results.reduce((sum, r) => sum + r.votingProgress, 0) / totalCounties;

  const stats = [
    {
      icon: BarChart3,
      label: "平均開票進度",
      value: `${avgProgress.toFixed(1)}%`,
      color: "text-blue-400",
    },
    {
      icon: Vote,
      label: "已開票縣市",
      value: `${countedCounties} / ${totalCounties}`,
      color: "text-emerald-400",
    },
    {
      icon: Users,
      label: "總投票人數",
      value: results
        .reduce(
          (sum, r) => sum + r.candidates.reduce((s, c) => s + c.votes, 0),
          0,
        )
        .toLocaleString(),
      color: "text-amber-400",
    },
  ];

  // Party mayor breakdown
  const partyMayorCount = new Map<Party, number>();
  results.forEach((r) => {
    const winner = getWinnerParty(r.candidates) as Party | undefined;
    if (winner) {
      partyMayorCount.set(winner, (partyMayorCount.get(winner) ?? 0) + 1);
    }
  });

  const sortedParties = [...partyMayorCount.entries()].sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
      <QuickStats stats={stats} />
      <PartyMayorBreakdown
        stats={sortedParties}
        totalCounties={totalCounties}
      />
    </div>
  );
};

export default ElectionStats;
