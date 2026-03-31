import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  type CountyVotesSummaryParams,
  type TownshipVotesSummaryParams,
  fetchCountyVotesSummary,
  fetchTownshipVotesSummary,
} from "@/api/election";
import {
  transformCountyVotesSummary,
  transformTownshipVotesSummary,
} from "@/utils/electionTransform";
import { getCountyResults, getTownshipsByCounty } from "@/data/electionResults";

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
    select: (data) => transformTownshipVotesSummary(data),
  });
}

export function useCountyResults({ year, type }: CountyVotesSummaryParams) {
  const { data, isLoading } = useCountyVotesSummary({ year, type });
  return {
    data: useMemo(() => data ?? getCountyResults(), [data]),
    isLoading,
  };
}

export function useTownshipResults({
  year,
  type,
  countyCode,
}: TownshipVotesSummaryParams) {
  const { data, isLoading } = useTownshipVotesSummary({
    year,
    type,
    countyCode,
  });

  return {
    data: useMemo(
      () => data ?? (countyCode ? getTownshipsByCounty(countyCode) : []),
      [data, countyCode],
    ),
    isLoading,
  };
}
