import type { PartyId } from '../types/election';
import { parties } from '../types/election';

const Legend = () => {
  const partyOrder: PartyId[] = ['KMT', 'DPP', 'TPP', 'IND', 'NPP'];
  const thresholds = [70, 60, 50, 45, 40];

  return (
    <div className="legend">
      <h3 className="legend-title">得票率（%）</h3>
      {partyOrder.map(partyId => {
        const party = parties[partyId];
        return (
          <div key={partyId} className="legend-item">
            <span className="party-name">{party.name}</span>
            <div className="color-scale">
              {party.colors.map((color, index) => (
                <div
                  key={index}
                  className="color-block"
                  style={{ backgroundColor: color }}
                  title={`${thresholds[index]}%+`}
                />
              ))}
            </div>
          </div>
        );
      })}
      <div className="legend-thresholds">
        <span>70</span>
        <span>50</span>
        <span>40</span>
      </div>
    </div>
  );
};

export default Legend;
