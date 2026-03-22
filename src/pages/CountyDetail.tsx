import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import HeaderActions from "@/components/Common/HeaderActions";
import CountyNotFound from "@/components/CountyDetail/CountyNotFound";
import CandidateTable from "@/components/CountyDetail/CandidateTable";
import FootNote from "@/components/CountyDetail/FootNote";
import NoticeBanner from "@/components/CountyDetail/NoticeBanner";
import VoteProgress from "@/components/CountyDetail/VoteProgress";
import TownshipMap from "@/components/Map/TownshipMap";
import BreadcrumbNav from "@/components/Navigation/BreadcrumbNav";
import {
  getCountyResultById,
  getTownshipsByCounty,
} from "@/data/electionResults";
import type { TownsTopology } from "@/types/map";
import { useTownshipVotesSummary } from "@/hooks/useVotesSummary";
import { useElectionStore } from "@/store/useElectionStore";
import { transformTownshipVotesSummary } from "@/utils/electionTransform";

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

  const [townsTopology, setTownsTopology] = useState<TownsTopology | null>(
    null,
  );
  const [topologyError, setTopologyError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setTopologyError(null);
    setTownsTopology(null);

    import("@/data/taiwan-towns.json")
      .then((mod) => {
        if (cancelled) return;
        setTownsTopology(mod.default as unknown as TownsTopology);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setTopologyError(
          err instanceof Error ? err.message : "載入地圖資料失敗",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!countyInfo) {
    return <CountyNotFound />;
  }

  return (
    <MainLayout
      className="flex flex-col lg:h-screen lg:overflow-hidden"
      containerClassName="flex w-full min-h-0 flex-1 flex-col gap-4"
    >
      {/* Header */}
      <div className="flex shrink-0 flex-between items-center gap-2">
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
        className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        返回全台地圖
      </Link>

      {/* Special Election Notice Banner */}
      {countyInfo.isSpecialElection && (
        <NoticeBanner
          note={countyInfo.note ?? "本次選舉因特殊情況延期，無開票資料。"}
        />
      )}

      {/* County detail content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 flex-1 min-h-0">
        {/* Left: Election Results */}
        <div className="flex min-h-0 flex-col gap-4 lg:col-span-5 lg:min-h-0 lg:overflow-y-auto lg:pr-3">
          {/* County name and vote progress */}
          <div className="bento-cell">
            <h1 className="text-2xl font-bold text-foreground">
              {countyInfo.countyName}選情
            </h1>
            {!countyInfo.isSpecialElection && (
              <VoteProgress progress={countyInfo.votingProgress} />
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
              </div>
            ) : (
              <div className="max-h-[55vh] min-h-[300px] overflow-auto">
                <CandidateTable data={countyInfo.candidates} />
              </div>
            )}
          </div>

          {/* Footnote */}
          <FootNote />
        </div>

        {/* Right: Township Map */}
        <div className="min-h-0 lg:col-span-7">
          {topologyError ? (
            <div className="bento-cell text-sm text-destructive">
              地圖資料載入失敗：{topologyError}
            </div>
          ) : countyId && townsTopology ? (
            <TownshipMap
              topology={townsTopology}
              countyId={countyId}
              results={townshipResults}
            />
          ) : (
            <div className="bento-cell text-sm text-muted-foreground">
              載入地圖中…
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CountyDetail;
