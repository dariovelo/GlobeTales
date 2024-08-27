import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../index.css";
import ExperienceCard from "./ExperienceCard";

const ExperienceList = ({ currentCountry }) => {
  const { experiences } = useSelector((state) => state.experience);
  const { user } = useSelector((state) => state.auth);

  // Filter experiences based on the currentCountry prop
  const filteredExperiences = currentCountry
    ? experiences.filter((exp) => exp.country === currentCountry)
    : experiences;

  return (
    <section className="experience-list-section">
      <div className="experience-list-container">
        <h2 className="experience-list-title">See What Others Are Sharing</h2>

        <div className="experience-list-grid">
          {filteredExperiences?.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceList;
