import { useState, useEffect } from "react";

function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="section-form">
      <p> Please login </p>
      <form className="story-form" onSubmit={onSubmit}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            value={formData.password}
            onChange={onChange}
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
