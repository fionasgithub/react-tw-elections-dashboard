import { PARTY_COLORS, PARTY_NAMES, type Party } from "@/types/elections";

interface MapLegendProps {
  activeParties?: Party[];
}

const allParties: Party[] = Object.keys(PARTY_NAMES) as Party[];

const MapLegend = ({ activeParties }: MapLegendProps) => {
  const parties = activeParties ?? allParties.filter((p) => p !== "EMPTY");

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {parties.map((party) => (
        <div key={party} className="flex items-center gap-1.5">
          <span
            className="party-dot"
            style={{ backgroundColor: PARTY_COLORS[party] }}
          ></span>
          <span className="text-xs text-muted-foreground">
            {PARTY_NAMES[party]}
          </span>
        </div>
      ))}

      {/* 尚未開票/票數相同 */}
      <div className="flex items-center gap-1.5">
        <span
          className="party-dot"
          style={{ backgroundColor: PARTY_COLORS.EMPTY }}
        />
        <span className="text-xs text-muted-foreground">
          {PARTY_NAMES.EMPTY}
        </span>
      </div>
    </div>
  );
};

export default MapLegend;
