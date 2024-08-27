import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../src/store/authSlice";
import { resetExperience } from "../src/store/experienceSlice";
import "../src/index.css";

// Initial state for user registration
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

function Register() {
  // State for form data
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  // Hooks for navigation and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Effect to handle side effects
  useEffect(() => {
    if (password !== password2) {
      toast.error("Passwords do not match!", {
        autoClose: 1000,
        position: "top-center",
      });
    }

    if (isError) {
      toast.error(message, {
        autoClose: 1000,
        position: "top-center",
      });
      dispatch(reset());
      dispatch(resetExperience());
    } else if (isSuccess && user) {
      toast.success("Registration successful!", {
        autoClose: 500,
        position: "top-center",
      });
      navigate("/");
      dispatch(reset());
      dispatch(resetExperience());
    }
  }, [
    password,
    password2,
    isError,
    isSuccess,
    user,
    message,
    navigate,
    dispatch,
  ]);

  // Handle form input changes
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, email, password, password2 };
      dispatch(register(userData));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
            />
          </div>
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
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirm your password"
              value={password2}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
