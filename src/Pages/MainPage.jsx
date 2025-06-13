import React, { useState, useEffect } from "react";
import axios from "axios";
import SharePost from "../components/SharePost";
import AllUsers from "./AllUsers";
import BASE_URL from "../config";
import Post from "../components/Post";
import MyProfile from "../components/MyProfile";
import ShowUserId from "../components/Demo";
import { jwtDecode } from "jwt-decode";

//* share something
const ShareSomething = () => {
  const [showSharePost, setShowSharePost] = useState(false);
  
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id || decoded._id || decoded.userId;
  
  const [profile, setProfile] = useState({});

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

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={profile.url}
            alt="User profile picture"
            className="rounded-full"
            width="40"
            height="40"
          />
          <input
            type="text"
            placeholder="Share something..."
            className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none cursor-pointer"
            onClick={() => setShowSharePost(true)}
            readOnly
          />

          {showSharePost && (
            <SharePost onClose={() => setShowSharePost(false)} />
          )}
        </div>
      </div>
    </>
  );
};

//* feed
const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust if you store the token differently
    axios
      .get(`${BASE_URL}/api/all-post`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
  }, []);


  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
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
    <div className="p-0.5 max-w-3xl mx-auto -mt-3">
      {posts.map((post, index) => (
        <div key={index} className="cursor-pointer">
          <Post
            userImg={post.user.url}
            currentUserimg={profile.url}
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
  );
};

//* center area
const CenterArea = () => {
  return (
    <>
      <div className="flex-1 space-y-4 mx-4">
        <ShowUserId />
        <ShareSomething />
        <Feed />
      </div>
    </>
  );
};

//* right sidebar or follow suggestions
export const RightSidebar = () => (
  <aside className="w-1/4 space-y-4">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Suggested For You</h3>
      <AllUsers />
    </div>
  </aside>
);

function MainPage() {
  return (
    <>
      <div className="flex flex-grow p-4 mt-14 bg-gray-100">
        <MyProfile />
        <CenterArea />
        <RightSidebar />
      </div>
    </>
  );
}

export default MainPage;
