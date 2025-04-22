import React, { useState, useEffect } from "react";
import axios from "axios";
import SharePost from "../components/SharePost";
import AllUsers from "./AllUsers";
import Post from "../components/Post";
import MyProfile from "../components/MyProfile";
import ShowUserId from "../components/Demo";

const demoPosts = [
  {
    userImg: "https://i.pravatar.cc/150?img=3",
    username: "Ava Stone",
    timeAgo: "5 minutes ago",
    content: "Captured this peaceful sunset during my hike 🌄",
    caption: "Golden Hour Vibes",
    tags: "#sunset #nature #peace #aesthetic",
    likes: "14.3k",
    comments: "240",
  },
  {
    userImg: "https://i.pravatar.cc/150?img=13",
    username: "Liam Carter",
    timeAgo: "30 minutes ago",
    content:
      "Weekend cityscape walk — there's something magical about empty streets.",
    caption: "Urban Serenity 🏙️",
    tags: "#city #streets #urbanvibes",
    postImg:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    likes: "8.7k",
    comments: "125",
  },
  {
    userImg: "https://i.pravatar.cc/150?img=24",
    username: "Maya Liu",
    timeAgo: "1 hour ago",
    content: "Tried something new with my paintbrush today! 🎨",
    caption: "Flow of Creativity",
    tags: "#painting #art #abstract #colors",
    postImg:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1000&q=80",
    likes: "22.1k",
    comments: "310",
  },
  {
    userImg: "https://i.pravatar.cc/150?img=31",
    username: "Ethan Brooks",
    timeAgo: "2 hours ago",
    content: "Dreaming of mountains and chilly air again ❄️",
    caption: "Winter Bliss",
    tags: "#snow #mountains #wanderlust",
    postImg:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    likes: "9.6k",
    comments: "93",
  },
];

//* share something
const ShareSomething = () => {
  const [showSharePost, setShowSharePost] = useState(false);
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src="https://storage.googleapis.com/a1aa/image/8zMD2lsqC41lw0Qs_ujUsrIWhK2qQDqKKH_MmxB1V5Y.jpg"
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
    axios
      .get("") // Replace with your actual API endpoint
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
  }, []);

  return (
    <div className="p-0.5 max-w-3xl mx-auto -mt-3">
      {demoPosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

//* center area
const CenterArea = () => {
  return (
    <>
      <div className="flex-1 space-y-4 mx-4">
        <ShowUserId/>
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
