import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <MainLayout containerClassName="flex flex-col gap-4">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: "2026 縣市長選舉", to: "/" },
          { label: result.countyName },
        ]}
      ></BreadcrumbNav>

      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        返回全台地圖
      </Link>
    </MainLayout>
  );
}

export default CountyDetail;
