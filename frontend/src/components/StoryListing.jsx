import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import "../index.css";

const StoryListing = ({ story }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formattedDate = (isoDate) => {
    return moment(isoDate).format("DD-MM-YYYY");
  };

  let description = story.content;

  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-type">Fantasy</div>
        <h3 className="card-title">{story.title}</h3>
        <div className="card-description">{description}</div>

        <button
          onClick={() => setShowFullDescription((prevState) => !prevState)}
          className="card-toggle"
        >
          {showFullDescription ? "Less" : "More"}
        </button>

        <h3 className="card-salary">1000 / Year</h3>

        <div className="card-divider"></div>

        <div className="card-footer">
          <div className="card-location">
            <FaClock className="card-location-icon" />
            {formattedDate(story.createdAt)}
          </div>
          <Link to={`/story/${story._id}`} className="card-read-more">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryListing;
