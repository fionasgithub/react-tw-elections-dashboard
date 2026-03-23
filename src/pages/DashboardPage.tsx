import MainLayout from "@/components/Layout/MainLayout";
import Header from "@/components/DashboardPage/Header";
import CountyMap from "@/components/Map/CountyMap";
import ElectionStats from "@/components/DashboardPage/ElectionStats";
import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";
import { useElectionStore } from "@/store/useElectionStore";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;

function DashboardPage() {
  const isRealTime = true; // placeholder for real-time data

  const results = useElectionStore((state) => state.countyResults);
  const isLoading = useElectionStore((state) => state.countyResultsLoading);

  return (
    <MainLayout
      className="flex flex-col lg:h-screen lg:overflow-hidden"
      containerClassName="w-full flex-1 flex flex-col min-h-0"
    >
      {/* Header Section */}
      <Header isRealTime={isRealTime} />

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
