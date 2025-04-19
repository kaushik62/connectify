import React from 'react';
import { jwtDecode } from 'jwt-decode';

const ShowUserId = () => {
  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token not found');
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id || decoded._id || decoded.userId;
    alert(`User ID: ${userId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Show My User ID
    </button>
  );
};

export default ShowUserId;
