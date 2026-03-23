import { TriangleAlert } from "lucide-react";
import CandidateTable from "@/components/CountyDetail/CountyElectionStats/CandidateTable";
import FootNote from "@/components/CountyDetail/CountyElectionStats/FootNote";
import VoteProgress from "@/components/CountyDetail/CountyElectionStats/VoteProgress";
import type { Candidate } from "@/types/elections";

interface CountyElectionStatsProps {
  countyName: string;
  isSpecialElection: boolean;
  note: string;
  votingProgress: number;
  candidates: Candidate[];
}

const CountyElectionStats = ({
  countyName,
  isSpecialElection,
  note,
  votingProgress,
  candidates,
}: CountyElectionStatsProps) => {
  return (
    <div className="relative z-0 flex min-w-0 flex-col gap-4 lg:col-span-5">
      {/* County name and vote progress */}
      <div className="bento-cell">
        <h1 className="text-2xl font-bold text-foreground">{countyName}選情</h1>
        {!isSpecialElection && <VoteProgress progress={votingProgress} />}
      </div>

      {/* Candidates */}
      <div className="bento-cell">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
          候選人得票結果
        </h2>
        {isSpecialElection ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
            <TriangleAlert className="h-8 w-8 text-amber-500/50" />
            <p className="text-sm font-semibold text-amber-300">
              本次投票日無候選人開票資料
            </p>
            <p className="text-sm text-amber-200/80">{note}</p>
          </div>
        ) : (
          <CandidateTable data={candidates} />
        )}
      </div>

      {/* Footnote */}
      <FootNote />
    </div>
  );
};

export default CountyElectionStats;
