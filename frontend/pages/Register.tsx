import React from "react";
function Register() {
  return (
    <div className="section-form">
      <p> Please register </p>
      <form className="story-form">
        <div className="input-box">
          <input type="text" placeholder="Name" />
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm password" />
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
