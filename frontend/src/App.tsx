import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "../pages/Login";
import Register from "../pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddStoryPage from "../pages/AddStoryPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />{" "}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/add-story" element={<AddStoryPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
