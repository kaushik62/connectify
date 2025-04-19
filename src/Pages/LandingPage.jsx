import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import socialmedia_image from "../image/socialmedia_img.svg";
import Footer from "../components/Footer";

const LandingPage = () => {
    const navigate = useNavigate();
  
    const goToSignup = () => {
      navigate("/signup");
    };
  const features = [
    {
      id: 1,
      title: "Adjust Payroll",
      desc: "Easily create quotes and mark them as accepted or declined.",
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
      title: "Payment",
      desc: "Access anytime, anywhere – perfect for remote teams.",
      img: "https://storage.googleapis.com/a1aa/image/ikkb_AE6yLOSHuKpa0DG0jdVqk0DlnFBQr5bhKyPnUY.jpg",
    },
    {
      id: 4,
      title: "Submission",
      desc: "Choose plans that fit your needs – all in a few clicks.",
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
              Connectify is a dynamic social media application that connects people around the world through posts, likes, comments, and real-time messaging.
            </p>
            <button onClick={goToSignup} className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center gap-3 mx-auto lg:mx-0"
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

export default LandingPage;
