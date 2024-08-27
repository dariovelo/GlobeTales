import { Link } from "react-router-dom";
import Card from "./Card";
import europeCountries from "../utils/europeCountries";
import { useState } from "react";
import ExperienceList from "./ExperienceList";
import "../index.css";

const HomeCards = () => {
  const [currentCountry, setCurrentCountry] = useState("");

  // Optional: Function to clear country filter
  const handleClearFilter = () => {
    setCurrentCountry("");
  };

  return (
    <>
      <section className="homecards-section">
        <div className="homecards-container">
          <div className="homecards-grid">
            <Card>
              <h2 className="homecards-title">Filter by country</h2>

              {Object.entries(europeCountries.europeCountryList).map(
                ([countryCode, countryName], index) => (
                  <Link
                    onClick={() => setCurrentCountry(countryName)}
                    key={index}
                    className={`homecards-link ${
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
            </Card>
            <Card bg="bg-indigo-100">
              <h2 className="homecards-title">Share Your Stories</h2>
              <Link
                to="/add-experience"
                className="homecards-link homecards-link-indigo"
              >
                Add Story
              </Link>
            </Card>
          </div>
        </div>
      </section>
      <ExperienceList currentCountry={currentCountry} />
    </>
  );
};

export default HomeCards;
