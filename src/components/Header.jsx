import React, { useEffect, useState } from "react";
import { FaHome, FaBell, FaComments, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Or navigate to landing
    navigate("/")
  };
  return (
    <>
      <header className="container mx-auto px-4 py-2.5 flex items-center bg-white shadow-md fixed top-0 z-50">
        <div className="text-2xl font-bold ml-2">Connectify</div>
        <div className="flex items-center space-x-4 justify-evenly flex-grow">
          <nav className="flex space-x-12 text-lg">
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
            >
              <FaHome />
              <Link to="/">Home</Link>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
            >
              <FaComments />
              <Link to="/messaging">Messaging</Link>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
            >
              <FaBell />
              <Link to="/notification">Notification</Link>
            </a>
          </nav>
          <input
            type="text"
            placeholder="Search"
            className="px-9 py-1.5 border rounded-full"
          />
        </div>

        {/* <button onClick={handleLogout} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
          <FaSignOutAlt />
          <span>Logout</span>
        </button> */}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        )}
      </header>
    </>
  );
}

export default Header;
