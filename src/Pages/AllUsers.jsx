import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import BASE_URL from "../config";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/all-user`) // Replace with your endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

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
          {users.map((user, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4 relative">
                {user.url ? (
                  <img
                    alt={`Profile picture of ${user.username}`}
                    className="w-16 h-16 rounded-full object-cover"
                    src={user.url}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.querySelector(".fallback-icon").style.display = "block";
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
                <button className="mt-2 px-10 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
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
