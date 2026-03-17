import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import CountyDetail from "@/pages/CountyDetail";
import { getCountyResults } from "@/data/electionResults";
import { useCountyVotesSummary } from "@/hooks/useVotesSummary";
import { transformCountyVotesSummary } from "@/utils/electionTransform";
import { useElectionStore } from "@/store/useElectionStore";

const fallbackResults = getCountyResults();

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/county/:countyId" element={<CountyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
