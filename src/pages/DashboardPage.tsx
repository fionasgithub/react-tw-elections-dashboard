import { useMemo } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import DashboardHeader from "@/components/DashboardPage/Header";
import CountyMap from "@/components/Map/CountyMap";
import ElectionStats from "@/components/DashboardPage/ElectionStats";
import { getCountyResults } from "@/data/electionResults";
import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";
import { useCountyVotesSummary } from "@/hooks/useVotesSummary";
import { transformCountyVotesSummary } from "@/utils/electionTransform";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;
const fallbackResults = getCountyResults();

function DashboardPage() {
  const {
    data: countyVotesSummary,
    isLoading,
    isError,
    isSuccess,
  } = useCountyVotesSummary({
    year: 2022,
    type: "mayor",
  });

  const isRealTime = isSuccess && !isError;

  const results = useMemo(() => {
    if (countyVotesSummary) {
      return transformCountyVotesSummary(countyVotesSummary);
    }
    return fallbackResults;
  }, [countyVotesSummary]);

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
