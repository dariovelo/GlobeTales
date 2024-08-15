import "../index.css";

import logo from "../images/logo.png";
function Header() {
  return (
    <header>
      <div className="logo">StoryWeaver</div>
      <nav>
        <ul className="nav__links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <a className="cta" href="#">
        <button className="button button-login">Contact</button>
      </a>
    </header>
  );
}

export default Header;
