// StoryListings.js
import { useState, useEffect } from "react";
import StoryListing from "./StoryListing";
import { useSelector } from "react-redux";
import "../index.css";

const StoryListings = ({ currentCategory }) => {
  const { story } = useSelector((state) => state.story);
  const { user } = useSelector((state) => state.auth);
  const [filterStories, setFilterStories] = useState([]);

  useEffect(() => {
    // Filter out unpublished stories
    const publishedStories = story.filter(
      (story_) => story_.status === "published"
    );

    // Display all published stories if no category is selected or display filtered published stories
    if (!currentCategory) {
      setFilterStories(publishedStories); // Show all published stories
      console.log("entered all published");
    } else {
      const filtered = publishedStories.filter(
        (story_) => story_.category === currentCategory
      );
      setFilterStories(filtered);
    }
  }, [currentCategory, story]);

  return (
    <section className="storylistings-section">
      <div className="storylistings-container">
        <h2 className="storylistings-title">Story Listings</h2>

        <div className="storylistings-grid">
          {filterStories?.map((story_, index) => (
            <StoryListing key={index} story={story_} userName={user.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryListings;
