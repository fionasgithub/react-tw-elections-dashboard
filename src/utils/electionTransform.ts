import type {
  CountyVotesSummary,
  TownshipVotesSummary,
} from "@/models/election.schema";
import type {
  CountyResult,
  Candidate,
  Party,
  TownshipResult,
} from "@/types/elections";
import {
  PARTY_NAMES as PARTY_NAMES_MAP,
  PARTY_COLORS,
} from "@/types/elections";

// 因 API 不含補選縣市資料，在此手動補上。
const SPECIAL_ELECTION_OVERRIDES: Record<
  string,
  Omit<CountyResult, "countyId">
> = {
  "10020": {
    countyName: "嘉義市",
    votingProgress: 0,
    candidates: [],
    isSpecialElection: true,
    note: "嘉義市市長選舉因特殊情況延期，選舉日期延至2022年12月18日，本次投票日（2022/11/26）無開票資料。",
  },
};

/**
 * Converts API CountyVotesSummary[] to frontend CountyResult[].
 *
 * Field mappings:
 *   countyCode   → countyId
 *   voteShare    → voteRate
 *   elected      → derived from highest voteShare
 *   votingProgress → not provided by API; defaults to 100
 *   party (Chinese full name) → Party code via PARTY_NAMES reverse lookup
 */

const PARTY_NAME_TO_CODE = Object.fromEntries(
  (Object.entries(PARTY_NAMES_MAP) as [Party, string][]).map(([code, name]) => [
    name,
    code,
  ]),
) as Record<string, Party>;

function resolveParty(raw: string): Party {
  if (PARTY_NAME_TO_CODE[raw]) return PARTY_NAME_TO_CODE[raw];
  const asParty = raw as Party;
  return asParty in PARTY_COLORS ? asParty : "IND";
}

export function transformCountyVotesSummary(
  summaries: CountyVotesSummary[],
): CountyResult[] {
  const transformed = summaries.map((summary) => {
    const maxVoteShare = Math.max(
      ...summary.candidates.map((c) => c.voteShare),
    );

    const candidates: Candidate[] = summary.candidates.map((c) => ({
      name: c.name,
      party: resolveParty(c.party),
      votes: c.votes,
      voteRate: c.voteShare,
      elected: maxVoteShare > 0 && c.voteShare === maxVoteShare,
    }));

    return {
      countyId: summary.countyCode,
      countyName: summary.countyName,
      votingProgress: 100,
      candidates,
    };
  });

  // 若 API 不含補選縣市資料(override)，在此手動補上。
  for (const [countyId, override] of Object.entries(
    SPECIAL_ELECTION_OVERRIDES,
  )) {
    if (!transformed.some((r) => r.countyId === countyId)) {
      transformed.push({ countyId, ...override });
    }
  }

  return transformed;
}

export function transformTownshipVotesSummary(
  summaries: TownshipVotesSummary[],
): TownshipResult[] {
  const transformed = summaries.map((summary) => {
    const maxVoteShare = Math.max(
      ...summary.candidates.map((c) => c.voteShare),
    );

    const candidates: Candidate[] = summary.candidates.map((c) => ({
      name: c.name,
      party: resolveParty(c.party),
      votes: c.votes,
      voteRate: c.voteShare,
      elected: maxVoteShare > 0 && c.voteShare === maxVoteShare,
    }));

    return {
      countyId: summary.countyCode,
      townshipId: summary.townCode,
      townshipName: summary.townName,
      votingProgress: 100,
      candidates,
    };
  });

  return transformed;
}
