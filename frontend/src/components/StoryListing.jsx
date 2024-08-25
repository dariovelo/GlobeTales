import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { deleteStory, resetStory } from "../store/storySlice";
import moment from "moment";
import "../index.css";

const StoryListing = ({ story, userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  let { content } = story;

  const formattedDate = (isoDate) => {
    return moment(isoDate).format("DD-MM-YYYY");
  };

  if (!showFullDescription) {
    content = content ? content.substring(0, 90) + "..." : "";
  }

  const removeStory = async (story) => {
    try {
      await dispatch(deleteStory(story));
      toast.success("Story deleted successfully!", {
        autoClose: 500,
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete story. Please try again.", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  const cardClass = `card ${story.category.toLowerCase()}`;

  return (
    <div className={cardClass}>
      <div className="card-content">
        <div className="card-category">{story.category}</div>
        <h3 className="card-title">{story.title}</h3>
        <div className="card-description">{content}</div>

        <button
          onClick={() => setShowFullDescription((prevState) => !prevState)}
          className="card-toggle"
        >
          {showFullDescription ? "↑" : "↓"}
        </button>

        <h3 className="card-user">Written by: {userName}</h3>

        <div className="card-divider"></div>

        <div className="card-time">
          <FaClock className="card-time-icon" />
          {formattedDate(story.createdAt)}
        </div>

        <div>
          <button onClick={() => removeStory(story)} className="card-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryListing;
