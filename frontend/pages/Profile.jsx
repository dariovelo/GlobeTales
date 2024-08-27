import React, { useState, useEffect, useCallback } from "react";
import { VectorMap } from "react-jvectormap";
import { useDispatch, useSelector } from "react-redux";
import { updateVisitedCountries } from "../src/store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [clickedCountries, setClickedCountries] = useState(
    user?.visitedCountries || []
  );

  useEffect(() => {
    if (user && user.visitedCountries) {
      setClickedCountries(user.visitedCountries);
    }
  }, [user]);

  const handleClick = useCallback(
    (e, countryCode) => {
      // Check if countryCode is already in clickedCountries
      if (!clickedCountries.includes(countryCode)) {
        // Update the state with new countryCode
        setClickedCountries((prevCountries) => {
          const newCountries = [...prevCountries, countryCode];
          // Update the Redux store with the new countryCode
          dispatch(updateVisitedCountries(countryCode));
          return newCountries;
        });
      }
    },
    [clickedCountries, dispatch]
  );

  // Update mapData to include clickedCountries
  const mapData = clickedCountries.reduce((acc, countryCode) => {
    acc[countryCode] = 1; // Assuming a fixed value for visited countries
    return acc;
  }, {});

  return (
    <div>
      <div className="visited-countries-container">
        <h3>Visited Countries</h3>
        <div className="visited-countries">
          {clickedCountries.map((countryCode, index) => (
            <span key={index} className="country-tag">
              {countryCode}
            </span>
          ))}
        </div>
      </div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="#0077be" // Ocean blue background
        zoomOnScroll={false}
        containerStyle={{
          width: "100vw", // Full viewport width
          height: "130vh", // 80% of viewport height
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
    </div>
  );
};

export default Profile;
