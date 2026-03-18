import { Suspense, lazy, useEffect, useMemo } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import { getCountyResults } from "@/data/electionResults";
import { useCountyVotesSummary } from "@/hooks/useVotesSummary";
import { transformCountyVotesSummary } from "@/utils/electionTransform";
import { useElectionStore } from "@/store/useElectionStore";

const fallbackResults = getCountyResults();
const CountyDetail = lazy(() => import("@/pages/CountyDetail"));

function App() {
  const setCountyResults = useElectionStore((state) => state.setCountyResults);
  const setCountyResultsLoading = useElectionStore(
    (state) => state.setCountyResultsLoading,
  );

  const { data: countyVotesSummary, isLoading } = useCountyVotesSummary({
    year: 2022,
    type: "mayor",
  });

  const results = useMemo(() => {
    if (countyVotesSummary) {
      return transformCountyVotesSummary(countyVotesSummary);
    }
    return fallbackResults;
  }, [countyVotesSummary]);

  useEffect(() => {
    setCountyResults(results);
  }, [results, setCountyResults]);

  useEffect(() => {
    setCountyResultsLoading(isLoading);
  }, [isLoading, setCountyResultsLoading]);

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="p-6 text-sm text-muted-foreground">載入中…</div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/county/:countyId" element={<CountyDetail />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
