import MainLayout from "@/components/layout/MainLayout";
import CountyNotFound from "@/components/CountyDetail/CountyNotFound";
import { getCountyResultById } from "@/data/electionResults";

function CountyDetail() {
  const { countyId } = useParams<{ countyId: string }>();
  const result = countyId ? getCountyResultById(countyId) : undefined;

  if (!result) {
    return <CountyNotFound />;
  }

  return (
    <MainLayout>
      <div>County</div>
    </MainLayout>
  );
}

export default CountyDetail;
