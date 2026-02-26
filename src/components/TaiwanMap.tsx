import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { ElectionResult, PartyId } from '../types/election';
import { getPartyColor, parties } from '../types/election';
import taiwanGeoData from '../data/taiwan-counties.json';
import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';

interface TaiwanMapProps {
  results: ElectionResult[];
  onCountyHover?: (result: ElectionResult | null) => void;
  onCountyClick?: (result: ElectionResult | null) => void;
}

interface CountyProperties {
  id: string;
  name: string;
  nameEn: string;
}

type TaiwanTopology = Topology<{
  COUNTY_MOI_1140318: GeometryCollection<CountyProperties>;
}>;

const topology = taiwanGeoData as unknown as TaiwanTopology;
const geoData = topojson.feature(
  topology,
  topology.objects.COUNTY_MOI_1140318
) as FeatureCollection<Geometry, CountyProperties>;

const TaiwanMap = ({ results, onCountyHover, onCountyClick }: TaiwanMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; result: ElectionResult } | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 500;
    const height = 700;

    // Create projection for Taiwan
    const projection = d3.geoMercator()
      .center([121, 23.5])
      .scale(9000)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Create map group
    const mapGroup = svg.append('g');

    // Draw counties
    mapGroup
      .selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', (d) => pathGenerator(d as Feature<Geometry>) || '')
      .attr('fill', (d) => {
        const result = results.find(r => r.countyId === d.properties.id);
        if (result) {
          return getPartyColor(result.winner, result.votePercentage);
        }
        return '#e0e0e0';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'pointer')
      .style('transition', 'fill 0.3s, opacity 0.2s')
      .on('mouseenter', function(event, d) {
        const result = results.find(r => r.countyId === d.properties.id);
        d3.select(this).attr('opacity', 0.8);
        
        if (result) {
          const [x, y] = d3.pointer(event, svgRef.current);
          setTooltip({ x, y, result });
          onCountyHover?.(result);
        }
      })
      .on('mousemove', function(event) {
        const result = results.find(r => r.countyId === (d3.select(this).datum() as Feature<Geometry, CountyProperties>).properties.id);
        if (result) {
          const [x, y] = d3.pointer(event, svgRef.current);
          setTooltip({ x, y, result });
        }
      })
      .on('mouseleave', function() {
        d3.select(this).attr('opacity', 1);
        setTooltip(null);
        onCountyHover?.(null);
      })
      .on('click', function(_, d) {
        const result = results.find(r => r.countyId === d.properties.id);
        onCountyClick?.(result || null);
      });

  }, [results, onCountyHover, onCountyClick]);

  return (
    <div className="taiwan-map-container">
      <svg ref={svgRef} width="500" height="700" viewBox="0 0 500 700" />
      {tooltip && (
        <div
          className="map-tooltip"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y - 10,
          }}
        >
          <div className="tooltip-header">
            {geoData.features.find(
              (f) => f.properties?.id === tooltip.result.countyId
            )?.properties?.name || tooltip.result.countyId}
          </div>
          <div className="tooltip-party">
            <span
              className="party-dot"
              style={{ backgroundColor: parties[tooltip.result.winner].colors[0] }}
            />
            {parties[tooltip.result.winner].name} 獲勝
          </div>
          <div className="tooltip-percentage">
            得票率: {tooltip.result.votePercentage.toFixed(1)}%
          </div>
          <div className="tooltip-candidates">
            {tooltip.result.candidates.slice(0, 3).map((candidate, i) => (
              <div key={i} className="candidate-row">
                <span className="candidate-name">{candidate.name}</span>
                <span 
                  className="candidate-party"
                  style={{ color: parties[candidate.party as PartyId]?.colors[0] || '#666' }}
                >
                  ({parties[candidate.party as PartyId]?.name || candidate.party})
                </span>
                <span className="candidate-votes">{candidate.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaiwanMap;
