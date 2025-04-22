import React from "react";
import { useNavigate } from "react-router-dom";

const Page_Not_Found = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 sm:p-14 flex flex-col sm:flex-row items-center max-w-5xl w-full animate-fadeInUp">
        <img
          src="https://storage.googleapis.com/a1aa/image/257924ac-bc4a-4fd4-b25b-faefcaeee1a4.jpg"
          alt="Page not found illustration"
          className="w-70 h-70 sm:w-60 sm:h-60 mb-8 sm:mb-0"
          style={{ opacity: 0.7 }}
        />
        <div className="sm:ml-12 text-center sm:text-left">
          <h1 className="text-[#3b82f6] text-8xl font-black drop-shadow-md">404</h1>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">Page Not Found</h2>
          <p className="text-gray-500 mt-5 text-base sm:text-lg max-w-md">
            The page you are looking for doesn’t exist or has been moved.
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mt-6 flex-wrap">
            <button
              onClick={() => window.history.back()}
              className="bg-white border border-[#3b82f6] text-[#3b82f6] hover:bg-[#e0f2fe] font-medium rounded-full px-9 py-2 text-sm shadow-sm hover:shadow-md transition"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-full px-9 py-2 text-sm shadow-sm hover:shadow-md transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out both;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Page_Not_Found;
