import { create } from "zustand";
import type { CountyResult } from "@/types/elections";

type State = {
  countyResults: CountyResult[];
  countyResultsLoading: boolean;
};

type Action = {
  setCountyResults: (countyResults: CountyResult[]) => void;
  setCountyResultsLoading: (loading: boolean) => void;
};

export const useElectionStore = create<State & Action>((set) => ({
  countyResults: [],
  countyResultsLoading: false,
  setCountyResults: (countyResults: CountyResult[]) => set({ countyResults }),
  setCountyResultsLoading: (loading: boolean) =>
    set({ countyResultsLoading: loading }),
}));
