import { Link } from "react-router-dom";
import europeCountries from "../utils/europeCountries";
import { useState } from "react";
import ExperienceList from "./ExperienceList";
import "../index.css";

const CountryFilter = () => {
  const [currentCountry, setCurrentCountry] = useState("");

  const handleClearFilter = () => {
    setCurrentCountry("");
  };

  return (
    <>
      <div className="countryfilter-container">
        <div className="countryfilter-grid">
          <h2 className="countryfilter-title">Filter by country</h2>

          {Object.entries(europeCountries.europeCountryList).map(
            ([countryCode, countryName], index) => (
              <Link
                onClick={() => setCurrentCountry(countryName)}
                key={index}
                className={`countryfilter-link ${
                  currentCountry === countryName ? "selected" : ""
                }`}
              >
                <img
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                  alt={`${countryName} Flag`}
                  className="flag-icon"
                />
                {countryName}
              </Link>
            )
          )}

          {currentCountry && (
            <button onClick={handleClearFilter} className="clear-filter">
              Clear Filter
            </button>
          )}

          <h2 className="countryfilter-title">Share Your Stories</h2>
          <Link
            to="/add-experience"
            className="countryfilter-link countryfilter-link-indigo"
          >
            Add Story
          </Link>
        </div>
      </div>
      <ExperienceList currentCountry={currentCountry} />
    </>
  );
};

export default CountryFilter;
