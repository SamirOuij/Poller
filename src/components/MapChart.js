import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import usAtlasStates from "us-atlas/states-10m.json";
import usAtlasCounties from "us-atlas/counties-10m.json";
import { feature } from 'topojson-client';
import { geoCentroid } from 'd3-geo';

const MapChart = ({
  selectedLevel,
  onStateSelected,
  selectedState,
  setZoom,
  setCenter,
  zoom,
  center
}) => {
  const [geographies, setGeographies] = useState([]);
  const getStateNameById = (stateId) => {
    const state = usAtlasStates.objects.states.geometries.find(geo => geo.id === stateId);
    return state ? state.properties.name : null;
  };
  

  useEffect(() => {
    if (selectedLevel === 'state' && selectedState) {
      const stateGeographies = feature(usAtlasStates, usAtlasStates.objects.states).features;
      const selectedGeo = stateGeographies.find(geo => geo.id === selectedState);
      if (selectedGeo) {
        const centroid = geoCentroid(selectedGeo);
        setCenter(centroid);
        setZoom(4);
        setGeographies(feature(usAtlasCounties, usAtlasCounties.objects.counties).features.filter(geo => geo.id.startsWith(selectedState)));
      }
    } else if (selectedLevel === 'federal') {
      setCenter([-96.37872873001915, 38.49365521741807]);
      setZoom(1);
      setGeographies(feature(usAtlasStates, usAtlasStates.objects.states).features);
    }
  }, [selectedLevel, selectedState]);

  const handleGeographyClick = (geo) => {
    if (selectedLevel === 'federal') {
      onStateSelected(geo.id);
    } else if (selectedLevel === 'state') {
    }
  };

  return (
    <ComposableMap projection="geoAlbersUsa" className="composable-map">
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleGeographyClick(geo)}
                className="geography"
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
