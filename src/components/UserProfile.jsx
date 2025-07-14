import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import BASE_URL from "../config";
import Post from "./Post";

const UserProfile = ({ onClose, user }) => {
  const [posts, setPosts] = useState([]);
  const [currentUserImg, setCurrentUserImg] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/all-post/${user.id}`);
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to load user posts", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUserImg(res.data.url || "https://placehold.co/40x40");
      } catch (error) {
        console.error("Failed to load current user", error);
        setCurrentUserImg("https://placehold.co/40x40");
      }
    };

    fetchUserPosts();
    fetchCurrentUser();
  }, [user.id]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[94%] max-w-5xl h-[92vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <img
              src={user.url}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow"
            />
            <div>
              <p className="font-bold text-2xl text-gray-800">{user.username}</p>
              <div className="flex gap-8 text-sm text-gray-600 mt-1 font-medium">
                <span>
                  <span className="text-gray-900 font-semibold">{user.noOfPost}</span> Posts
                </span>
                <span>
                  <span className="text-gray-900 font-semibold">{user.noOfFollowers}</span> Followers
                </span>
                <span>
                  <span className="text-gray-900 font-semibold">{user.noOfFollowing}</span> Following
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Posts Section */}
        <div className="px-6 py-4 overflow-y-auto flex-1 bg-gray-50">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No posts available</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  currentUserimg={currentUserImg}
                  userImg={user.url}
                  username={user.username}
                  timeAgo={new Date(post.createdAt).toLocaleString()}
                  content={post.content || ""}
                  caption={post.caption || ""}
                  tags={post.tags || ""}
                  postImg={post.postUrl}
                  comments={post.comments?.length || 0}
                  postId={post._id}
                  userId={user.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
