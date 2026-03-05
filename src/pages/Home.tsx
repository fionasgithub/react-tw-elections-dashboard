import DashboardLayout from "@/components/layout/DashboardLayout";
import TaiwanMainMap from "@/components/Map/TaiwanMainMap";
import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";
import { getCountyResults } from "@/data/electionResults";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;
const results = getCountyResults();

function Home() {
  return (
    <DashboardLayout title="2026 九合一選舉即時開票">
      <TaiwanMainMap topology={countiesTopology} results={results} />
    </DashboardLayout>
  );
}

export default Home;
