import React, { useRef, useEffect, useState } from "react";
import { X, Image, Trash2 } from "lucide-react";
import BASE_URL from "../config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SharePost = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("File size must be less than 500KB");
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    fileInputRef.current.value = null;
  };

  const [profile, setProfile] = useState(0);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id || decoded._id || decoded.userId;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/profile/${userId}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  }, []);

  return (
    <>
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
            className="w-full h-32 mt-5 text-lg placeholder-gray-500 outline-none resize-none"
            placeholder="What do you want to talk about?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>

          {/* Image Preview */}
          {selectedImage && (
            <div className="relative mt-4">
              <img
                src={selectedImage}
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
          <div className="flex justify-between items-center mt-6">
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

            {/* Post Button */}
            <button
              className={`px-6 py-2 rounded-full font-medium transition ${
                postText.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!postText.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharePost;
