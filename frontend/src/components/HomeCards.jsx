import { Link } from "react-router-dom";
import Card from "./Card";
import { useEffect, useState } from "react";
import StoryListings from "./StoryListings";
import "../index.css";

const categories = ["Fantasy", "Adventure", "Romance", "Mystery", "Thriller"];
const colors = ["orange", "green", "blue", "yellow", "purple"];

const HomeCards = () => {
  const [currentCategory, setCurrentCategory] = useState("");

  return (
    <>
      <section className="homecards-section">
        <div className="homecards-container">
          <div className="homecards-grid">
            <Card>
              <h2 className="homecards-title">Filter by category</h2>

              {categories.map((category, index) => (
                <Link
                  onClick={() => {
                    setCurrentCategory(category);
                  }}
                  key={category}
                  className={`homecards-link ${colors[index]}`}
                >
                  {category}
                </Link>
              ))}
            </Card>
            <Card bg="bg-indigo-100">
              <h2 className="homecards-title">Share Your Stories</h2>

              <Link
                to="/add-story"
                className="homecards-link homecards-link-indigo"
              >
                Add Story
              </Link>
            </Card>
          </div>
        </div>
      </section>
      <StoryListings currentCategory={currentCategory} />
    </>
  );
};

export default HomeCards;
