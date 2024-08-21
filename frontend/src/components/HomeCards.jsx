import { Link } from "react-router-dom";
import Card from "./Card";
import "../index.css";

const HomeCards = () => {
  return (
    <section className="homecards-section">
      <div className="homecards-container">
        <div className="homecards-grid">
          <Card>
            <h2 className="homecards-title">For Developers</h2>
            <p className="homecards-description">
              Browse our React jobs and start your career today
            </p>
            <Link to="/jobs" className="homecards-link">
              Browse Jobs
            </Link>
          </Card>
          <Card bg="bg-indigo-100">
            <h2 className="homecards-title">For Employers</h2>
            <p className="homecards-description">
              List your job to find the perfect developer for the role
            </p>
            <Link
              to="/add-story"
              className="homecards-link homecards-link-indigo"
            >
              Add Job
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
