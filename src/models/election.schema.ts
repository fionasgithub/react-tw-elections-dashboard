import { z } from "zod";

export const CandidateSchema = z.object({
  _id: z.string(),
  no: z.number(),
  name: z.string(),
  party: z.string(),
  votes: z.number(),
  voteShare: z.number(),
});

export const CountyVotesSummarySchema = z.object({
  _id: z.string(),
  year: z.number(),
  type: z.string(),
  countyName: z.string(),
  countyCode: z.string(),
  candidates: z.array(CandidateSchema),
});

export const CountyVotesSummaryApiResponseSchema = z.object({
  meta: z.object({
    errorCode: z.union([z.string(), z.number()]).nullable(),
  }),
  data: z.array(CountyVotesSummarySchema),
});

export type Candidate = z.infer<typeof CandidateSchema>;
export type CountyVotesSummary = z.infer<typeof CountyVotesSummarySchema>;

export const TownshipVotesSummarySchema = z.object({
  _id: z.string(),
  year: z.number(),
  type: z.string(),
  countyCode: z.string(),
  townName: z.string(),
  townCode: z.string(),
  candidates: z.array(CandidateSchema),
});

export const TownshipVotesSummaryApiResponseSchema = z.object({
  meta: z.object({
    errorCode: z.union([z.string(), z.number()]).nullable(),
  }),
  data: z.array(TownshipVotesSummarySchema),
});

export type TownshipVotesSummary = z.infer<typeof TownshipVotesSummarySchema>;
