import { useState, useEffect } from "react";
import ExperienceListing from "./ExperienceListing";
import { useSelector } from "react-redux";
import "../index.css";

const ExperienceListings = ({ currentCountry }) => {
  const { experiences } = useSelector((state) => state.experience);

  const { user } = useSelector((state) => state.auth);
  const [filterExperiences, setFilterExperiences] = useState([]);

  useEffect(() => {
    //   const filtered = experiences.filter(
    //     (experience) => experience.country === currentCountry
    //   );
    //   setFilterExperiences(filtered);
    // }, [currentCountry, experiences]);
  }, [experiences]);

  return (
    <section className="storylistings-section">
      <div className="storylistings-container">
        <h2 className="storylistings-title">Story Listings</h2>

        <div className="storylistings-grid">
          {experiences?.map((experience, index) => (
            <ExperienceListing
              key={index}
              experience={experience}
              userName={user.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceListings;
