import { useEffect, useState } from "react";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { reset, logout } from "../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [buttonLabel, setButtonLabel] = useState("");
  const [buttonLink, setButtonLink] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setButtonLabel("Register");
        setButtonLink("/register");
        break;
      case "/register":
        setButtonLabel("Login");
        setButtonLink("/");
        break;
      case "/category":
        setButtonLabel("Logout");
        setButtonLink("/");
        break;
      default:
        setButtonLabel("");
        setButtonLink("");
    }
  }, [location.pathname]);

  const onLogout = async () => {
    await dispatch(logout()); // Ensure logout is complete
    dispatch(reset());
    navigate("/"); // Navigate to home after logout
  };

  const handleClick = () => {
    if (location.pathname === "/category") {
      onLogout(); // Handle logout and redirect
    } else {
      navigate(buttonLink); // Directly navigate to the buttonLink for other cases
    }
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/category");
    } else {
      navigate("/");
    }
  };

  return (
    <header>
      <div className="logo" onClick={handleLogoClick}>
        StoryWeaver
      </div>
      <nav>
        <ul className="nav__links">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="cta">
        <button className="button button-login" onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </header>
  );
}

export default Header;
