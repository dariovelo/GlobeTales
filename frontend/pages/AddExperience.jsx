import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { countries } from "countries-list";
import europeCountries from "../src/utils/europeCountries";
import { createExperience } from "../src/store/experienceSlice";
import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";

const AddExperience = () => {
  const [title, setTitle] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!title || !content || !selectedCountry) {
      toast.error("All fields are required!", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    const newExperience = {
      title,
      country: selectedCountry,
      content,
    };

    dispatch(createExperience(newExperience));
    toast.success("Experience published successfully", {
      autoClose: 500,
      position: "top-center",
    });
    navigate("/");
  };

  return (
    <div className="experience-container">
      <div className="experience-card">
        <form className="experience-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="experience-title">Add Your Story</h2>

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
              onClick={handleSubmit}
            >
              Publish Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExperience;
