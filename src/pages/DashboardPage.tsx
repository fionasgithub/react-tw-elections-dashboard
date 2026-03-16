import { useMemo, useEffect } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import DashboardHeader from "@/components/DashboardPage/Header";
import CountyMap from "@/components/Map/CountyMap";
import ElectionStats from "@/components/DashboardPage/ElectionStats";
import { getCountyResults } from "@/data/electionResults";
import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";
import { useCountyVotesSummary } from "@/hooks/useVotesSummary";
import { transformCountyVotesSummary } from "@/utils/electionTransform";
import { useElectionStore } from "@/store/useElectionStore";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;
const fallbackResults = getCountyResults();

function DashboardPage() {
  const isRealTime = true; // placeholder for real-time data

  const setCountyResults = useElectionStore((state) => state.setCountyResults);

  const { data: countyVotesSummary, isLoading } = useCountyVotesSummary({
    year: 2022,
    type: "mayor",
  });

  const results = useMemo(() => {
    if (countyVotesSummary) {
      return transformCountyVotesSummary(countyVotesSummary);
    }
    return fallbackResults;
  }, [countyVotesSummary]);

  useEffect(() => {
    setCountyResults(results);
  }, [results]);

  return (
    <MainLayout
      className="flex flex-col lg:h-screen lg:overflow-hidden"
      containerClassName="w-full flex-1 flex flex-col min-h-0"
    >
      {/* Header Section */}
      <DashboardHeader isRealTime={isRealTime} />

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <CountyMap
          topology={countiesTopology}
          results={results}
          isLoading={isLoading}
        />
        <ElectionStats results={results} />
      </main>
    </MainLayout>
  );
}

export default DashboardPage;
