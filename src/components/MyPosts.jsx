import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";
import { RightSidebar } from "../Pages/MainPage";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id || decoded._id || decoded.userId;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/all-post/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);
 
  const [profile, setProfile] = useState({});
  const currentUserId = decoded.id || decoded._id || decoded.userId;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/profile/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);
  return (
    <div className="bg-grey-100 w-[72%] ml-auto p-1 absolute top-11 right-5 pt-5">
      <h2 className="text-gray-600 text-xl my-4">My Posts</h2>
      <div className="p-0.5 max-w-3xl mx-auto -mt-3">
        {posts.map((post, index) => (
          <div key={index} className="cursor-pointer">
            <Post
              currentUserimg={profile.url}
              userImg={post.user.url}
              username={post.user.username}
              timeAgo={post.time}
              content={post.postDescription}
              caption={post.topic || ""}
              tags=""
              postImg={post.postUrl}
              likes={post.noOfLikes}
              comments={post.noOfComments}
              postId={post.postId}
              userId={post.user.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
