import { useState } from 'react';
import TaiwanMap from './TaiwanMap';
import Legend from './Legend';
import YearSelector from './YearSelector';
import ThemeToggle from './ThemeToggle';
import { getResultsByYear } from '../data/electionData';
import type { ElectionResult } from '../types/election';
import { parties } from '../types/election';
import taiwanGeoData from '../data/taiwan-counties.json';
import * as topojson from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology, GeometryCollection } from 'topojson-specification';

interface CountyProperties {
  id: string;
  name: string;
  nameEn: string;
}

type TaiwanTopology = Topology<{
  COUNTY_MOI_1140318: GeometryCollection<CountyProperties>;
}>;

const topology = taiwanGeoData as unknown as TaiwanTopology;
const countyGeoData = topojson.feature(
  topology,
  topology.objects.COUNTY_MOI_1140318
) as FeatureCollection<Geometry, CountyProperties>;

const ElectionsDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedCounty, setSelectedCounty] = useState<ElectionResult | null>(null);
  const years = [2022, 2018, 2014];
  const results = getResultsByYear(selectedYear);

  const getCountyName = (countyId: string) => {
    const county = countyGeoData.features.find(
      (f) => f.properties?.id === countyId
    );
    return county?.properties?.name || countyId;
  };

  return (
    <div className="elections-dashboard">
      <header className="dashboard-header">
        <div className="title-section">
          <div className="year-display">
            <span className="year-top">{String(selectedYear).slice(0, 2)}</span>
            <span className="year-bottom">{String(selectedYear).slice(2, 4)}</span>
          </div>
          <div className="title-text">
            <h1>九合一大選</h1>
            <h2>即時開票</h2>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <aside className="dashboard-sidebar left">
          <Legend />
        </aside>

        <section className="map-section">
          <TaiwanMap
            results={results}
            onCountyHover={setSelectedCounty}
            onCountyClick={setSelectedCounty}
          />
        </section>

        <aside className="dashboard-sidebar right">
          <YearSelector
            years={years}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
          
          <ThemeToggle />

          <button className="info-button">
            <span className="info-icon">ⓘ</span>
            更多說明
          </button>

          {selectedCounty && (
            <div className="county-detail">
              <h3>{getCountyName(selectedCounty.countyId)}</h3>
              <div className="winner-info">
                <span
                  className="winner-dot"
                  style={{ backgroundColor: parties[selectedCounty.winner].colors[0] }}
                />
                <span className="winner-party">{parties[selectedCounty.winner].name}</span>
                <span className="winner-percentage">{selectedCounty.votePercentage.toFixed(1)}%</span>
              </div>
              <div className="candidates-list">
                {selectedCounty.candidates.map((candidate, i) => (
                  <div key={i} className="candidate-item">
                    <span className="candidate-name">{candidate.name}</span>
                    <div className="candidate-bar-container">
                      <div
                        className="candidate-bar"
                        style={{
                          width: `${candidate.percentage}%`,
                          backgroundColor: parties[candidate.party]?.colors[1] || '#999',
                        }}
                      />
                    </div>
                    <span className="candidate-percent">{candidate.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default ElectionsDashboard;
