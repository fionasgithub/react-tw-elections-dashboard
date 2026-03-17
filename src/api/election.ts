import {
  type CountyVotesSummary,
  type TownshipVotesSummary,
  CountyVotesSummaryApiResponseSchema,
  TownshipVotesSummaryApiResponseSchema,
} from "@/models/election.schema";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://api.election.localhost";

export interface CountyVotesSummaryParams {
  year: number;
  type: "mayor"; // current only support "mayor"
  candidateLimit?: number; // optional, show all if not provided
}

export async function fetchCountyVotesSummary(
  params: CountyVotesSummaryParams,
): Promise<CountyVotesSummary[]> {
  const searchParams = new URLSearchParams({
    year: params.year.toString(),
    type: params.type,
    ...(params.candidateLimit
      ? { candidateLimit: params.candidateLimit.toString() }
      : {}),
  });

  const url = `${BASE_URL}/county-votes-summaries?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return CountyVotesSummaryApiResponseSchema.parse(data).data;
}

export interface TownshipVotesSummaryParams {
  year: number;
  type: "mayor"; // current only support "mayor"
  countyCode: string;
  candidateLimit?: number; // optional, show all if not provided
}

export async function fetchTownshipVotesSummary(
  params: TownshipVotesSummaryParams,
): Promise<TownshipVotesSummary[]> {
  const searchParams = new URLSearchParams({
    year: params.year.toString(),
    type: params.type,
    countyCode: params.countyCode,
    ...(params.candidateLimit
      ? { candidateLimit: params.candidateLimit.toString() }
      : {}),
  });

  const url = `${BASE_URL}/town-votes-summaries?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return TownshipVotesSummaryApiResponseSchema.parse(data).data;
}
