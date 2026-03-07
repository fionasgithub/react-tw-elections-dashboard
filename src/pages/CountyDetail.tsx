import { useParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import CountyNotFound from "@/components/CountyDetail/CountyNotFound";
import BreadcrumbNav from "@/components/Navigation/BreadcrumbNav";
import { getCountyResultById } from "@/data/electionResults";

function CountyDetail() {
  const { countyId } = useParams<{ countyId: string }>();
  const result = countyId ? getCountyResultById(countyId) : undefined;

  if (!result) {
    return <CountyNotFound />;
  }

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: "2026 縣市長選舉", to: "/" },
          { label: result.countyName },
        ]}
      ></BreadcrumbNav>
    </MainLayout>
  );
}

export default CountyDetail;
