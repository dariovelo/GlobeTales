import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../src/store/authSlice";
import { resetExperience, getExperiences } from "../src/store/experienceSlice";
import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";

// Initial user login state
const initialUserLoginState = {
  email: "",
  password: "",
};

function Login() {
  // State for form data and password visibility
  const [formData, setFormData] = useState(initialUserLoginState);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Destructuring email and password from formData
  const { email, password } = formData;

  // Initialize navigation and dispatch hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select auth state from Redux store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
    dispatch(getExperiences());
  };

  // Effect to handle login results and navigation
  useEffect(() => {
    if (isError) {
      toast.error(`${message} Incorrect password`, {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch(reset());
    }

    if (isSuccess || user) {
      toast.success("Login successful!", {
        autoClose: 500,
        position: "top-center",
      });
      navigate("/");
    }

    dispatch(getExperiences());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
