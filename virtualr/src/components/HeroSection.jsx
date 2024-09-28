import { useState } from "react";
import Image01 from '../assets/01.png';
import { useNavigate } from "react-router-dom";

const packages = [
  {
    id: 1,
    title: "Social Media Unlimited",
    price: "899 Rs",
    data: "1 GB",
    apps: "Facebook, WhatsApp, Instagram",
    icon: "📱",
  },
  {
    id: 2,
    title: "Streaming Package",
    price: "1299 Rs",
    data: "2 GB",
    apps: "YouTube, Netflix, Disney+",
    icon: "🎥",
  },
  {
    id: 3,
    title: "Gaming Package",
    price: "1499 Rs",
    data: "3 GB",
    apps: "PUBG, Fortnite, Call of Duty",
    icon: "🎮",
  },
  {
    id: 4,
    title: "Business Package",
    price: "1999 Rs",
    data: "5 GB",
    apps: "Email, Zoom, Google Drive",
    icon: "💼",
  },
  {
    id: 5,
    title: "Family Package",
    price: "1599 Rs",
    data: "4 GB",
    apps: "Facebook, WhatsApp, Instagram, YouTube",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: 6,
    title: "Unlimited Package",
    price: "2999 Rs",
    data: "Unlimited",
    apps: "All apps",
    icon: "🌐",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [isChatOpen, setChatOpen] = useState(false);

  const handleNavigate = (page, packageDetails) => {
    navigate(`/${page}`, { state: { packageDetails } });
  };
  
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 mb-8 px-4 lg:px-20">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-bg-dark-400 mb-6">
          Welcome to <span className="text-orange-500">SRI</span> Care
        </h1>
        <img src={Image01} alt="Description for Image 01" className="w-2/3 lg:w-1/3 h-auto mb-5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-screen-lg">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-neutral-800 rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col items-center text-center flex-grow">
              <span className="text-4xl mb-2">{pkg.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{pkg.title}</h3>
              <p className="text-xl font-bold text-orange-500">{pkg.price}</p>
              <p className="text-gray-400">Data: {pkg.data}</p>
              <p className="text-gray-400">Includes: {pkg.apps}</p>
            </div>
            <button
              className="mt-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              onClick={() => handleNavigate("billing", pkg)}
            >
              Activate
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full mb-4">
        <a href="#" className="py-2 px-4 rounded-md bg-orange-500 text-white transition">
          See All Packages
        </a>
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleChat}
          className="bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition"
        >
          💬
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
          <h3 className="font-bold mb-2">Chat with us</h3>
          <div className="h-48 overflow-y-auto border border-gray-300 rounded-lg p-2 mb-2">
            <p>SRI care: Hello! How can we help you?</p>
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
