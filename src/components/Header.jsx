import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaBell,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="px-4 py-3 flex items-center justify-between bg-white shadow-md fixed top-0 z-50 w-full">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-transparent bg-clip-text"
      >
        Connectify
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-10 text-lg">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-200"
        >
          <FaHome />
          Home
        </Link>
        <Link
          to="/messaging"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-200"
        >
          <FaComments />
          Messaging
        </Link>
        <Link
          to="/notification"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-200"
        >
          <FaBell />
          Notification
        </Link>
      </nav>

      {/* Logout Button (Desktop) */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      )}

      {/* Hamburger Icon (Mobile) */}
      <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-700">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col space-y-4 px-6 py-4 z-50 md:hidden">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-lg hover:text-blue-500"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/messaging"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-lg hover:text-blue-500"
          >
            <FaComments />
            Messaging
          </Link>
          <Link
            to="/notification"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-lg hover:text-blue-500"
          >
            <FaBell />
            Notification
          </Link>
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
