import { useState, useEffect } from "react";
import StoryListing from "./StoryListing";
import { useSelector, useDispatch } from "react-redux";
import "../index.css";

const StoryListings = ({ isHome = false }) => {
  const dipatch = useDispatch();
  const { story } = useSelector((state) => state.story);

  //   const [jobs, setJobs] = useState([]);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchJobs = async () => {
  //       const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
  //       try {
  //         const res = await fetch(apiUrl);
  //         const data = await res.json();
  //         setJobs(data);
  //       } catch (error) {
  //         console.log("Error fetching data", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchJobs();
  //   }, [isHome]);

  return (
    <section className="storylistings-section">
      <div className="storylistings-container">
        <h2 className="storylistings-title">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        <div className="storylistings-grid">
          {story?.map((story_) => (
            <StoryListing key={story_._id} story={story_} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryListings;
