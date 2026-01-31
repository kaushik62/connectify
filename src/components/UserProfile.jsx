import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import BASE_URL from "../config";
import Post from "./Post";
import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react"; // or any icon lib

const UserProfile = ({ onClose, user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserImg, setCurrentUserImg] = useState(
    "https://placehold.co/40x40",
  );

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const currentUserId = decoded.id || decoded._id || decoded.userId;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/all-post/${user.id}`);
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to load user posts", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/auth/profile/${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setCurrentUserImg(res.data.url || "https://placehold.co/40x40");
      } catch (error) {
        console.error("Failed to load current user", error);
      }
    };

    if (user?.id) {
      fetchUserPosts();
    }
    fetchCurrentUser();
  }, [user.id]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[94%] max-w-5xl h-[92vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col pt-12">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-5">
            {user?.url ? (
              <img
                src={user.url}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            )}

            <div>
              <p className="font-bold text-2xl text-gray-800">
                {user.username}
              </p>
              <div className="flex gap-8 text-sm text-gray-600 mt-1 font-medium">
                <span>
                  <span className="text-gray-900 font-semibold">
                    {user.noOfPost}
                  </span>{" "}
                  Posts
                </span>
                <span>
                  <span className="text-gray-900 font-semibold">
                    {user.noOfFollowers}
                  </span>{" "}
                  Followers
                </span>
                <span>
                  <span className="text-gray-900 font-semibold">
                    {user.noOfFollowing}
                  </span>{" "}
                  Following
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
          {loading ? (
            <p className="text-center text-gray-500 mt-10">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No posts available
            </p>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  currentUserimg={currentUserImg}
                  userImg={post.user?.url || user.url}
                  username={post.user?.username || user.username}
                  timeAgo={new Date(post.time).toLocaleString()}
                  content={post.topic || ""}
                  caption={post.postDescription || ""}
                  tags={""}
                  postImg={post.postUrl || ""}
                  comments={post.noOfComments || 0}
                  postId={post.postId}
                  userId={post.user?.id || user.id}
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
