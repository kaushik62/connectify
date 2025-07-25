import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";
import UserProfile from "./UserProfile";

const Follower_Following_list = ({ onChange }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const token = localStorage.getItem("token");
  let currentUserId = null;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      currentUserId = decoded?.id || decoded?._id || decoded?.userId;
    }
  } catch (err) {
    console.error("Invalid token:", err);
  }

  const fetchData = async () => {
    if (!currentUserId || !token) return;
    try {
      const [followersRes, followingRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/followers/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/api/following/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setFollowers(Array.isArray(followersRes.data) ? followersRes.data : []);
      setFollowing(Array.isArray(followingRes.data) ? followingRes.data : []);
    } catch (error) {
      console.error("Error fetching followers/following:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUserId, token]);

  const handleRemove = async (index, toUserId) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/unfollow?fromUserId=${currentUserId}&toUserId=${toUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = [...following];
      updated.splice(index, 1);
      setFollowing(updated);

      if (typeof onChange === "function") onChange();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const users = showFollowers ? followers : following;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            showFollowers
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setShowFollowers(true)}
        >
          Followers
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !showFollowers
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setShowFollowers(false)}
        >
          Following
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-semibold mt-6 mb-2 text-center">
        {showFollowers ? "My Followers List" : "My Following List"}
      </h1>

      {/* Scrollable List */}
      <div className="bg-white max-h-96 overflow-y-auto rounded-lg p-4">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={user.id || index}
              className="flex justify-between items-center p-4 border-b border-gray-200"
            >
              {/* ✅ Clickable user info area */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                  setShowUserProfile(true);
                }}
              >
                <img
                  src={user.url}
                  alt={`Profile of ${user.username}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="text-lg font-semibold">{user.username}</div>
                  {user.userBio && (
                    <p className="text-sm text-gray-600">{user.userBio}</p>
                  )}
                </div>
              </div>

              {/* Unfollow button */}
              {!showFollowers && (
                <button
                  onClick={() => handleRemove(index, user.id || user._id)}
                  className="text-white bg-pink-600 hover:bg-pink-700 text-sm px-3.5 py-1.5 rounded-full transition duration-200"
                >
                  Unfollow
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* ✅ User Profile Popup */}
      {showUserProfile && selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={() => {
            setShowUserProfile(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default Follower_Following_list;
