import { MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import TaiwanMainMap from "@/components/Map/TaiwanMainMap";
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
      className="flex flex-col"
      containerClassName="w-full flex-1 flex flex-col min-h-0"
    >
      {/* Header Section */}
      <header className="flex items-center gap-4 mb-6 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          2026 九合一選舉即時開票
        </h1>
        {isRealTime && (
          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1">
            <div className="live-dot"></div>
            <span className="text-xs">即時</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <TaiwanMainMap topology={countiesTopology} results={results} />
        <ElectionStats results={results} />
      </main>
    </MainLayout>
  );
}

export default DashboardPage;
