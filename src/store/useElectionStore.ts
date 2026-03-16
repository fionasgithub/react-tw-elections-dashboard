import { create } from "zustand";
import type { CountyResult } from "@/types/elections";

type State = {
  countyResults: CountyResult[];
};

type Action = {
  setCountyResults: (countyResults: CountyResult[]) => void;
};

export const useElectionStore = create<State & Action>((set) => ({
  countyResults: [],
  setCountyResults: (countyResults: CountyResult[]) => set({ countyResults }),
}));
