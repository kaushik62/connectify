import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/post/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 text-red-500 font-semibold text-center">
        Post not found.
      </div>
    );
  }

  const {
    postDescription,
    time,
    noOfLikes,
    noOfComments,
    postUrl,
    user = {},
  } = post;

  const { name, username, url } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-8 px-4 mt-12">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-black flex items-center gap-1 text-sm px-2 rounded transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-4 mb-6 mt-6">
          <img
            src={url || "https://via.placeholder.com/64"}
            alt={username}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {name || username}
            </h2>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-800 text-base leading-relaxed">
            {postDescription}
          </p>

          {postUrl && (
            <div className="mt-4">
              <img
                src={postUrl}
                alt="Post"
                className="w-full max-h-[400px] rounded-xl object-cover shadow-md"
              />
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-600 mt-6 border-t pt-4">
            <div className="flex items-center gap-1">
              <Heart size={16} className="text-red-500" />
              <span>{noOfLikes} Likes</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} className="text-blue-500" />
              <span>{noOfComments} Comments</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Posted on: {new Date(time).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
