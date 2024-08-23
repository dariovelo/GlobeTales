import "../index.css";

const Hero = ({
  title = "Craft Your Next Great Tale:",
  subtitle = "Explore Stories Across Genres",
}) => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
