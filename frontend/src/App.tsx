import "./index.css";
import Header from "./components/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryDashboard from "../pages/CategoryDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<CategoryDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
