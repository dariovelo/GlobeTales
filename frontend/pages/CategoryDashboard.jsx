import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const categories = {
  Fantasy: "🦄", // Unicorn
  Horror: "👻", // Ghost
  Drama: "🎭", // Performing Arts
  Romance: "❤️", // Red Heart
  "Sci-Fi": "🚀", // Rocket
  Mystery: "🕵️‍♂️", // Detective
  Adventure: "🌍", // Globe Showing Europe-Africa
  Thriller: "🔪", // Knife
};

function CategoryDashboard() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <p className="dashboard-category-title">
        Welcome {user?.name}, choose a category
      </p>
      {Object.entries(categories).map(([category, emoji]) => (
        <Link to={`/${category.toLowerCase()}`}>
          <button key={category} className="dashboard-category">
            {emoji}
            {category}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default CategoryDashboard;
