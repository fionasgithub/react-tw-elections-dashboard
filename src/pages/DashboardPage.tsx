import MainLayout from "@/components/Layout/MainLayout";
import DashboardHeader from "@/components/DashboardPage/Header";
import CountyMap from "@/components/Map/CountyMap";
import ElectionStats from "@/components/DashboardPage/ElectionStats";
import { getCountyResults } from "@/data/electionResults";
import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;
const results = getCountyResults();

function DashboardPage() {
  const isRealTime = true; // Placeholder for real-time status

  return (
    <MainLayout
      className="flex flex-col lg:h-screen lg:overflow-hidden"
      containerClassName="w-full flex-1 flex flex-col min-h-0"
    >
      {/* Header Section */}
      <DashboardHeader isRealTime={isRealTime} />

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <CountyMap topology={countiesTopology} results={results} />
        <ElectionStats results={results} />
      </main>
    </MainLayout>
  );
}

export default DashboardPage;
