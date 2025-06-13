import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const startAutoLogout = (timeout) => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTimestamp");
      alert("Session expired. You’ve been logged out.");
      navigate("/login");
      window.location.reload();
    }, timeout);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username && password) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          username,
          password,
        });

        const data = response.data;

        localStorage.setItem("token", data.jwtToken);
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Login failed:", error);
        alert(
          error.response?.data?.message || "Login failed. Please try again."
        );
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token && expiration) {
      const remainingTime = parseInt(expiration) - Date.now();
      if (remainingTime > 0) {
        startAutoLogout(remainingTime);
      } else {
        localStorage.clear();
        window.location.reload(); // Or navigate to landing
        navigate("/");
      }
    }
  }, []);

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center p-8">
          <img
            alt="Login"
            className="w-3/4"
            src="https://storage.googleapis.com/a1aa/image/4pauig0vnnU5YAXybFeii-aklrhwQ93TtKKCN3BGUj8.jpg"
            width="400"
            height="400"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Connectify</h2>
          <p className="text-gray-500 mb-6">Login your account</p>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <span
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash" />
                  ) : (
                    <i className="fas fa-eye" />
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg p-3 font-semibold hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-4">
              Create an account{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={goToSignup}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
