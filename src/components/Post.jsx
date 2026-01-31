import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { X } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const Post = ({
  currentUserimg,
  userImg,
  username,
  timeAgo,
  content,
  caption,
  tags,
  postImg,
  comments,
  postId,
  userId: postOwnerId,
  onUserClick,
}) => {
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const uid = decoded.id || decoded._id || decoded.userId;
        setCurrentUserId(uid);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []);

  useEffect(() => {
    if (currentUserId && postId) {
      fetchLikesStatus();
    }
  }, [currentUserId, postId]);

  // ✅ 4. Fetch all likes for post and update state

  const fetchLikesStatus = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/likes/all-likes/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const likesArray = response.data;
      setLikesCount(likesArray.length);

      const userLiked = likesArray.some(
        (like) => like.user?.id === currentUserId,
      );
      setIsLiked(userLiked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  // ✅ 3. Like / Unlike toggle
  const handleLikeClickHeart = async () => {
    try {
      toast.dismiss();

      if (isLiked) {
        await axios.delete(
          `${BASE_URL}/likes/delete/${currentUserId}/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.post(
          `${BASE_URL}/likes/add-like/${currentUserId}/${postId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error liking/unliking:", error);
    }
  };
  // ✅ 5. Fetch posts

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/all-post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data); // ✅ update state
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts(); // load initially
  }, []);

  const handleDelete = async () => {
    if (currentUserId !== postOwnerId) {
      alert("Only the rightful owner of this post is allowed to delete it.");
      return;
    }

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/delete-post/${currentUserId}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Post deleted:", response.data);
      setShowDeletePopup(false);
      window.location.reload();
    } catch (error) {
      alert(`Failed to delete post.`);
      console.error("Error deleting post:", error);
    }
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
              onClick={onUserClick}
            />
            <div>
              <h4 className="font-bold">{username}</h4>
              <p className="text-gray-500 text-sm">{timeAgo.split("T")[0]}</p>
            </div>
          </div>
          <button className="text-gray-500">
            <i
              className="fas fa-ellipsis-h cursor-pointer"
              onClick={() => setShowDeletePopup(true)}
            ></i>
            {showDeletePopup && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
                  <h2 className="text-lg font-semibold mb-4">Delete Post</h2>
                  <p className="mb-4">
                    Are you sure you want to delete this post?
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowDeletePopup(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              className="flex items-center space-x-2"
              onClick={handleLikeClickHeart}
            >
              {isLiked ? (
                <FaHeart className="text-xl text-pink-600" /> // ✅ Liked - pink
              ) : (
                <FaRegHeart className="text-xl text-gray-500" /> // ✅ Not liked - gray
              )}
              <span>{likesCount}</span>
            </button>
            <span
              onClick={() => setShowLikePopup(true)}
              className="text-gray-700 cursor-pointer"
            >
              Show Likes
            </span>

            <button
              className="flex items-center space-x-2 text-blue-400"
              onClick={() => setShowCommentPopup(true)}
            >
              <FaComment />
              <span>{comments}</span>
              <span className="text-gray-700">Show Comments</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <img
            src={currentUserimg}
            alt="User"
            className="rounded-full"
            width="40"
            height="40"
          />
          <input
            type="text"
            placeholder="Write your comment"
            className="flex-1 px-4 py-2 border rounded-full"
            onClick={() => setShowCommentPopup(true)}
          />
        </div>
      </div>

      {showLikePopup && (
        <LikePopUp onClose={() => setShowLikePopup(false)} postId={postId} />
      )}

      {showCommentPopup && (
        <CommentReplyPopup
          postId={postId}
          currentUserId={currentUserId}
          onClose={() => setShowCommentPopup(false)}
          onCommentAdded={() => {
            fetchPosts(); // ✅ refresh card data
            setShowCommentPopup(false); // ✅ close comment popup
          }}
        />
      )}

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
};

// LIKE POPUP
const LikePopUp = ({ onClose, postId }) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/likes/all-likes/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    if (postId) fetchLikes();
  }, [postId]);

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
          {likes.length > 0 ? (
            likes.map((like, index) => {
              const user = like.user;
              const name = user?.username || "Unknown";
              const image = user?.url;
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 mb-4 last:mb-0"
                >
                  {image ? (
                    <img
                      alt={`Profile picture of ${name}`}
                      className="w-10 h-10 rounded-full"
                      src={image}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {initials}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-900 font-semibold">{name}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No likes yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

// COMMENT POPUP
const CommentReplyPopup = ({
  onClose,
  postId,
  currentUserId,
  // onCommentAdded,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comment/all-comments/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post(
        `${BASE_URL}/comment/add-comment/${currentUserId}/${postId}`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setCommentText(""); // Clear input
      await fetchComments(); // ✅ Fetch updated comments list
      onClose(); // ✅ Close the popup
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) return;
    try {
      await axios.delete(
        `${BASE_URL}/comment/delete/${currentUserId}/${postId}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

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
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="flex flex-col space-y-4 mb-4 last:mb-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    alt="User"
                    className="w-10 h-10 rounded-full"
                    src={comment.user?.url || "https://placehold.co/40x40"}
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold">
                      {comment.user?.username || "Unknown"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {JSON.parse(comment.message).text}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.commentId)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet.</p>
          )}
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
            onClick={handlePostComment}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
