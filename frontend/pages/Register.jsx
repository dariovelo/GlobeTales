import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../src/store/authSlice";
import { resetExperience } from "../src/store/experienceSlice";
import "../src/index.css"; // Assuming the CSS is separated into a file named Register.css

const userRegister = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

function Register() {
  const [formData, setFormData] = useState(userRegister);
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, email, password, password2 };
      dispatch(register(userData));
    }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
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
            <label>Email</label>
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
            <label>Password</label>
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
            <label>Confirm password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Enter your password"
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
