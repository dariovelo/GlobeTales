import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddExperience from "../pages/AddExperience";
import MainLayout from "./layouts/MainLayout";
import EditExperience from "../pages/EditExperience";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-experience" element={<AddExperience />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/experiences/:id" element={<EditExperience />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
