import React, { useState } from "react";
import { X } from "lucide-react";
import { FaHeart, FaComment } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Post component
const Post = ({
  userImg,
  username,
  timeAgo,
  content,
  caption,
  tags,
  postImg,
  likes,
  comments,
}) => {
  const [showLikePopup, setShowLikePopup] = useState(false);

  const handleLikeClick = () => {
    setShowLikePopup(true);
  };

  const handleLikeClosePopup = () => {
    setShowLikePopup(false);
  };

  const [showCommentPopup, setShowCommentPopup] = useState(false);

  const handleCommentClick = () => {
    setShowCommentPopup(true);
  };

  const handleCommentClosePopup = () => {
    setShowCommentPopup(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={userImg}
              alt="User"
              className="rounded-full"
              width="40"
              height="40"
            />
            <div>
              <h4 className="font-bold">{username}</h4>
              <p className="text-gray-500 text-sm">{timeAgo}</p>
            </div>
          </div>
          <button className="text-gray-500">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>

        <p className="mt-4">{content}</p>

        <p className="mt-4">
          {caption}
          <span className="text-blue-500"> {tags}</span>
        </p>

        {postImg && (
          <div className="flex justify-center mt-4">
            <img
              src={postImg}
              alt="Post"
              className="rounded-lg"
              width="300"
              height="300"
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button
              className="flex items-center space-x-2 text-red-500"
              onClick={handleLikeClick}
            >
              <FaHeart />
              <span>{likes}</span>
            </button>

            <button
              className="flex items-center space-x-2 text-gray-700"
              onClick={handleCommentClick}
            >
              <FaComment />
              <span>{comments}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <img
            src={userImg}
            alt="User"
            className="rounded-full"
            width="40"
            height="40"
          />
          <input
            type="text"
            placeholder="Write your comment"
            className="flex-1 px-4 py-2 border rounded-full"
            onClick={handleCommentClick}
          />
        </div>
      </div>

      {showLikePopup && <LikePopUp onClose={handleLikeClosePopup} />}
      {showCommentPopup && (
        <CommentReplyPopup onClose={handleCommentClosePopup} />
      )}
    </>
  );
};

// Like Component
const LikePopUp = ({ onClose }) => {
  const likes = [
    {
      name: "Sam Nelson",
      message: "I suggest to start, I have...",
      image: "https://placehold.co/40x40",
    },
    {
      name: "Jonas Berger",
      message: "We need to start a new research...",
      image: "https://placehold.co/40x40",
    },
    {
      name: "Kristian Kurzawa",
      message: "maybe yes...",
      initials: "KK",
      color: "bg-yellow-500",
    },
    {
      name: "Caroline Nixon",
      message: "I would like to introduce you to ...",
      image: "https://placehold.co/40x40",
    },
    {
      name: "Patrick Kluivert",
      message: "Integration events at the stad ...",
      initials: "PK",
      color: "bg-orange-500",
    },
    {
      name: "Lieke Martens",
      message: "I suggest to start, I have...",
      image: "https://placehold.co/40x40",
    },
    {
      name: "Alex Morgan",
      message: "Looking forward to the meet...",
      image: "https://placehold.co/40x40",
    },
    {
      name: "Chris Paul",
      message: "Let’s plan a team meetup...",
      image: "https://placehold.co/40x40",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <div className="max-h-96 overflow-y-auto pr-2 mt-2">
          {likes.map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mb-4 last:mb-0"
            >
              {user.image ? (
                <img
                  alt={`Profile picture of ${user.name}`}
                  className="w-10 h-10 rounded-full"
                  src={user.image}
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center`}
                >
                  <span className="text-white font-semibold">
                    {user.initials}
                  </span>
                </div>
              )}
              <div>
                <p className="text-gray-900 font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Comment Component
const CommentReplyPopup = ({ onClose }) => {
  const [commentText, setCommentText] = useState("");

  const getTimeAgo = (timestamp) => {
    const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Sample comments
  const comments = [
    {
      name: "Kaushik Gupta",
      message: "I think this is a great post!",
      image:
        "https://storage.googleapis.com/a1aa/image/8zMD2lsqC41lw0Qs_ujUsrIWhK2qQDqKKH_MmxB1V5Y.jpg",
      timestamp: Date.now() - 600000, // 10 minutes ago
    },
    {
      name: "John Doe",
      message: "Amazing work, keep it up!",
      image: "https://placehold.co/40x40",
      timestamp: Date.now() - 1200000, // 20 minutes ago
    },
    {
      name: "Alice Johnson",
      message: "Looking forward to more posts like this!",
      image: "https://placehold.co/40x40",
      timestamp: Date.now() - 3600000, // 1 hour ago
    },
    {
      name: "Bob Smith",
      message: "This is really insightful, thanks for sharing!",
      image: "https://placehold.co/40x40",
      timestamp: Date.now() - 7200000, // 2 hours ago
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="max-h-60 overflow-y-auto pr-2 mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex flex-col space-y-4 mb-4 last:mb-0">
              <div className="flex items-center space-x-4">
                <img
                  alt={`Profile picture of ${comment.name}`}
                  className="w-10 h-10 rounded-full"
                  src={comment.image}
                />
                <div>
                  <p className="text-gray-900 font-semibold">{comment.name}</p>
                  <p className="text-gray-500 text-sm">{comment.message}</p>
                  <p className="text-gray-400 text-xs">
                    {getTimeAgo(comment.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
       
        <textarea
          className="w-full h-24 mt-4 text-lg placeholder-gray-500 outline-none resize-none border border-gray-300 rounded-lg p-2"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
      
        <div className="mt-4 flex justify-between items-center">
          <button
            className={`px-6 py-2 rounded-full font-medium transition ${
              commentText.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!commentText.trim()}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
