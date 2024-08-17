import { useState, useEffect } from "react";

const categories = [
  "Fantasy",
  "Horror",
  "Drama",
  "Romance",
  "Sci-Fi",
  "Mystery",
  "Adventure",
  "Thriller",
];

function Footer() {
  const [currentCategory, setCurrentCategory] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCategory(
        (prevCategory) => (prevCategory + 1) % categories.length
      );
    }, 2000); // Change category every 2 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="category-display">
          <span className="category-text">Write your story </span>
        </div>
        <div className="category-display">
          <span className="category-text">{categories[currentCategory]}</span>
        </div>
        {/* Other footer content */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YourAppName. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
