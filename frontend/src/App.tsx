import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../src/components/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryDashboard from "../pages/CategoryDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import StoryForm from "./components/StoryForm";
import StoryDashboard from "../pages/StoryDashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<CategoryDashboard />} />
          <Route path="/fantasy" element={<StoryForm />} />
          <Route path="/temp" element={<StoryDashboard />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
