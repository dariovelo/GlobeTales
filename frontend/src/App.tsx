import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddExperience from "../pages/AddExperience";
import EditExperience from "../pages/EditExperience";
import MainLayout from "./layouts/MainLayout";
import About from "../pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/experiences/:id" element={<EditExperience />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
