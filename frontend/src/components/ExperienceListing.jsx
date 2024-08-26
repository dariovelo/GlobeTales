import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import europeCountries from "../utils/europeCountries";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { deleteExperience } from "../store/experienceSlice";
import "../index.css";

const ExperienceListing = ({ experience, userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { user, content, createdAt, country, title } = experience;
  // Access the current user's ID from the Redux store
  const currentUserId = useSelector((state) => state.auth.user._id);

  const formattedDate = (isoDate) => moment(isoDate).format("DD-MM-YYYY");

  const truncatedContent = !showFullDescription
    ? content
      ? content.substring(0, 90) + "..."
      : ""
    : content;

  const removeExperience = async () => {
    try {
      await dispatch(deleteExperience(experience));
      toast.success("Experience deleted successfully!", {
        autoClose: 500,
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete experience. Please try again.", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="experience-card">
      <div className="experience-content">
        <div className="experience-category">{country}</div>
        <h3 className="experience-title">{title}</h3>
        <div className="experience-description">{truncatedContent}</div>
        <button
          onClick={() => setShowFullDescription((prev) => !prev)}
          className="experience-toggle"
        >
          {showFullDescription ? "↑" : "↓"}
        </button>
        <h3 className="experience-user">Written by: {userName}</h3>
        <div className="experience-divider"></div>
        <div className="experience-time">
          <FaClock className="experience-time-icon" />
          {formattedDate(createdAt)}
        </div>
        {currentUserId === user && (
          <Link onClick={removeExperience} className="experience-delete">
            Delete
          </Link>
        )}
      </div>
    </div>
  );
};

export default ExperienceListing;
