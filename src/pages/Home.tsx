import DashboardLayout from "@/components/layout/DashboardLayout";
import TaiwanMainMap from "@/components/Map/TaiwanMainMap";
import countiesTopologyRaw from "@/data/taiwan-counties.json";
import type { CountiesTopology } from "@/types/map";

const countiesTopology = countiesTopologyRaw as unknown as CountiesTopology;

function Home() {
  return (
    <DashboardLayout>
      <TaiwanMainMap topology={countiesTopology} />
    </DashboardLayout>
  );
}

export default Home;
