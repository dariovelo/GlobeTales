import { useState } from "react";

function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="section-form">
      <p> Please login </p>
      <form className="story-form">
        <div className="input-box">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-box">
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="Password"
          />
          <button
            className="password-visibility"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            Show password
          </button>
        </div>
        <div>
          <button className="button button-login" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
