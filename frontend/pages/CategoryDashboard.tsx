import { Link } from "react-router-dom";

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
  return (
    <div className="dashboard-container">
      <p className="dashboard-category-title">Choose a category</p>
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
