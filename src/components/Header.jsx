import React, { useEffect, useState } from "react";
import { FaHome, FaBell, FaComments, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="container mx-auto px-4 py-2.5 flex items-center bg-white shadow-md fixed top-0 z-50">
      <Link
        to="/"
        className="text-3xl font-bold ml-7 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-transparent bg-clip-text py-2"
      >
        Connectify
      </Link>
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
      </div>

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
  );
}

export default Header;
