import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Info, TriangleAlert } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import HeaderActions from "@/components/Common/HeaderActions";
import CountyNotFound from "@/components/CountyDetail/CountyNotFound";
import CandidateTable from "@/components/CountyDetail/CandidateTable";
import TownshipMap from "@/components/Map/TownshipMap";
import BreadcrumbNav from "@/components/Navigation/BreadcrumbNav";
import {
  getCountyResultById,
  getTownshipsByCounty,
} from "@/data/electionResults";
import townsTopologyRaw from "@/data/taiwan-towns.json";
import type { TownsTopology } from "@/types/map";
import { useTownshipVotesSummary } from "@/hooks/useVotesSummary";
import { useElectionStore } from "@/store/useElectionStore";
import { transformTownshipVotesSummary } from "@/utils/electionTransform";

const townsTopology = townsTopologyRaw as unknown as TownsTopology;

function CountyDetail() {
  const { countyId } = useParams<{ countyId: string }>();
  const safeCountyId = countyId ?? "";

  const result = useElectionStore((state) =>
    state.countyResults.find((r) => r.countyId === safeCountyId),
  );

  const fallbackCountyInfo = useMemo(
    () => (safeCountyId ? getCountyResultById(safeCountyId) : null),
    [safeCountyId],
  );

  const countyInfo = result ?? fallbackCountyInfo;

  const fallbackTownResults = useMemo(
    () => getTownshipsByCounty(safeCountyId),
    [safeCountyId],
  );

  const { data: townshipVotesSummary } = useTownshipVotesSummary({
    year: 2022,
    type: "mayor",
    countyCode: safeCountyId,
  });

  const townshipResults = useMemo(() => {
    if (townshipVotesSummary) {
      return transformTownshipVotesSummary(townshipVotesSummary);
    }
    return fallbackTownResults;
  }, [townshipVotesSummary, fallbackTownResults]);

  if (!countyInfo) {
    return <CountyNotFound />;
  }

  return (
    <MainLayout containerClassName="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-between items-center gap-2">
        <BreadcrumbNav
          items={[
            { label: "2022 縣市長選舉", to: "/" },
            { label: countyInfo.countyName },
          ]}
        ></BreadcrumbNav>

        <HeaderActions />
      </div>

      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        返回全台地圖
      </Link>

      {/* Special Election Notice Banner */}
      {countyInfo.isSpecialElection && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <div className="flex items-start gap-3">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-300">
                本縣市於 2022/11/26 投票日未舉行選舉
              </p>
              <p className="text-sm text-amber-200/80">{countyInfo.note}</p>
              <a
                href="https://zh.wikipedia.org/zh-tw/2022%E5%B9%B4%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%9C%B0%E6%96%B9%E5%85%AC%E8%81%B7%E4%BA%BA%E5%93%A1%E9%81%B8%E8%88%89#:~:text=%E5%98%89%E7%BE%A9%E5%B8%82%E5%B8%82%E9%95%B7%E9%81%B8%E8%88%89%E5%9B%A0%E5%80%99%E9%81%B8%E4%BA%BA%E7%97%85%E9%80%9D%EF%BC%8C%E9%81%B8%E8%88%89%E6%97%A5%E6%9C%9F%E5%BB%B6%E8%87%B32022%E5%B9%B412%E6%9C%8818%E6%97%A5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-amber-400 underline underline-offset-2 hover:text-amber-300 transition-colors"
              >
                查看補選詳情
              </a>
            </div>
          </div>
        </div>
      )}

      {/* County detail content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Election Results */}
        <div className="lg:col-span-5 space-y-4">
          {/* County name */}
          <div className="bento-cell">
            <h1 className="text-2xl font-bold text-foreground">
              {countyInfo.countyName}即時選情
            </h1>
            {!countyInfo.isSpecialElection && (
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">開票進度</span>
                <div className="progress-track flex-1">
                  <div
                    className="progress-fill"
                    style={{ width: `${countyInfo.votingProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold tabular-nums text-foreground">
                  {countyInfo.votingProgress.toFixed(1)}%
                </span>
              </div>
            )}
          </div>

          {/* Candidates */}
          <div className="bento-cell">
            <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
              候選人得票結果
            </h2>
            {countyInfo.isSpecialElection ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
                <TriangleAlert className="h-8 w-8 text-amber-500/50" />
                <p className="text-sm">本次投票日無候選人開票資料</p>
                <p className="text-xs text-muted-foreground/60">
                  選舉延期至 2022 年 12 月 18 日舉行
                </p>
              </div>
            ) : (
              <div className="max-h-[55vh] min-h-[300px] overflow-auto">
                <CandidateTable data={countyInfo.candidates} />
              </div>
            )}
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

        {/* Right: Township Map */}
        <div className="lg:col-span-7">
          {countyId && (
            <TownshipMap
              topology={townsTopology}
              countyId={countyId}
              results={townshipResults}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CountyDetail;
