import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
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

  // Determine the button name based on the current route
  const buttonName =
    location.pathname === "/login"
      ? "Register"
      : location.pathname === "/register"
        ? "Login"
        : "Logout";

  const onClick = async (e) => {
    e.preventDefault();

    if (buttonName === "Register") {
      navigate("/register");
    } else if (buttonName === "Login") {
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

  const linkClass = ({ isActive }) =>
    isActive ? "navbar-link navbar-link-active" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <NavLink className="navbar-logo" to="/">
            <h1 className="navbar-logo-text">StoryWeaver</h1>
          </NavLink>
          <div className="navbar-links-container">
            <div className="navbar-links">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <NavLink className="navbar-link" to="/" onClick={onClick}>
                {buttonName}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
