import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../src/store/authSlice";
import Spinner from "../src/components/Spinner";

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
    if (isError) {
      toast.error(message, {
        autoClose: 500, // 0.5 seconds
      });
      dispatch(reset());
    } else if (isSuccess && user) {
      toast.success("Registration successful!", {
        autoClose: 500, // 0.5 seconds
      });
      navigate("/");
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); //prevent the default action to reload the page
    if (password !== password2) {
      toast.error("Passwords do not match frontend");
    } else {
      const userData = {
        name,
        email,
        password,
        password2,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm password"
            id="password2"
            name="password2"
            value={password2}
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
