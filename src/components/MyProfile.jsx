// src/components/MyProfile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Follower_Following_list from "./Follower_Following_list";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";
import { useProfileRefresh } from "../context/ProfileRefreshContext";

const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const { refreshFlag } = useProfileRefresh();

  const EditProfile = () => navigate("/edit-my-profile");
  const MyPost = () => navigate("/my-posts");

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
  }, [refreshFlag]);

  return (
    <aside className="w-1/4 space-y-4 sticky top-16 h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={
              profile.url ||
              "https://storage.googleapis.com/a1aa/image/8zMD2lsqC41lw0Qs_ujUsrIWhK2qQDqKKH_MmxB1V5Y.jpg"
            }
            alt="User profile"
            className="rounded-full"
            width="90"
            height="90"
          />
          <div>
            <h2 className="font-bold text-lg">{profile.username}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {profile.userBio || "Full Stack Developer | 🎨 UI/UX Enthusiast"}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-center">
            <span className="font-bold">{profile.noOfPost}</span>
            <p className="text-gray-500">Post</p>
          </div>
          <div className="text-center">
            <span className="font-bold">{profile.noOfFollowers}</span>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <span className="font-bold">{profile.noOfFollowing}</span>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-full hover:bg-gray-400 transition"
            onClick={EditProfile}
          >
            Edit Profile
          </button>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
            onClick={MyPost}
          >
            My Posts
          </button>
        </div>

        <Follower_Following_list />
      </div>
    </aside>
  );
};

export default MyProfile;
