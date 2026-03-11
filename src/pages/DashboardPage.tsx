import { MapPin } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
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
      <header className="flex items-center gap-4 mb-6 shrink-0">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/15">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          2026 縣市長選舉開票地圖
        </h1>
        {isRealTime && (
          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-2 sm:px-2.5 sm:py-1">
            <div className="live-dot"></div>
            <span className="hidden sm:inline text-xs">即時</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <CountyMap topology={countiesTopology} results={results} />
        <ElectionStats results={results} />
      </main>
    </MainLayout>
  );
}

export default DashboardPage;
