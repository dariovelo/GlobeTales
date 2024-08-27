import "../index.css";

const PageBanner = ({
  title = "Craft Your Next Great Tale:",
  subtitle = "Explore Stories Across Countries",
}) => {
  return (
    <section className="pagebanner-section">
      <div className="pagebanner-container">
        <div className="pagebanner-content">
          <h1 className="pagebanner-title">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
