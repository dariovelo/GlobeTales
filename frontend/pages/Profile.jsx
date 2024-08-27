import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVisitedCountries } from "../src/store/authSlice";
import MapComponent from "../src/components/MapComponent";

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
      if (!clickedCountries.includes(countryCode)) {
        setClickedCountries((prevCountries) => {
          const newCountries = [...prevCountries, countryCode];
          dispatch(updateVisitedCountries(countryCode));
          return newCountries;
        });
      }
    },
    [clickedCountries, dispatch]
  );

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
      <MapComponent
        clickedCountries={clickedCountries}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Profile;
