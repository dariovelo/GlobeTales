import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import europeCountries from "../src/utils/europeCountries";
import {
  updateExperience,
  getExperience,
  getExperiences,
} from "../src/store/experienceSlice";
import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";

const EditExperience = () => {
  const { id: experienceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [content, setContent] = useState("");

  const experience = useSelector((state) =>
    state.experience.experiences.find(
      (exp) => exp.experienceId === experienceId
    )
  );

  useEffect(() => {
    if (experienceId) {
      dispatch(getExperience(experienceId));
    }
  }, [dispatch, experienceId]);

  useEffect(() => {
    if (experience) {
      setTitle(experience.title);
      setSelectedCountry(experience.country);
      setContent(experience.content);
    }
  }, [experience]);

  const handleUpdate = () => {
    if (!title || !content || !selectedCountry) {
      toast.error("All fields are required!", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    const updatedExperience = {
      title,
      country: selectedCountry,
      content,
    };

    dispatch(
      updateExperience({ experienceId, experienceData: updatedExperience })
    );
    dispatch(getExperiences());
    toast.success("Experience updated successfully", {
      autoClose: 500,
      position: "top-center",
    });
    navigate("/");
  };

  return (
    <div className="experience-container">
      <div className="experience-card">
        <form className="experience-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="experience-title">Edit Your Experience</h2>

          <div className="form-group">
            <label className="form-label">Country</label>
            <select
              id="country"
              name="country"
              className="form-select"
              required
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="" disabled>
                Select a country from the list
              </option>
              {Object.entries(europeCountries.europeCountryList).map(
                ([countryCode, countryName], index) => (
                  <option key={index} value={countryName}>
                    {countryName}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              placeholder="e.g. My trip to Albania"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              id="content"
              name="content"
              className="form-textarea"
              rows="10"
              placeholder="Start writing your journey here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button
              className="button-submit"
              type="button"
              onClick={handleUpdate}
            >
              Update Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExperience;
