import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usAtlas from "us-atlas/states-10m.json"; // Import the TopoJSON for the US map

const MapChart = ({ setTooltipContent, setClickedState }) => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={usAtlas}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                // Note: The property might be named differently, you might need to adjust this
                const { name } = geo.properties;
                setTooltipContent(name);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              onClick={() => {
                // Note: The property might be named differently, you might need to adjust this
                const { name } = geo.properties;
                setClickedState(name);
              }}
              style={{
                default: {
                  fill: "#D6D6DA",
                  outline: "none"
                },
                hover: {
                  fill: "#F53",
                  outline: "none"
                },
                pressed: {
                  fill: "#E42",
                  outline: "none"
                }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
