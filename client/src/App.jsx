import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import DreamPlots from "./components/DreamPlots";
import OtoB from "./components/OtoB";
import Contact from "./components/Contact";
import Construction from "./components/Construction";
import Footer from "./components/Footer";
import LandDetailed from "./components/LandDetailed";
import LandList from "./components/LandList";
import Home from "./components/Home";
import Dashboard from "./components/Admin/Dashboard";
import AddLand from "./components/Admin/AddLand";
import AllLandList from "./components/Admin/AllLandList";
import AllUserDetails from "./components/Admin/AllUserDetails";
import Analytics from "./components/Analytics";
import { ToastContainer } from "react-toastify";
import BlogPage from "./components/BlogPage";
import PrivateAdminRoute from "./context/PrivateAdminRoute";
function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dream-plots" element={<DreamPlots />} />
        <Route path="/oto-business" element={<OtoB />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/land-details" element={<LandDetailed />} />
        <Route path="/lands" element={<LandList />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <Dashboard />
            </PrivateAdminRoute>
          }
        >
          <Route index element={<AddLand />} />
          <Route path="add-land" element={<AddLand />} />
          <Route path="land-list" element={<AllLandList />} />
          <Route path="user-details" element={<AllUserDetails />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="/blog" element={<BlogPage />} />
      </Routes>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-12 right-5 z-50"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-12 h-12 hover:scale-110 transition-transform"
        />
      </a>
      <Footer />
    </Router>
  );
}

export default App;
