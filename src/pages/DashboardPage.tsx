import MainLayout from "@/components/Layout/MainLayout";
import Header from "@/components/DashboardPage/Header";
import CountyMap from "@/components/Map/CountyMap";
import ElectionStats from "@/components/DashboardPage/ElectionStats";

import { useCountyResults } from "@/hooks/useVotesSummary";

import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;

function DashboardPage() {
  const isRealTime = true; // placeholder for real-time data

  const { data, isLoading } = useCountyResults({ year: 2022, type: "mayor" });

  return (
    <MainLayout
      className="flex flex-col lg:h-screen lg:overflow-hidden"
      containerClassName="w-full flex flex-col min-h-0"
    >
      <Header isRealTime={isRealTime} />

      <main className="grid grid-cols-12 gap-4 min-h-0">
        <CountyMap
          topology={countiesTopology}
          results={data}
          isLoading={isLoading}
        />
        <ElectionStats results={data} isLoading={isLoading} />
      </main>
    </MainLayout>
  );
}

export default DashboardPage;
