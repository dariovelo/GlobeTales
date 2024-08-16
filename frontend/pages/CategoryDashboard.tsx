import React from "react";

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
        <button key={category} className="dashboard-category">
          {emoji}
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryDashboard;
