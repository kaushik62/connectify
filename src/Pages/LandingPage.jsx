import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import socialmedia_image from "../image/socialmedia_img.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };
  const features = [
    {
      id: 1,
      title: "Create Posts",
      desc: "Easily create posts like social media.",
      img: "https://storage.googleapis.com/a1aa/image/bACHs4cf18wsco7tQQK0-qL5ncs0ePzanZhguZzXjqk.jpg",
    },
    {
      id: 2,
      title: "Review & Confirm",
      desc: "Sync employee profiles to automate enrolment easily.",
      img: "https://storage.googleapis.com/a1aa/image/7dHnxbqxDi2dItWsq3S-vFFynYYB4w0WLnC96lri8MU.jpg",
    },
    {
      id: 3,
      title: "Realtime Messaging",
      desc: "Access anytime, anywhere.",
      img: "https://storage.googleapis.com/a1aa/image/ikkb_AE6yLOSHuKpa0DG0jdVqk0DlnFBQr5bhKyPnUY.jpg",
    },
    {
      id: 4,
      title: "Get Notifications",
      desc: "Never miss an update with timely notifications.",
      img: "https://storage.googleapis.com/a1aa/image/LWKnRKxhRztfXTAqqDUKN7mdj4PQiOtUaSGqd4EM5mA.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20 mt-9">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-indigo-800 leading-tight mb-2">
              Connecting Hearts, Inspiring Stories
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              Connectify is a dynamic social media application that connects
              people around the world through posts, likes, comments, and
              real-time messaging.
            </p>
            <button
              onClick={goToSignup}
              className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center gap-3 mx-auto lg:mx-0"
            >
              Get started with Connectify <FaArrowRight />
            </button>
          </div>

          <div className="lg:w-1/2 mt-9">
            <img
              src={socialmedia_image}
              alt="Hero visual"
              className="rounded-xl shadow-2xl w-full max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-28">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-indigo-200"
              >
                <div className="w-16 h-16 rounded-full mx-auto overflow-hidden shadow mb-4">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// footer section
const Footer = () => {
  return (
    <>
      <footer className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white pt-28 pb-10 mt-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full opacity-95">
          <svg
            className="w-full h-24 md:h-32 fill-current text-white"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,197.3C672,203,768,181,864,176C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4 text-white">Connectify</h2>
            <p className="text-purple-200 leading-relaxed">
              A collaborative platform that simplifies payroll and expense
              claims, with a beautiful, easy-to-use interface.
            </p>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-purple-200">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-purple-200">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="relative z-10 border-t border-purple-700 mt-10 pt-6 px-6 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto text-sm text-purple-200">
          <p>© {new Date().getFullYear()} Connectify. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
