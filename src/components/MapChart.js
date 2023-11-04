import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import usAtlasStates from "us-atlas/states-10m.json";
import usAtlasCounties from "us-atlas/counties-10m.json";
import { feature } from 'topojson-client';
import { geoCentroid } from 'd3-geo';

const MapChart = ({ selectedLevel, onStateSelected, onCountySelected, selectedState, selectedCounties }) => {
  const [geographies, setGeographies] = useState(feature(usAtlasStates, usAtlasStates.objects.states).features);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    if (selectedLevel === 'state' && selectedState) {
      const stateGeographies = feature(usAtlasStates, usAtlasStates.objects.states).features;
      const selectedGeo = stateGeographies.find(geo => geo.id === selectedState);
      if (selectedGeo) {
        const centroid = geoCentroid(selectedGeo);
        setCenter(centroid);
        setZoom(4); // Adjust zoom level as needed
        setGeographies(feature(usAtlasCounties, usAtlasCounties.objects.counties).features.filter(geo => geo.id.startsWith(selectedState)));
      } else {
        console.error('Selected state geo data is not valid:', selectedGeo);
      }
    } else {
      setCenter([0, 0]);
      setZoom(1);
      setGeographies(feature(usAtlasStates, usAtlasStates.objects.states).features);
    }
  }, [selectedLevel, selectedState]);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isSelected = selectedLevel === 'state'
                ? geo.id === selectedState
                : selectedCounties.includes(geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (selectedLevel === 'federal') {
                      onStateSelected(geo.id);
                    } else if (selectedLevel === 'state') {
                      onCountySelected(geo.id);
                    }
                  }}
                  style={{
                    default: {
                      fill: isSelected ? "#FFD700" : "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: isSelected ? "#FFD700" : "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
