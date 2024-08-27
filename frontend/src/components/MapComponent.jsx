import React from "react";
import { VectorMap } from "react-jvectormap";

const MapComponent = ({ clickedCountries, handleClick }) => {
  // Update mapData to include clickedCountries
  const mapData = clickedCountries.reduce((acc, countryCode) => {
    acc[countryCode] = 1; // Assuming a fixed value for visited countries
    return acc;
  }, {});

  return (
    <VectorMap
      map={"world_mill"}
      backgroundColor="#0077be" // Ocean blue background
      zoomOnScroll={false}
      containerStyle={{
        width: "100vw",
        height: "130vh",
        borderRadius: "20px", // Add rounded corners
      }}
      onRegionClick={handleClick} // gets the country code
      containerClassName="map"
      regionStyle={{
        initial: {
          fill: "#d0e6f2", // Light blue for default state
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0,
        },
        hover: {
          fill: "#a1c4e9", // Slightly darker blue on hover
          "fill-opacity": 0.8,
          cursor: "pointer",
        },
        selected: {
          fill: "#003366", // Dark blue for selected country
        },
        selectedHover: {
          fill: "#002244", // Even darker blue on hover over selected
        },
      }}
      regionsSelectable={true}
      series={{
        regions: [
          {
            values: mapData, // Update mapData to reflect clicked countries
            scale: ["#f5f5f5", "#003366"], // Gradient from light to dark blue
            normalizeFunction: "polynomial",
          },
        ],
      }}
    />
  );
};

export default MapComponent;
