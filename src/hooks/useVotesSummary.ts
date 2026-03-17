import { useQuery } from "@tanstack/react-query";
import {
  type CountyVotesSummaryParams,
  type TownshipVotesSummaryParams,
  fetchCountyVotesSummary,
  fetchTownshipVotesSummary,
} from "@/api/election";

export function useCountyVotesSummary(params: CountyVotesSummaryParams) {
  return useQuery({
    queryKey: ["county-votes-summary", params],
    queryFn: () => fetchCountyVotesSummary(params),
    enabled: !!params.year && !!params.type,
  });
}

export function useTownshipVotesSummary(params: TownshipVotesSummaryParams) {
  return useQuery({
    queryKey: ["township-votes-summary", params],
    queryFn: () => fetchTownshipVotesSummary(params),
    enabled: !!params.year && !!params.type && !!params.countyCode,
  });
}
