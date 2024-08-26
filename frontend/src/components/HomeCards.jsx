import { Link } from "react-router-dom";
import Card from "./Card";
import europeCountries from "../utils/europeCountries";
import { useEffect, useState } from "react";
import ExperienceListings from "./ExperienceListings";
import "../index.css";

const HomeCards = () => {
  const [currentCountry, setCurrentCountry] = useState("");

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
                    onClick={() => {
                      setCurrentCountry(countryName);
                    }}
                    key={index}
                    className="homecards-link"
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
      <ExperienceListings currentCountry={currentCountry} />
    </>
  );
};

export default HomeCards;
