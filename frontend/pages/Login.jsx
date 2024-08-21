import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { login, reset } from "../src/store/authSlice";
import { resetStory, getStory } from "../src/store/storySlice";
import { toast } from "react-toastify";
import "../src/index.css"; // Make sure to include this CSS file

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
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar(message, { variant: "error", autoHideDuration: 500 });
    }

    if (isSuccess || user) {
      enqueueSnackbar("Login successful!", {
        variant: "success",
        autoHideDuration: 500,
      });
      console.log("login successful");
      navigate("/");
    }

    dispatch(getStory());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    dispatch(getStory());
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
            />
            <button
              type="button"
              className="password-visibility"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              {passwordVisibility ? "Hide" : "Show"} Password
            </button>
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
