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
  allStatesSelected, // New prop to indicate if all states are selected
  allCountiesSelected // New prop to indicate if all counties within a state are selected
}) => {
  const [geographies, setGeographies] = useState(feature(usAtlasStates, usAtlasStates.objects.states).features);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    // ... existing useEffect logic
  }, [selectedLevel, selectedState]);

  // Function to determine if a geography is selected
  const isGeographySelected = (geo) => {
    if (selectedLevel === 'federal') {
      return allStatesSelected || selectedCounties.includes(geo.id);
    } else if (selectedLevel === 'state') {
      return allCountiesSelected || selectedCounties.includes(geo.id);
    }
    return false;
  };

  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo, index) => {
              const isSelected = isGeographySelected(geo);
              return (
                <Geography
                  key={geo.rsmKey || index} // Ensure a unique key is provided
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
