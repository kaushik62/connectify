import React, { useRef, useEffect, useState } from "react";
import { X, Image, Trash2 } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BASE_URL from "../config";

const SharePost = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id || decoded._id || decoded.userId;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    fileInputRef.current.value = null;
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

  const handlePostSubmit = async () => {
    if (!postText.trim()) return;

    setIsPosting(true);
    setSuccessMessage("Posting wait...");

    try {
      let imageUrl = "";

      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }

      const postData = {
        postUrl: imageUrl, // Will be empty string if no image
        postDescription: postText,
      };

      await axios.post(`${BASE_URL}/api/add-post/${userId}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPostText("");
      handleRemoveImage();
      setSuccessMessage("Post successfully ✔️");

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error posting:", error);
      alert("Failed to post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[700px] min-h-[480px] rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-3">
            <img
              src={profile.url}
              alt="Profile"
              className="w-15 h-15 rounded-full"
            />
            <div>
              <p className="font-semibold text-xl">{profile.username}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Area */}
        <textarea
          className="w-full h-60 mt-5 text-lg placeholder-gray-500 outline-none resize-none"
          placeholder="What do you want to talk about?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>

        {/* Image Preview */}
        {selectedImage && (
          <div className="relative mt-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              className="w-full max-h-60 object-contain rounded-md border"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex flex-col items-end mt-6">
          {successMessage && (
            <p
              className={`text-sm font-medium mb-2 ${
                isPosting ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {successMessage}
            </p>
          )}
          <div className="flex gap-5 items-center w-full justify-between">
            <div className="flex gap-5 text-gray-500">
              <button onClick={handleImageClick} className="hover:text-black">
                <Image className="w-7 h-7" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <button
              className={`px-6 py-2 rounded-full font-medium transition ${
                postText.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!postText.trim() || isPosting}
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePost;
