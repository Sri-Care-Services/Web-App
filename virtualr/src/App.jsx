import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Billing from "./components/Billing";
import ImageFF from './assets/sricare.png'; 
import Notifications from "./components/Notification";

const App = () => {
  return (
    <Router>
      <div className="relative flex flex-col min-h-screen">

        <div
          style={{
            backgroundImage: `url(${ImageFF})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            opacity: 0.2,
            zIndex: -1,
          }}
          className="absolute inset-0"
        ></div>

        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6 flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/Notifications" element={<Notifications />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
