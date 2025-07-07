import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

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
  }, [token]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUserId) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/api/notify/all-notification/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentUserId, token]);

  const formatMessage = (msg, postId) => {
    if (!msg) return "";

    // Replace: "post with postId  94" => "post"
    return msg.replace(/post with postId\s+\d+/i, `<span class="text-blue-600 font-semibold cursor-pointer">post</span>`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((note) => {
            const user = note?.post?.user || {};
            const username = user.username || "User";
            const displayName = user.name || username;
            const imageUrl = user.url || "https://via.placeholder.com/56";
            const rawMessage = note.message || "";
            const cleanedMsg = rawMessage.replace("null", displayName);
            const formattedMsg = formatMessage(cleanedMsg, note?.post?.postId);
            const postId = note?.post?.postId;

            return (
              <div
                key={note.notificationId}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200"
                onClick={() => navigate(`/post/${postId}`)}
              >
                <img
                  src={imageUrl}
                  alt={displayName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p
                    className="text-gray-800 font-medium"
                    dangerouslySetInnerHTML={{ __html: formattedMsg }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(note.time).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
