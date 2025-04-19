import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BASE_URL from "../config";

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // ⬅️ New state
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    userBio: "",
  });

  const [image, setImage] = useState(
    "https://storage.googleapis.com/a1aa/image/default.jpg"
  );

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id || decoded._id || decoded.userId;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/profile/${userId}`)
      .then((res) => {
        setProfile({
          username: res.data.username || "",
          email: res.data.email || "",
          userBio: res.data.userBio || "",
        });
        if (res.data.url) setImage(res.data.url);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setImage(URL.createObjectURL(file)); // preview
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");
    formData.append("cloud_name", "dwvwvzwcv");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dwvwvzwcv/image/upload",
      formData
    );
    return res.data.secure_url;
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        setIsUpdating(true); // ⬅️ Start updatin

        let uploadedImageUrl = image;
        if (selectedImageFile) {
          uploadedImageUrl = await uploadToCloudinary(selectedImageFile);
        }

        await axios.patch(
          `${BASE_URL}/auth/update-user/${userId}`,
          {
            username: profile.username,
            email: profile.email,
            userBio: profile.userBio,
            url: uploadedImageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Profile updated successfully");
        setIsEditing(false);
        navigate("/");
      } catch (err) {
        console.error("Error updating profile:", err);
      } finally {
        setIsUpdating(false); // ⬅️ Done updating
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleClose = () => navigate("/");

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-2 pb-12 pt-4">Connectify</h2>
        <button
          onClick={handleClose}
          className="absolute top-2 right-5 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-xl font-semibold mb-6">Profile</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Image Section */}
          <div className="mb-6 md:mb-0 md:mr-8 flex flex-col items-center">
            <img
              src={image}
              alt="User"
              className="w-40 h-40 rounded-full object-cover"
            />
            {isEditing && (
              <label className="mt-4 cursor-pointer border-2 text-black hover:bg-blue-100 px-4 py-1 rounded-full transition duration-200">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <div className="mb-4">
              <span className="block text-gray-600 font-semibold">
                UserName:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="block w-full px-3 py-1 mt-1 border border-gray-300 rounded"
                />
              ) : (
                <span className="block text-gray-800">{profile.username}</span>
              )}
            </div>

            <div className="mb-4">
              <span className="block text-gray-600 font-semibold">Bio:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="userBio"
                  value={profile.userBio}
                  onChange={handleChange}
                  className="block w-full px-3 py-1 mt-1 border border-gray-300 rounded"
                />
              ) : (
                <span className="block text-gray-800">{profile.userBio}</span>
              )}
            </div>

            <div className="mb-4">
              <span className="block text-gray-600 font-semibold">Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-1 mt-1 border border-gray-300 rounded"
                />
              ) : (
                <span className="block text-gray-800">{profile.email}</span>
              )}
            </div>

            {/* "Updating..." text */}
            {isUpdating && (
              <p className="text-blue-500 mb-3 font-semibold">Updating...</p>
            )}

            <button
              onClick={toggleEdit}
              disabled={isUpdating}
              className={`border-2 ${
                isUpdating ? "border-gray-400 text-gray-500" : "border-blue-500 text-blue-900"
              } rounded-lg px-7 py-2 flex items-center hover:bg-blue-100 transition duration-200`}
            >
              <i className="fas fa-edit mr-5"></i>
              {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMyProfile;
