import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import usAtlasStates from "us-atlas/states-10m.json";
import usAtlasCounties from "us-atlas/counties-10m.json";
import { feature } from 'topojson-client';
import { geoCentroid } from 'd3-geo';

const MapChart = ({
  selectedLevel,
  onStateSelected,
  onCountySelected,
  selectedState,
  selectedCounties,
  setZoom, // Added these props for controlling zoom
  setCenter, // Added these props for controlling center
  zoom,
  center
}) => {
  const [geographies, setGeographies] = useState(feature(usAtlasStates, usAtlasStates.objects.states).features);

  useEffect(() => {
    if (selectedLevel === 'state' && selectedState) {
      const stateGeographies = feature(usAtlasStates, usAtlasStates.objects.states).features;
      const selectedGeo = stateGeographies.find(geo => geo.id === selectedState);
      if (selectedGeo) {
        const centroid = geoCentroid(selectedGeo);
        console.log("Centroid:", centroid); // Debug log
        if (!centroid.every(Number.isFinite)) {
          console.error("Invalid centroid:", centroid);
          return; // Early return to avoid setting invalid state
        }
        setCenter(centroid);
        setZoom(4);
        setGeographies(feature(usAtlasCounties, usAtlasCounties.objects.counties).features.filter(geo => geo.id.startsWith(selectedState)));
      } else {
        console.error('Selected state geo data is not valid:', selectedState);
      }
    } if (selectedLevel === 'federal') {
        console.log("Resetting to default zoom and center");
        setCenter([-96.37872873001915, 38.49365521741807]);
        setZoom(1);
        setGeographies(feature(usAtlasStates, usAtlasStates.objects.states).features);
      }
  }, [selectedLevel, selectedState]);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelected = selectedCounties.includes(geo.id);
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
