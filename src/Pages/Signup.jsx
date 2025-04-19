import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import { FiEye, FiEyeOff } from "react-icons/fi"; // import eye icons

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, formData);

      if (response.status === 200 || response.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center p-8">
          <img
            alt="Illustration"
            className="w-3/4"
            src="https://storage.googleapis.com/a1aa/image/4pauig0vnnU5YAXybFeii-aklrhwQ93TtKKCN3BGUj8.jpg"
            width="400"
            height="400"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Connectify</h2>
          <p className="text-gray-500 mb-6">Register your account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="6+ characters"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 pr-10"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="role">Select Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1"
              >
                <option value="">Select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg p-3 font-semibold hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-4">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={goToLogin}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
