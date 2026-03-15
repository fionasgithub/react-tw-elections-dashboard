import { z } from "zod";

export const CountyVotesCandidateSchema = z.object({
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
  candidates: z.array(CountyVotesCandidateSchema),
});

export const CountyVotesSummaryApiResponseSchema = z.object({
  meta: z.object({
    errorCode: z.union([z.string(), z.number()]).nullable(),
  }),
  data: z.array(CountyVotesSummarySchema),
});

export type CountyVotesCandidate = z.infer<typeof CountyVotesCandidateSchema>;
export type CountyVotesSummary = z.infer<typeof CountyVotesSummarySchema>;
