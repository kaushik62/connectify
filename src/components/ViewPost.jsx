import React from "react";

const ViewPost = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-black rounded-lg w-[850px] h-[500px] flex shadow-xl relative overflow-hidden">
        
        {/* Left Side - Image */}
        <div className="w-[60%] bg-black flex items-center justify-center">
          <img
            src="https://your-image-url.jpg" // replace with your actual image
            alt="Instagram post"
            className="h-full object-cover"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-[40%] bg-black text-white p-4 overflow-y-auto relative">
          {/* Top Section */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://your-profile-image.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">kaushik_gupta_256</p>
                <p className="text-xs text-gray-400">Ranchi-THE Heart Of Jharkhand</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Comments */}
          <div className="py-4">
            <div className="mb-3">
              <p>
                <span className="font-semibold">ervikash978</span>{" "}
                <span>Bawal</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">4w</p>
            </div>

            <div>
              <p>
                <span className="font-semibold">kaushik_gupta_256</span>{" "}
                <span>@ervikash978 🙌</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">3w</p>
            </div>
          </div>

          {/* Like + Date + Input */}
          <div className="absolute bottom-4 w-full left-0 px-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-xl">❤️</span>
                <p className="text-sm text-white">Liked by kundan_gupta_15 and 118 others</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">March 7</p>
            <input
              type="text"
              placeholder="Add a comment..."
              className="mt-2 w-full bg-transparent border-t border-gray-700 pt-2 text-white outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
