// Profile.js
import { useState, useEffect } from "react";
import StoryListing from "../src/components/StoryListing";
import { useSelector } from "react-redux";
import "../src/index.css";

const Profile = () => {
  const { story } = useSelector((state) => state.story);
  const [draftStories, setDraftStories] = useState([]);

  useEffect(() => {
    // Filter out drafts
    const drafts = story.filter((story_) => story_.status === "draft");
    setDraftStories(drafts);
  }, [story]);

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2 className="profile-title">Draft Stories</h2>

        <div className="profile-grid">
          {draftStories?.map((story_, index) => (
            <StoryListing key={index} story={story_} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
