import React from "react";
import { FaLinkedin, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const contributors = [
  {
    id: 1,
    name: "Kaushik Gupta",
    photo: "https://res.cloudinary.com/dwvwvzwcv/image/upload/v1752565934/Screenshot_2025-07-10_224307_mi9xtz.png", // Replace with actual image
    description:
      "Pre-Final Year @IIIT Ranchi - CSE | Full Stack Developer (MERN) | React.js & Node.js | C++",
    linkedin: "https://www.linkedin.com/in/kaushikgupta256/",
  },
  {
    id: 2,
    name: "Shubham Kumar",
    photo: "https://res.cloudinary.com/dwvwvzwcv/image/upload/v1752566339/Screenshot_2025-07-15_132226_is39su.png", // Replace with actual image
    description:
      "Pre-Final Year @IIIT Ranchi | Java developer | DevOps | Aws | 200+ DSA problem solved",
    linkedin: "https://www.linkedin.com/in/shubham-kumar-07596728a/",
  },
];

const Contributors = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-100 py-16 px-6 md:px-24">
      <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-16 drop-shadow-md mt-9">
        Meet the Member Behind This Platform
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="relative bg-white/40 backdrop-blur-md border border-purple-100 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center hover:scale-[1.01] transition-transform duration-300"
          >
            <img
              src={contributor.photo}
              alt={contributor.name}
              className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-md mb-6"
            />
            <h3 className="text-2xl font-bold text-purple-800">
              {contributor.name}
            </h3>
            <p className="text-gray-700 mt-3 mb-5 px-6">
              {contributor.description}
            </p>

            <a
              href={contributor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition duration-200 shadow"
            >
              <FaLinkedin className="text-lg" />
              Connect on LinkedIn
            </a>
          </div>
        ))}
      </div>

      {/* Go to Home Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 bg-purple-700 text-white px-7 py-3 rounded-full text-lg hover:bg-purple-800 transition shadow-lg"
        >
          <FaHome className="text-xl" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Contributors;
