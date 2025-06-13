import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alreadyFollowed, setAlreadyFollowed] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const currentUserId = decoded.id || decoded._id || decoded.userId;

  // Fetch all users and current user's following list
  useEffect(() => {
    const fetchUsersAndFollowings = async () => {
      try {
        const [usersRes, followingRes] = await Promise.all([
          axios.get(`${BASE_URL}/auth/all-user`),
          axios.get(`${BASE_URL}/api/following/${currentUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersRes.data);
        setAlreadyFollowed(followingRes.data.map((user) => user.id));
        setLoading(false);
      } catch (error) {
        console.error("Error loading users or following list:", error);
        setLoading(false);
      }
    };

    fetchUsersAndFollowings();
  }, [currentUserId, token]);

  // Follow a user and update UI
  const handleFollow = async (toUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/follow?fromUserId=${currentUserId}&toUserId=${toUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAlreadyFollowed((prev) => [...prev, toUserId]);
    } catch (error) {
      console.error("Error following user", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="h-[80vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {users
            .filter(
              (user) => user.id !== currentUserId && !alreadyFollowed.includes(user.id)
            )
            .map((user, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4 relative">
                  {user.url ? (
                    <img
                      alt={`Profile of ${user.username}`}
                      className="w-16 h-16 rounded-full object-cover"
                      src={user.url}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.querySelector(".fallback-icon").style.display =
                          "block";
                      }}
                    />
                  ) : null}
                  <FaUserCircle
                    className="fallback-icon w-16 h-16 text-gray-400"
                    style={{ display: user.url ? "none" : "block" }}
                  />
                </div>
                <div className="text-center">
                  <h2 className="font-semibold">{user.username}</h2>
                  <p className="text-gray-500">{user.roles}</p>
                  <p className="text-gray-500">{user.id}</p>
                  <button
                    className="mt-2 px-10 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
