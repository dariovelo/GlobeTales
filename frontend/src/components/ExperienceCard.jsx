import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import {
  deleteExperience,
  fetchUserDetailsById,
} from "../store/experienceSlice";
import "../index.css";

const ExperienceCard = ({ experience }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [userName, setUserName] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);

  const { user, content, createdAt, country, title, experienceId } = experience;
  const currentUserId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await dispatch(fetchUserDetailsById(user));
        const fetchedUser = userDetails.payload;
        setUserName(fetchedUser.name || "Unknown User"); // Default value if name is not available
        setVisitedCountries(fetchedUser.visitedCountries || []); // Default to empty array if not available
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details. Please try again.", {
          autoClose: 1000,
          position: "top-center",
        });
      }
    };

    fetchUserDetails();
  }, [dispatch, user]);

  const formatDate = (isoDate) => moment(isoDate).format("DD-MM-YYYY HH:mm");

  const getTruncatedContent = () => {
    return !isDescriptionExpanded
      ? content
        ? content.substring(0, 90) + "..."
        : ""
      : content;
  };

  const handleDelete = () => {
    dispatch(deleteExperience(experienceId));
    toast.success("Experience deleted successfully!", {
      autoClose: 500,
      position: "top-center",
    });
    navigate("/");
  };

  return (
    <div className="experience-card-x">
      <div className="experience-content-x">
        <div className="experience-category-x">{country}</div>
        <h3 className="experience-title-x">{title}</h3>
        <div className="experience-description-x">{getTruncatedContent()}</div>
        <button
          onClick={() => setIsDescriptionExpanded((prev) => !prev)}
          className="experience-toggle-x"
        >
          {isDescriptionExpanded ? "↑" : "↓"}
        </button>
        <h3 className="experience-author-x">Written by: {userName}</h3>
        {Array.isArray(visitedCountries) && visitedCountries.length > 0 && (
          <p>
            {userName} has visited: {visitedCountries.join(", ")}
          </p>
        )}
        <div className="experience-divider-x"></div>
        <div className="experience-time-x">
          <FaClock className="experience-time-icon-x" />
          {formatDate(createdAt)}
        </div>
        {currentUserId === user && (
          <div className="experience-actions-x">
            <Link
              to={`/experiences/${experienceId}`}
              className="experience-edit-x"
            >
              Edit
            </Link>
            <button onClick={handleDelete} className="experience-delete-x">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
