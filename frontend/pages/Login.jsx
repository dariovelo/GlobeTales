import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../src/store/authSlice";
import Spinner from "../src/components/Spinner";

import { toast } from "react-toastify";

const userLogin = {
  email: "",
  password: "",
};

function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formData, setFormData] = useState(userLogin);

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 500, // 0.5 seconds
      });
    }

    if (isSuccess || user) {
      toast.success("Login successful!", {
        autoClose: 500, // 0.5 seconds
      });
      navigate("/category");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            value={password}
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
