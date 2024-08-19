import "../index.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation(); // Get the current location
  const isLoginPage = location.pathname === "/";
  const buttonLabel = isLoginPage ? "Register" : "Login";
  const buttonLink = isLoginPage ? "/register" : "/";

  return (
    <header>
      <div className="logo">StoryWeaver</div>
      <nav>
        <ul className="nav__links">
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="cta">
        <Link to={buttonLink}>
          <button className="button button-login">{buttonLabel}</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
