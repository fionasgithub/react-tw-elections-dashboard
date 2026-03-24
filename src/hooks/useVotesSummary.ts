import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  type CountyVotesSummaryParams,
  type TownshipVotesSummaryParams,
  fetchCountyVotesSummary,
  fetchTownshipVotesSummary,
} from "@/api/election";
import { transformCountyVotesSummary } from "@/utils/electionTransform";
import { getCountyResults } from "@/data/electionResults";

const fallbackCountyResults = getCountyResults();

export function useCountyVotesSummary(params: CountyVotesSummaryParams) {
  return useQuery({
    queryKey: ["county-votes-summary", params],
    queryFn: () => fetchCountyVotesSummary(params),
    enabled: !!params.year && !!params.type,
    select: (data) => transformCountyVotesSummary(data),
  });
}

export function useTownshipVotesSummary(params: TownshipVotesSummaryParams) {
  return useQuery({
    queryKey: ["township-votes-summary", params],
    queryFn: () => fetchTownshipVotesSummary(params),
    enabled: !!params.year && !!params.type && !!params.countyCode,
  });
}

export function useCountyResults({ year, type }: CountyVotesSummaryParams) {
  const { data, isLoading } = useCountyVotesSummary({ year, type });
  return {
    data: useMemo(() => data ?? fallbackCountyResults, [data]),
    isLoading,
  };
}
