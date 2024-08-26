import { React, useState } from "react";
import { VectorMap } from "react-jvectormap";

const mapData = {};

const Profile = () => {
  const [clickedCountries, setClickedCountries] = useState([]);

  const handleClick = (e, countryCode) => {
    // Update the state to add the clicked country
    setClickedCountries((prevCountries) => [...prevCountries, countryCode]);
  };

  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="#0077be" // Ocean blue background
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "520px",
          borderRadius: "10px", // Add rounded corners
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
              values: mapData, // this is your data
              scale: ["#f5f5f5", "#003366"], // Gradient from light to dark blue
              normalizeFunction: "polynomial",
            },
          ],
        }}
      />
      <div>
        <h3>Clicked Countries</h3>
        <ul>
          {clickedCountries.map((countryCode, index) => (
            <li key={index}>{countryCode}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
