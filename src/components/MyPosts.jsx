import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const demoPosts = [
  {
    userImg: "https://i.pravatar.cc/150?img=3",
    username: "Ava Stone",
    timeAgo: "5 minutes ago",
    content: "Captured this peaceful sunset during my hike 🌄",
    caption: "Golden Hour Vibes",
    tags: "#sunset #nature #peace #aesthetic",
    postImg:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1000&q=80",
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

//* My Posts
const MyPosts = () => {
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
    <>
      <div className="bg-grey-100 w-[72%] ml-auto p-1 absolute top-11 right-5 pt-5">
        <h2 className="text-gray-600 text-xl my-4">My Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {demoPosts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
