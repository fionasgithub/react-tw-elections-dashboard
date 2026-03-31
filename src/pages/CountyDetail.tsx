import { useMemo } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "@/components/Layout/MainLayout";
import CountyElectionStats from "@/components/CountyDetail/CountyElectionStats";
import CountyNotFound from "@/components/CountyDetail/CountyNotFound";
import Header from "@/components/CountyDetail/Header";
import TownshipMap from "@/components/Map/TownshipMap";

import { useCountyResults, useTownshipResults } from "@/hooks/useVotesSummary";
import { getCountyResultById } from "@/data/electionResults";

import townsTopologyRaw from "@/data/taiwan-towns.json";
import type { TownsTopology } from "@/types/map";

const townsTopology = townsTopologyRaw as unknown as TownsTopology;

function CountyDetail() {
  const { countyId } = useParams<{ countyId: string }>();
  const safeCountyId = countyId ?? "";

  const { data: countyResults } = useCountyResults({
    year: 2022,
    type: "mayor",
  });

  const countyInfo = useMemo(() => {
    if (!safeCountyId) return null;
    if (!countyResults) return getCountyResultById(safeCountyId);
    return countyResults?.find((r) => r.countyId === safeCountyId) ?? null;
  }, [countyResults, safeCountyId]);

  const { data: townshipResults } = useTownshipResults({
    year: 2022,
    type: "mayor",
    countyCode: safeCountyId,
  });

  if (!countyInfo) {
    return <CountyNotFound />;
  }

  return (
    <MainLayout
      className="flex flex-col"
      containerClassName="flex w-full flex-col gap-0"
    >
      {/* Header Section */}
      <Header countyName={countyInfo.countyName} />

      {/* Main content */}
      <main className="mt-24 md:mt-28 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 flex-1 min-h-0">
          <CountyElectionStats
            countyName={countyInfo.countyName}
            isSpecialElection={countyInfo.isSpecialElection ?? false}
            note={countyInfo.note ?? ""}
            votingProgress={countyInfo.votingProgress}
            candidates={countyInfo.candidates}
          />

          <div className="min-w-0 lg:sticky lg:top-36 lg:z-20 lg:col-span-7 lg:self-start lg:bg-background">
            {countyId && (
              <TownshipMap
                topology={townsTopology}
                countyId={countyId}
                results={townshipResults}
              />
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default CountyDetail;
