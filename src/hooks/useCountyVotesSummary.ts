import { useQuery } from "@tanstack/react-query";
import {
  type CountyVotesSummaryParams,
  fetchCountyVotesSummary,
} from "@/api/election";

export function useCountyVotesSummary(params: CountyVotesSummaryParams) {
  return useQuery({
    queryKey: ["county-votes-summary", params],
    queryFn: () => fetchCountyVotesSummary(params),
    enabled: !!params.year && !!params.type,
  });
}
