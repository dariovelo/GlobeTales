import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { reset, logout } from "../store/authSlice";
import { resetStory, clearStoryCache } from "../store/storySlice";
import "../index.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive ? "navbar-link navbar-link-active" : "navbar-link";

  const onLogout = async () => {
    await dispatch(logout()); // Ensure logout is complete
    await dispatch(clearStoryCache()); // Ensure stories are cleared
    dispatch(reset());
    dispatch(resetStory());

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"> */}
          <NavLink className="navbar-logo" to="/">
            <img className="navbar-logo-img" src={logo} alt="React Jobs" />
            <h1 className="navbar-logo-text">React Jobs</h1>
          </NavLink>
          <div className="navbar-links-container">
            <div className="navbar-links">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <NavLink className="navbar-link" onClick={onLogout}>
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
