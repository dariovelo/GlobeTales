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
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <a className="cta" href="#">
        <Link to={buttonLink}>
          <button className="button button-login">{buttonLabel}</button>
        </Link>
      </a>
    </header>
  );
}

export default Header;
