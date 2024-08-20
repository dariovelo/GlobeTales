import { useSelector } from "react-redux";
import StoryCard from "../src/components/StoryCard";

function StoryDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { story } = useSelector((state) => state.story);
  return (
    <div className="story-card-container">
      {story.map((story) => (
        <StoryCard
          key={story._id}
          title={story.title}
          content={story.content}
          author={user.name}
        />
      ))}
    </div>
  );
}

export default StoryDashboard;
