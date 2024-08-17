import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); //prevent the default action to reload the page
  };

  return (
    <div className="section-form">
      <p> Please register </p>
      <form className="story-form" onSubmit={onSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
          />
        </div>

        <div>
          <button className="button button-login" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
