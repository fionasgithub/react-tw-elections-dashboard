import React, { useState, useCallback } from "react";
import type { Candidate } from "@/types/elections";

export type MapTooltipState = {
  x: number;
  y: number;
  countyName: string;
  candidates: Candidate[];
} | null;

export function useMapTooltip() {
  const [tooltip, setTooltip] = useState<MapTooltipState>(null);

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<SVGPathElement, MouseEvent>,
      name: string,
      candidates: Candidate[],
    ) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        countyName: name,
        candidates: candidates
          .slice()
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 3),
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return { tooltip, setTooltip, handleMouseMove, handleMouseLeave } as const;
}

export default useMapTooltip;
