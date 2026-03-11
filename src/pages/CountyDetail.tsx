import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import CountyNotFound from "@/components/CountyDetail/CountyNotFound";
import CandidateTable from "@/components/CountyDetail/CandidateTable";
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

      {/* County detail content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Election Results */}
        <div className="lg:col-span-5 space-y-4">
          {/* County name */}
          <div className="bento-cell">
            <h1 className="text-2xl font-bold text-foreground">
              {result.countyName}即時選情
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">開票進度</span>
              <div className="progress-track flex-1">
                <div
                  className="progress-fill"
                  style={{ width: `${result.votingProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold tabular-nums text-foreground">
                {result.votingProgress.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Candidates */}
          <div className="bento-cell">
            <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
              候選人得票結果
            </h2>
            <CandidateTable data={result.candidates} />
          </div>

          {/* Footnote */}
          <div className="bento-cell text-xs flex items-start gap-2 text-muted-foreground">
            <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"></Info>
            <p>
              得票率 = 該候選人得票數 ÷ 有效票總數 x 100%。
              資料來源：中央選舉委員會。本頁數據僅供參考，最終結果以中選會公告為準。
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CountyDetail;
