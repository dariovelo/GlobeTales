import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset, logout } from "../store/authSlice";
import {
  resetExperience,
  clearExperienceCache,
} from "../store/experienceSlice";
import "../index.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the button text based on the current route
  const buttonText =
    location.pathname === "/login"
      ? "Register"
      : location.pathname === "/register"
        ? "Login"
        : "Logout";

  // Handle button click for login, register, or logout
  const handleButtonClick = async (e) => {
    e.preventDefault();

    if (buttonText === "Register") {
      navigate("/register");
    } else if (buttonText === "Login") {
      navigate("/login");
    } else {
      await dispatch(logout());
      await dispatch(clearExperienceCache());
      dispatch(reset());
      dispatch(resetExperience());
      navigate("/login");
      window.location.reload();
    }
  };

  // Function to set link class based on active state
  const getLinkClass = ({ isActive }) =>
    isActive ? "navbar-link navbar-link-active" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <NavLink className="navbar-logo" to="/">
            <h1 className="navbar-logo-text">GlobeTales</h1>
          </NavLink>
          <div className="navbar-links-container">
            <div className="navbar-links">
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>
              <NavLink to="/profile" className={getLinkClass}>
                Profile
              </NavLink>
              <NavLink to="/about" className={getLinkClass}>
                About
              </NavLink>
              <NavLink
                className="navbar-link"
                to="/"
                onClick={handleButtonClick}
              >
                {buttonText}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
